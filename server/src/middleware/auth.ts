import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const token = req.headers['authorization']?.split(' ')[1] as string;
  const jwtToken = jwt.decode(token);
  if (jwtToken) {
    const secretKey = process.env.JWT_SECRET_KEY || ''; 
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = decoded as JwtPayload;
      return next();
    })
  }
};
