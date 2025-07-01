const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Arts', 'Mathematics', 'Technology']
  },
  type: {
    type: String,
    required: true,
    enum: ['Biography', 'Painting', 'Theorem', 'Algorithm', 'Programming Language']
  },
  about: {
    type: String,
    required: true
  },
  // Optional fields
  born: {
    type: mongoose.Schema.Types.Mixed // Can be Number or String
  },
  died: {
    type: mongoose.Schema.Types.Mixed // Can be Number or String
  },
  nationality: String,
  knownFor: String,
  notableWork: String,
  year: String,
  medium: String,
  dimensions: String,
  location: String,
  designedBy: String,
  developer: String
}, {
  timestamps: true
});

// Add text index for search functionality
articleSchema.index({
  name: 'text',
  about: 'text',
  knownFor: 'text',
  notableWork: 'text'
});

module.exports = mongoose.model('Article', articleSchema);