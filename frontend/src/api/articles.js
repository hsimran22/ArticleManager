const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const articlesAPI = {
  getAll: async (token, filters = {}) => {
    let url = `${API_BASE}/api/articles`;
    const params = new URLSearchParams();
    
    if (filters.category && filters.category !== 'All') {
      params.append('category', filters.category);
    }
    if (filters.search) {
      params.append('search', filters.search);
    }
    
    if (params.toString()) {
      url += '?' + params.toString();
    }
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch articles');
    }
    
    return data;
  },

  create: async (token, articleData) => {
    const response = await fetch(`${API_BASE}/api/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(articleData)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create article');
    }
    
    return data;
  },

  update: async (token, articleId, articleData) => {
    const response = await fetch(`${API_BASE}/api/articles/${articleId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(articleData)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update article');
    }
    
    return data;
  },

  delete: async (token, articleId) => {
    const response = await fetch(`${API_BASE}/api/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to delete article');
    }
    
    return true;
  }
};