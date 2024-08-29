import { Request, Response } from 'express';
import { User } from '../Models/UserModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secretKey = '0k@!s08=/%69W/0q?QUMqw*HK;?c[y';  

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '1h' });

  return res.json({ token });
};
