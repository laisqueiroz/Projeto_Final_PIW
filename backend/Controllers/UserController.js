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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = exports.loginUser = void 0;
const UserModel_1 = require("../Models/UserModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret_key = 'J55y0WyfKH0z9oUXVkM8';
UserModel_1.User.sync();
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield UserModel_1.User.findOne({ where: { email } });
    console.log(user);
    if (!user || !user.checkPassword(password)) {
        return res.status(401).json({ message: 'Informações Inválidas' });
    }
    ;
    const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role, email: user.email }, secret_key, { expiresIn: '1h' });
    return res.status(200).json({ token });
});
exports.loginUser = loginUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserModel_1.User.findAll();
    return res.status(200).json(users);
});
exports.getUsers = getUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastname, email, password, role } = req.body;
    if (!name || !lastname || !email || !password || !role) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    const newUser = yield UserModel_1.User.create({ name, lastname, email, password, role });
    return res.status(201).json(newUser);
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, lastname, email, password, role } = req.body;
    const userToUpdate = yield UserModel_1.User.findByPk(id);
    if (!userToUpdate) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    if (name)
        userToUpdate.name = name;
    if (lastname)
        userToUpdate.lastname = lastname;
    if (email)
        userToUpdate.email = email;
    if (password)
        userToUpdate.password;
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
