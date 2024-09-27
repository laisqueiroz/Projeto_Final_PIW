"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthMiddleware_1 = require("../Middlewares/AuthMiddleware");
const ServiceController_1 = __importDefault(require("../Controllers/ServiceController"));
const router = (0, express_1.Router)();
router.get('/pets/:id/service', AuthMiddleware_1.authenticateJWT, (0, AuthMiddleware_1.authorizeRole)(['tutor']), ServiceController_1.default.getAllServices);
router.post('/pets/:petId/service/:serviceId', AuthMiddleware_1.authenticateJWT, (0, AuthMiddleware_1.authorizeRole)(['tutor']), ServiceController_1.default.addServiceToPet);
router.get('/service', AuthMiddleware_1.authenticateJWT, (0, AuthMiddleware_1.authorizeRole)(['admin']), AuthMiddleware_1.authorizeSelfOrAdmin, ServiceController_1.default.getAllServices);
router.post('/service', AuthMiddleware_1.authenticateJWT, (0, AuthMiddleware_1.authorizeRole)(['admin']), AuthMiddleware_1.authorizeSelfOrAdmin, ServiceController_1.default.createService);
router.put('/service/:id', AuthMiddleware_1.authenticateJWT, (0, AuthMiddleware_1.authorizeRole)(['admin']), AuthMiddleware_1.authorizeSelfOrAdmin, ServiceController_1.default.updateService);
router.delete('/service/:id', AuthMiddleware_1.authenticateJWT, (0, AuthMiddleware_1.authorizeRole)(['admin']), AuthMiddleware_1.authorizeSelfOrAdmin, ServiceController_1.default.deleteService);
router.get('/service/:id', ServiceController_1.default.getServiceId);
exports.default = router;
