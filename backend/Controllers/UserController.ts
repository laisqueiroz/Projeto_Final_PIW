import { Request, Response } from 'express';
import { User } from '../Models/UserModel';

User.sync();

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  const users = await User.findAll();
  return res.status(200).json(users);
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  const { login, password, role } = req.body;

  if (!login || !password || !role) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  const newUser = await User.create({ login, password, role });
  return res.status(201).json(newUser);
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { login, password, role } = req.body;

  const userToUpdate = await User.findByPk(id);

  if (!userToUpdate) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  if (login) userToUpdate.login = login;
  if (password) userToUpdate.password = password;
  if (role) userToUpdate.role = role;

  await userToUpdate.save();

  return res.status(200).json(userToUpdate);
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  const userToDelete = await User.findByPk(id);

  if (!userToDelete) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  await userToDelete.destroy();

  return res.status(204).send();
};
