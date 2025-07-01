import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { articlesAPI } from '../../api/articles';
import ArticleItem from './ArticleItem';
import ArticleForm from './ArticleForm';

const ArticleList = () => {
  const { token, user } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, [categoryFilter, searchTerm, token]);

  const fetchArticles = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await articlesAPI.getAll(token, {
        category: categoryFilter,
        search: searchTerm
      });
      setArticles(data.articles);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
    setShowForm(true);
  };

  const handleDelete = async (articleId) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await articlesAPI.delete(token, articleId);
        fetchArticles();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingArticle(null);
    fetchArticles();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingArticle(null);
  };

  const canCreateArticle = user?.role === 'tutor' || user?.role === 'admin';

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Articles</h2>

      {error && <div className="text-red-500 mb-4">Error: {error}</div>}

      <div className="flex flex-wrap gap-4 mb-6 items-end">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Category</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Categories</option>
            <option value="Arts">Arts</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Technology">Technology</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Search</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles..."
            className="border border-gray-300 rounded-md px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {canCreateArticle && (
          <div className="ml-auto">
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add Article
            </button>
          </div>
        )}
      </div>

      {showForm && (
        <ArticleForm
          article={editingArticle}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      )}

      {loading && <div className="text-gray-500">Loading articles...</div>}

      {!loading && articles.length === 0 && (
        <div className="text-gray-600">No articles found.</div>
      )}

      {!loading && articles.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">About</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <ArticleItem
                  key={article._id}
                  article={article}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ArticleList;
