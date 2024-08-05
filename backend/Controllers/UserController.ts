import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { User } from '../Models/UserModel';

const dataPath = path.join(__dirname, '../data/users.json');

const getUsersFromFile = (): User[] => {
  const jsonData = fs.readFileSync(dataPath, 'utf-8');
  const rawUsers = JSON.parse(jsonData);
  return rawUsers.map((rawUser: any) => new User(rawUser.id, rawUser.login, rawUser.role, rawUser.password));
};

const saveUsersToFile = (users: User[]): void => {
  const rawUsers = users.map(user => ({
    id: user.getId(),
    login: user.getLogin(),
    role: user.getRole(),
    password: user.getPassword()
  }));
  fs.writeFileSync(dataPath, JSON.stringify(rawUsers, null, 2));
};

export const getUsers = (req: Request, res: Response): Response => {
  const users = getUsersFromFile();
  return res.status(200).json(users);
};

export const createUser = (req: Request, res: Response): Response => {
  const { login, password, role } = req.body;

  if (!login || !password || !role) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  const users = getUsersFromFile();
  const newUserId = users.length ? users[users.length - 1].getId() + 1 : 1;
  const newUser = new User(newUserId, login, role, password);

  users.push(newUser);
  saveUsersToFile(users);

  return res.status(201).json(newUser);
};

export const updateUser = (req: Request, res: Response): Response => {
  const { id } = req.params;
  const { login, password, role } = req.body;

  const users = getUsersFromFile();
  const userIndex = users.findIndex(user => user.getId() === parseInt(id));

  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  const userToUpdate = users[userIndex];
  if (login) userToUpdate.setLogin(login);
  if (password) userToUpdate.setPassword(password);
  if (role) userToUpdate.setRole(role);

  saveUsersToFile(users);

  return res.status(200).json(userToUpdate);
};

export const deleteUser = (req: Request, res: Response): Response => {
  const { id } = req.params;

  const users = getUsersFromFile();
  const userIndex = users.findIndex(user => user.getId() === parseInt(id));

  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  users.splice(userIndex, 1);
  saveUsersToFile(users);

  return res.status(204).send();
};
