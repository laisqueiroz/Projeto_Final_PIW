"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, login, role, password) {
        this.id = id;
        this.login = login;
        this.role = role;
        this.password = password;
    }
    getLogin() {
        return this.login;
    }
    setLogin(login) {
        if (login.trim().length === 0) {
            throw new Error('O nome não pode ser vazio.');
        }
        this.login = login;
    }
    getRole() {
        return this.role;
    }
    setRole(role) {
        if (role === 'admin' || role === 'medVet' || role === 'funcionario') {
            this.role = role;
        }
        else {
            this.role = 'unregisteredUser';
        }
    }
    getPassword() {
        return this.password;
    }
    setPassword(password) {
        if (password.trim().length === 0) {
            throw new Error('O senha não pode ser vazio.');
        }
        this.password = password;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
}
exports.User = User;
