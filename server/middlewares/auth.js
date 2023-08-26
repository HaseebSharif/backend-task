import jwt from "jsonwebtoken";
const secretKey = 'haseeb7864';

export function generateToken(user) {
  return jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
}

export function authenticateUser(req, res, next) {
  const token = req.session.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const decodedToken = verifyToken(token);
  if (!decodedToken) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  req.userId = decodedToken.userId;
  next();
}

