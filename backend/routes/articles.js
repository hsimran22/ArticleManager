const express = require('express');
const Article = require('../models/Article');
const { authenticateToken, authorize } = require('../middleware/auth');

const router = express.Router();

// GET /articles - Get all articles with optional filtering
router.get('/articles', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    // Filter by category
    if (category) {
      query.category = category;
    }

 
    if (search) {
      query.$text = { $search: search };
    }

    const articles = await Article.find(query);
    res.json({
      success: true,
      count: articles.length,
      articles
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching articles', error: error.message });
  }
});

// GET /articles/:id - Get single article
router.get('/articles/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json({
      success: true,
      article
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching article', error: error.message });
  }
});

// POST /articles - Create new article
router.post('/articles', authenticateToken, authorize(['tutor', 'admin']), async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();

    res.status(201).json({
      success: true,
      message: 'Article created successfully',
      article
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating article', error: error.message });
  }
});

// PUT /articles/:id - Update article
router.put('/articles/:id', authenticateToken, authorize(['tutor', 'admin']), async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json({
      success: true,
      message: 'Article updated successfully',
      article
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating article', error: error.message });
  }
});

// DELETE /articles/:id - Delete article
router.delete('/articles/:id', authenticateToken, authorize(['admin']), async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json({
      success: true,
      message: 'Article deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting article', error: error.message });
  }
});

module.exports = router;