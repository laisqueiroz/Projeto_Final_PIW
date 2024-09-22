"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthMiddleware_1 = require("../Middlewares/AuthMiddleware");
const MedicalRecordController_1 = __importDefault(require("../Controllers/MedicalRecordController"));
const router = (0, express_1.Router)();
router.get('/pets/:petId/record', AuthMiddleware_1.authenticateJWT, (0, AuthMiddleware_1.authorizeRole)(['tutor', 'medVet']), MedicalRecordController_1.default.getMedicalRecord);
router.put('/pets/:petId/record', AuthMiddleware_1.authenticateJWT, (0, AuthMiddleware_1.authorizeRole)(['medVet']), MedicalRecordController_1.default.updateMedicalRecord);
exports.default = router;
