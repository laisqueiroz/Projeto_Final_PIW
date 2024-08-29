import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const secretKey = 'J55y0WyfKH0z9oUXVkM8'; 

interface CustomRequest extends Request{
  user?: string | JwtPayload;
}

export const authenticateJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  jwt.verify(token, secretKey, (err: any, user: string | jwt.JwtPayload | undefined) => {
    if (err) return res.status(403).json({message: 'Token inválido.'});
    req.user = user;
  });
  next();
};

export const authorizeRole = (role: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload
    if (!role.includes(user.role)) {
      return res.status(403).json({ message: 'Acesso negado.' });
    }
    next();
  };
};

export const authorizeSelfOrAdmin = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const user = req.user as JwtPayload
  if (user.role !== 'admin' && user.id !== parseInt(id, 10)) {
    return res.status(403).json({ message: 'Acesso negado.' });
  }
  next();
};
