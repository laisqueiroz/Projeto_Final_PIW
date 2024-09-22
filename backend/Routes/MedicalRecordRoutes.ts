import { Router } from 'express';
import { authenticateJWT, authorizeRole, authorizeSelfOrAdmin } from '../Middlewares/AuthMiddleware';
import MedicalRecordController from '../Controllers/MedicalRecordController';

const router = Router();

router.get('/pets/:petId/record', authenticateJWT, authorizeRole(['tutor', 'medVet']), MedicalRecordController.getMedicalRecord);
router.put('/pets/:petId/record', authenticateJWT, authorizeRole(['medVet']), MedicalRecordController.updateMedicalRecord);

export default router;