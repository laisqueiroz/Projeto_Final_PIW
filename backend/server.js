"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const UserRoutes_1 = __importDefault(require("./Routes/UserRoutes"));
const PetRoutes_1 = __importDefault(require("./Routes/PetRoutes"));
const ServiceRoutes_1 = __importDefault(require("./Routes/ServiceRoutes"));
const MedicalRecordRoutes_1 = __importDefault(require("./Routes/MedicalRecordRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/', UserRoutes_1.default);
app.use('/', PetRoutes_1.default);
app.use('/', ServiceRoutes_1.default);
app.use('/', MedicalRecordRoutes_1.default);
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port} http://localhost:3000/`);
});
