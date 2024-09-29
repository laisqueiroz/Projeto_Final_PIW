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
const PetModel_1 = require("../Models/PetModel");
PetModel_1.Pet.sync();
class PetController {
    // Adicionar um novo pet (somente Tutor)
    createPet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, dateBirth, species, breed, services, history, userId } = req.body;
                if (!name || !dateBirth || !species || !breed || !services || !history || !userId) {
                    return res.status(400).json({ message: "Campos obrigatórios não foram preenchidos." });
                }
                const newPet = yield PetModel_1.Pet.create({ name, dateBirth, species, breed, services, history, userId });
                res.status(201).json(newPet);
            }
            catch (error) {
                res.status(500).json({ error: 'Erro ao adicionar pet' });
            }
        });
    }
    // Ver todos os pets do tutor (somente Tutor)
    getAllPetsByTutor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const userId = user.id;
                const pets = yield PetModel_1.Pet.findAll({ where: { userId } });
                res.status(200).json(pets);
            }
            catch (error) {
                res.status(500).json({ error: 'Erro ao buscar pets' });
            }
        });
    }
    // Excluir um pet (somente Tutor)
    deletePet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = req.user;
                const userId = user.id;
                const pet = yield PetModel_1.Pet.findOne({ where: { id, userId } });
                if (pet) {
                    yield pet.destroy();
                    res.status(200).json({ message: 'Pet excluído com sucesso' });
                }
                else {
                    res.status(404).json({ error: 'Pet não encontrado' });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Erro ao excluir pet' });
            }
        });
    }
    // Ver todos os pets (somente Médico Veterinário)
    getAllPets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pets = yield PetModel_1.Pet.findAll();
                res.status(200).json(pets);
            }
            catch (error) {
                res.status(500).json({ error: 'Erro ao buscar pets' });
            }
        });
    }
}
exports.default = new PetController();
