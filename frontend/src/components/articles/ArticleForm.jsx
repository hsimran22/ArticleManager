import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { articlesAPI } from '../../api/articles';

const ArticleForm = ({ article, onSuccess, onCancel }) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    category: 'Arts',
    type: 'Biography',
    about: ''
  });

  useEffect(() => {
    if (article) {
      setFormData({
        name: article.name || '',
        category: article.category || 'Arts',
        type: article.type || 'Biography',
        about: article.about || ''
      });
    }
  }, [article]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (article) {
        await articlesAPI.update(token, article._id, formData);
      } else {
        await articlesAPI.create(token, formData);
      }
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6"
    >
      <h3 className="text-2xl font-semibold text-gray-700">
        {article ? 'Edit Article' : 'Add New Article'}
      </h3>

      {error && <div className="text-red-500 text-sm">Error: {error}</div>}

      <div>
        <label className="block text-gray-700 font-medium mb-1">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Arts">Arts</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Technology">Technology</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Type:</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Biography">Biography</option>
          <option value="Painting">Painting</option>
          <option value="Theorem">Theorem</option>
          <option value="Algorithm">Algorithm</option>
          <option value="Programming Language">Programming Language</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">About:</label>
        <textarea
          name="about"
          value={formData.about}
          onChange={handleChange}
          required
          rows="4"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
        />
      </div>

      <div className="flex justify-between items-center">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
        >
          {loading ? 'Saving...' : (article ? 'Update' : 'Create')}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-600 hover:text-red-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ArticleForm;
