import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = await req.headers.authorization;
    if (!token) {
      return res.status(403).send('Access denied.');
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = verified;
    next();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
