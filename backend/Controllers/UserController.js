"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const UserModel_1 = require("../Models/UserModel");
const dataPath = path_1.default.join(__dirname, '../data/users.json');
const getUsersFromFile = () => {
    const jsonData = fs_1.default.readFileSync(dataPath, 'utf-8');
    const rawUsers = JSON.parse(jsonData);
    return rawUsers.map((rawUser) => new UserModel_1.User(rawUser.id, rawUser.login, rawUser.role, rawUser.password));
};
const saveUsersToFile = (users) => {
    const rawUsers = users.map(user => ({
        id: user.getId(),
        login: user.getLogin(),
        role: user.getRole(),
        password: user.getPassword()
    }));
    fs_1.default.writeFileSync(dataPath, JSON.stringify(rawUsers, null, 2));
};
const getUsers = (req, res) => {
    const users = getUsersFromFile();
    return res.status(200).json(users);
};
exports.getUsers = getUsers;
const createUser = (req, res) => {
    const { login, password, role } = req.body;
    if (!login || !password || !role) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    const users = getUsersFromFile();
    const newUserId = users.length ? users[users.length - 1].getId() + 1 : 1;
    const newUser = new UserModel_1.User(newUserId, login, role, password);
    users.push(newUser);
    saveUsersToFile(users);
    return res.status(201).json(newUser);
};
exports.createUser = createUser;
const updateUser = (req, res) => {
    const { id } = req.params;
    const { login, password, role } = req.body;
    const users = getUsersFromFile();
    const userIndex = users.findIndex(user => user.getId() === parseInt(id));
    if (userIndex === -1) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    const userToUpdate = users[userIndex];
    if (login)
        userToUpdate.setLogin(login);
    if (password)
        userToUpdate.setPassword(password);
    if (role)
        userToUpdate.setRole(role);
    saveUsersToFile(users);
    return res.status(200).json(userToUpdate);
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
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
exports.deleteUser = deleteUser;
