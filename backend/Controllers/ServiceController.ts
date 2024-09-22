import { Request, Response } from 'express';
import { Services } from '../Models/ServicesModel'; 
import { Pet } from '../Models/PetModel';

Services.sync();

class ServiceController {
  // Criar um novo serviço (somente Admin)
  async createService(req: Request, res: Response) {
    try {
      const { name, description, price , category} = req.body;
      const newService = await Services.create({ name, description, price, category });
      res.status(201).json(newService);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar serviço' });
    }
  }

  // Ver todos os serviços (Admin e Tutor)
  async getAllServices(req: Request, res: Response) {
    try {
      console.log(Services.findAll())
      const services = await Services.findAll();

      res.status(200).json(services);
      
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar serviços' });
    }
  }

  // Atualizar um serviço (somente Admin)
  async updateService(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description, price, category } = req.body;
      const updatedService = await Services.update(
        { name, description, price, category },
        { where: { id } }
      );
      res.status(200).json(updatedService);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar serviço' });
    }
  }

  // Excluir um serviço (somente Admin)
  async deleteService(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await Services.destroy({ where: { id } });
      res.status(200).json({ message: 'Serviço excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir serviço' });
    }
  }

  // Adicionar serviço ao pet (somente Tutor)
  async addServiceToPet(req: Request, res: Response) {
    try {
      const { petId, serviceId } = req.params;
      const pet = await Pet.findByPk(petId);
      const service = await Services.findByPk(serviceId);
      if (pet && service) {
        pet.addService(service); 
        await pet.save();
        res.status(200).json({ message: 'Serviço adicionado ao pet com sucesso' });
      } else {
        res.status(404).json({ error: 'Pet ou Serviço não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao adicionar serviço ao pet' });
    }
  }
}

export default new ServiceController();
