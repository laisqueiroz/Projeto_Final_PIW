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
const ServicesModel_1 = require("../Models/ServicesModel");
const PetModel_1 = require("../Models/PetModel");
ServicesModel_1.Services.sync();
class ServiceController {
    // Criar um novo serviço (somente Admin)
    createService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description, price, category } = req.body;
                const newService = yield ServicesModel_1.Services.create({ name, description, price, category });
                res.status(201).json(newService);
            }
            catch (error) {
                res.status(500).json({ error: 'Erro ao criar serviço' });
            }
        });
    }
    // Ver todos os serviços (Admin e Tutor)
    getAllServices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const services = yield ServicesModel_1.Services.findAll();
                res.status(200).json(services);
            }
            catch (error) {
                res.status(500).json({ error: 'Erro ao buscar serviços' });
            }
        });
    }
    // Atualizar um serviço (somente Admin)
    updateService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name, description, price, category } = req.body;
                const serviceToUpdate = yield ServicesModel_1.Services.findByPk(id);
                if (!serviceToUpdate) {
                    return res.status(404).json({ message: 'Usuário não encontrado.' });
                }
                if (name)
                    serviceToUpdate.name = name;
                if (description)
                    serviceToUpdate.description = description;
                if (price)
                    serviceToUpdate.price = price;
                if (category)
                    serviceToUpdate.category = category;
                yield serviceToUpdate.save();
                res.status(200).json(serviceToUpdate);
            }
            catch (error) {
                res.status(500).json({ error: 'Erro ao atualizar serviço' });
            }
        });
    }
    getServiceId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const idService = yield ServicesModel_1.Services.findByPk(id);
                return res.status(200).json(idService);
            }
            catch (error) {
                res.status(500).json({ error: 'Erro ao buscar serviço!' });
            }
        });
    }
    // Excluir um serviço (somente Admin)
    deleteService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const serviceToDelete = yield ServicesModel_1.Services.findByPk(id);
                if (!serviceToDelete) {
                    return res.status(404).json({ message: 'Serviço/Produto não encontrado.' });
                }
                yield serviceToDelete.destroy();
                res.status(200).json({ message: 'Serviço excluído com sucesso' });
            }
            catch (error) {
                res.status(500).json({ error: 'Erro ao excluir serviço' });
            }
        });
    }
    // Adicionar serviço ao pet (somente Tutor)
    addServiceToPet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { petId, serviceId } = req.params;
                const pet = yield PetModel_1.Pet.findByPk(petId);
                const service = yield ServicesModel_1.Services.findByPk(serviceId);
                if (pet && service) {
                    pet.addService(service);
                    yield pet.save();
                    res.status(200).json({ message: 'Serviço adicionado ao pet com sucesso' });
                }
                else {
                    res.status(404).json({ error: 'Pet ou Serviço não encontrado' });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Erro ao adicionar serviço ao pet' });
            }
        });
    }
}
exports.default = new ServiceController();
