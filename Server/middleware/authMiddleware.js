// Require jsonwebtoken for verifying tokens
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  if (!token) return res.status(401).send('Access Token Required');

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid/Expired Token');
    req.user = user; // Add the user payload to the request
    next();
  });
}

// Middleware for checking admin role
function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') return next();
  res.status(403).send('Not authorized');
}

// Middleware to generate JWT
const generateToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// Middleware for checking authentication
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    // res.status(401).send('Not authenticated');
    res.redirect('/login');
  }




module.exports = { authenticateToken, isAdmin, generateToken, isLoggedIn };


