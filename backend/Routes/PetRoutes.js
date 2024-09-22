"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthMiddleware_1 = require("../Middlewares/AuthMiddleware");
const PetController_1 = __importDefault(require("../Controllers/PetController"));
const router = (0, express_1.Router)();
router.post('/pets', AuthMiddleware_1.authenticateJWT, (0, AuthMiddleware_1.authorizeRole)(['tutor', 'admin']), PetController_1.default.createPet);
router.get('/pets', AuthMiddleware_1.authenticateJWT, (0, AuthMiddleware_1.authorizeRole)(['tutor']), PetController_1.default.getAllPetsByTutor);
router.get('/pets/all', AuthMiddleware_1.authenticateJWT, (0, AuthMiddleware_1.authorizeRole)(['medVet']), PetController_1.default.getAllPets);
router.delete('/pets/:id', AuthMiddleware_1.authenticateJWT, (0, AuthMiddleware_1.authorizeRole)(['tutor']), PetController_1.default.deletePet);
exports.default = router;
