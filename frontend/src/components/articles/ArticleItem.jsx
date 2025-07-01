import React from 'react';
import { useAuth } from '../../context/AuthContext';

const ArticleItem = ({ article, onEdit, onDelete }) => {
  const { user } = useAuth();

  const canEdit = user?.role === 'tutor' || user?.role === 'admin';
  const canDelete = user?.role === 'admin';

  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 font-semibold">{article.name}</td>
      <td className="px-4 py-3">{article.category}</td>
      <td className="px-4 py-3">{article.type}</td>
      <td className="px-4 py-3 text-sm text-gray-700">{article.about?.slice(0, 100)}...</td>

      
      <td className="px-4 py-3 text-sm text-gray-600">
        {article.born && <div><strong>Born:</strong> {article.born}</div>}
        {article.died && <div><strong>Died:</strong> {article.died}</div>}
        {article.nationality && <div><strong>Nationality:</strong> {article.nationality}</div>}
        {article.knownFor && <div><strong>Known For:</strong> {article.knownFor}</div>}
        {article.notableWork && <div><strong>Notable Work:</strong> {article.notableWork}</div>}
        {article.year && <div><strong>Year:</strong> {article.year}</div>}
        {article.medium && <div><strong>Medium:</strong> {article.medium}</div>}
        {article.dimensions && <div><strong>Size:</strong> {article.dimensions}</div>}
        {article.location && <div><strong>Location:</strong> {article.location}</div>}
        {article.developer && <div><strong>Developer:</strong> {article.developer}</div>}
        {article['developer '] && <div><strong>Developer:</strong> {article['developer ']}</div>}
        {article.designedBy && <div><strong>Designed By:</strong> {article.designedBy}</div>}
        {article.createdAt && <div><strong>Created:</strong> {new Date(article.createdAt).toLocaleDateString()}</div>}
        {article.updatedAt && <div><strong>Updated:</strong> {new Date(article.updatedAt).toLocaleDateString()}</div>}
      </td>

      <td className="px-4 py-3">
        <div className="flex gap-2">
          {canEdit && (
            <button
              onClick={() => onEdit(article)}
              className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
            >
              Edit
            </button>
          )}
          {canDelete && (
            <button
              onClick={() => onDelete(article._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default ArticleItem;
