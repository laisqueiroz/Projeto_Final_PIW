import { Request, Response } from 'express';
import { User } from '../Models/UserModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const secret_key = 'J55y0WyfKH0z9oUXVkM8';

User.sync();

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, password} = req.body;

  const user = await User.findOne({where: {email} });
  if(!user || !user.checkPassword(password)){
    
    return res.status(401).json({ message: 'Informações Inválidas'})
  };

  const token = jwt.sign({id: user.id, role: user.role, email: user.email}, secret_key, {expiresIn: '1h'});
  return res.status(200).json({token, role: user.role, id: user.id});
};

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  const users = await User.findAll();
  return res.status(200).json(users);
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {

  const { name, lastname, email, password, role } = req.body;

  if (!name || !lastname|| !email || !password || !role) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  const newUser = await User.create({ name, lastname, email, password, role });
  return res.status(201).json(newUser);
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { name, lastname, email, password, role } = req.body;

  const userToUpdate = await User.findByPk(id);

  if (!userToUpdate) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  if (name) userToUpdate.name = name;
  if (lastname) userToUpdate.lastname = lastname;
  if (email) userToUpdate.email = email;
  if (password) userToUpdate.password;
  if (role) userToUpdate.role = role;

  await userToUpdate.save();

  return res.status(200).json(userToUpdate);
};

export const getUserId = async ( req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  const userId = await User.findByPk(id);
  if (!userId) {
    return res.status(404).json({ message: "Usuário não encontrado!"})
  }
  return res.status(200).json(userId);
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  const userToDelete = await User.findByPk(id);

  if (!userToDelete) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  await userToDelete.destroy();

  return res.status(204).send();
};
