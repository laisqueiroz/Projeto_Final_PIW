import { Router } from 'express';
import { authenticateJWT, authorizeRole, authorizeSelfOrAdmin } from '../Middlewares/AuthMiddleware';
import PetController from '../Controllers/PetController';

const router = Router();

router.post('/pets', authenticateJWT, authorizeRole(['tutor', 'admin']), PetController.createPet);
router.get('/pets', authenticateJWT, authorizeRole(['tutor']), PetController.getAllPetsByTutor);
router.get('/pets/all', authenticateJWT, authorizeRole(['medVet']), PetController.getAllPets);
router.delete('/pets/:id', authenticateJWT, authorizeRole(['tutor']), PetController.deletePet);

export default router;