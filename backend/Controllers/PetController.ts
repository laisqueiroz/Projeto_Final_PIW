import { Request, Response } from 'express';
import { Pet } from '../Models/PetModel';
import { JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends Request{
    user?: string | JwtPayload;
}

Pet.sync();

class PetController {

  // Adicionar um novo pet (somente Tutor)
  async createPet(req: CustomRequest, res: Response) {
    try {
      const { name, dateBirth, species, breed, services, history, userId } = req.body;
      const newPet = await Pet.create({ name, dateBirth, species, breed, services, history, userId});
      res.status(201).json(newPet);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao adicionar pet' });
    }
  }

  // Ver todos os pets do tutor (somente Tutor)
  async getAllPetsByTutor(req: CustomRequest, res: Response) {
    try {
      const user = req.user as JwtPayload
      const userId = user.id; // Supondo que o userId é extraído do token JWT
      const pets = await Pet.findAll({ where: { userId } });
      res.status(200).json(pets);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar pets' });
    }
  }

  // Excluir um pet (somente Tutor)
  async deletePet(req: CustomRequest, res: Response) {
    try {
      const { id } = req.params;
      const user = req.user as JwtPayload
      const userId = user.id; // Supondo que o userId é extraído do token JWT
      const pet = await Pet.findOne({ where: { id, userId } });
      if (pet) {
        await pet.destroy();
        res.status(200).json({ message: 'Pet excluído com sucesso' });
      } else {
        res.status(404).json({ error: 'Pet não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir pet' });
    }
  }

  // Ver todos os pets (somente Médico Veterinário)
  async getAllPets(req: Request, res: Response) {
    try {
      const pets = await Pet.findAll();
      res.status(200).json(pets);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar pets' });
    }
  }
}

export default new PetController();
