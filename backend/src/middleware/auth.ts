import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest, JwtPayload } from '../types/index.js';

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access token required' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = { 
      _id: decoded.userId, 
      email: decoded.email,
      googleId: '', // This will be filled when user data is fetched
      name: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};
