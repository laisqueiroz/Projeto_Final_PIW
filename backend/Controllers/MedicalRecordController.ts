import { Request, Response } from 'express';
import { MedicalRecord } from '../Models/MedicalRecordModel'; 
import { Pet } from '../Models/PetModel'; 

Pet.sync();
MedicalRecord.sync();

class MedicalRecordController {
  // Atualizar a ficha médica de um pet (somente Médico Veterinário)
  async updateMedicalRecord(req: Request, res: Response) {
    try {
      const { petId } = req.params;
      const { date, description } = req.body;
      const createMedicalRecord = await MedicalRecord.create({date, description});
      console.log(createMedicalRecord);
      const pet = await Pet.findByPk(petId);
      console.log(MedicalRecord.findAll)
      console.log(pet?.history)
      if (pet && createMedicalRecord) {
        pet.addRecord(createMedicalRecord); 
        await pet.save();
        res.status(200).json({ message: 'Ficha atualizada com sucesso' });
      }
      else{
        res.status(404).json({ error: 'Pet não encontrado' })
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar ficha médica' });
    }
  }

  // Ver ficha médica de um pet (Tutor e Médico Veterinário)
  async getMedicalRecord(req: Request, res: Response) {
    try {
      const { petId } = req.params;
      const pet = await Pet.findByPk(petId);
      if ( pet ) {
        res.status(200).json(pet.history);
      } else {
        res.status(404).json({ error: 'Ficha médica não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar ficha médica' });
    }
  }
}

export default new MedicalRecordController();
