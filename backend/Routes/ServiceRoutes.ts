import { Router } from 'express';
import { authenticateJWT, authorizeRole, authorizeSelfOrAdmin } from '../Middlewares/AuthMiddleware';
import ServiceController from '../Controllers/ServiceController';

const router = Router();

router.get('/pets/:id/service', authenticateJWT, authorizeRole(['tutor']), ServiceController.getAllServices);
router.post('/pets/:petId/service/:serviceId', authenticateJWT, authorizeRole(['tutor']), ServiceController.addServiceToPet);
router.get('/service', authenticateJWT, authorizeRole(['admin']), authorizeSelfOrAdmin, ServiceController.getAllServices);
router.post('/service', authenticateJWT, authorizeRole(['admin']), authorizeSelfOrAdmin, ServiceController.createService);
router.put('/service/:id', authenticateJWT, authorizeRole(['admin']), authorizeSelfOrAdmin, ServiceController.updateService);
router.delete('/service/:id', authenticateJWT, authorizeRole(['admin']), authorizeSelfOrAdmin, ServiceController.deleteService);
router.get('/service/:id', ServiceController.getServiceId)

export default router;