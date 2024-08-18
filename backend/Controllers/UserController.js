"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = void 0;
const UserModel_1 = require("../Models/UserModel");
UserModel_1.User.sync();
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserModel_1.User.findAll();
    return res.status(200).json(users);
});
exports.getUsers = getUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password, role } = req.body;
    if (!login || !password || !role) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    const newUser = yield UserModel_1.User.create({ login, password, role });
    return res.status(201).json(newUser);
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { login, password, role } = req.body;
    const userToUpdate = yield UserModel_1.User.findByPk(id);
    if (!userToUpdate) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    if (login)
        userToUpdate.login = login;
    if (password)
        userToUpdate.password = password;
    if (role)
        userToUpdate.role = role;
    yield userToUpdate.save();
    return res.status(200).json(userToUpdate);
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userToDelete = yield UserModel_1.User.findByPk(id);
    if (!userToDelete) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    yield userToDelete.destroy();
    return res.status(204).send();
});
exports.deleteUser = deleteUser;
