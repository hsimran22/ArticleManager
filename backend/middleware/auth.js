const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: 'Access token required' });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Check user permissions
const authorize = (permissions) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    
    if (!permissions.includes(userRole)) {
      return res.status(403).json({ 
        message: `Access denied. ${userRole} role cannot perform this action.` 
      });
    }
    
    next();
  };
};

module.exports = { authenticateToken, authorize };