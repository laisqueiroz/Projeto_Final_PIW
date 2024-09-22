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
const MedicalRecordModel_1 = require("../Models/MedicalRecordModel");
const PetModel_1 = require("../Models/PetModel");
PetModel_1.Pet.sync();
MedicalRecordModel_1.MedicalRecord.sync();
class MedicalRecordController {
    // Atualizar a ficha médica de um pet (somente Médico Veterinário)
    updateMedicalRecord(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { petId } = req.params;
                const { date, description } = req.body;
                const createMedicalRecord = yield MedicalRecordModel_1.MedicalRecord.create({ date, description });
                console.log(createMedicalRecord);
                const pet = yield PetModel_1.Pet.findByPk(petId);
                console.log(MedicalRecordModel_1.MedicalRecord.findAll);
                console.log(pet === null || pet === void 0 ? void 0 : pet.history);
                if (pet && createMedicalRecord) {
                    pet.addRecord(createMedicalRecord);
                    yield pet.save();
                    res.status(200).json({ message: 'Ficha atualizada com sucesso' });
                }
                else {
                    res.status(404).json({ error: 'Pet não encontrado' });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Erro ao atualizar ficha médica' });
            }
        });
    }
    // Ver ficha médica de um pet (Tutor e Médico Veterinário)
    getMedicalRecord(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { petId } = req.params;
                const pet = yield PetModel_1.Pet.findByPk(petId);
                if (pet) {
                    res.status(200).json(pet.history);
                }
                else {
                    res.status(404).json({ error: 'Ficha médica não encontrada' });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Erro ao buscar ficha médica' });
            }
        });
    }
}
exports.default = new MedicalRecordController();
