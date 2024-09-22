import { Router } from 'express';
import { loginUser, getUsers, createUser, updateUser, deleteUser } from '../Controllers/UserController';
import { authenticateJWT, authorizeRole, authorizeSelfOrAdmin } from '../Middlewares/AuthMiddleware';

const router = Router();

///router.get('/users', authenticateJWT, authorizeRole(['admin']), authorizeSelfOrAdmin, getUsers);
router.get('/users', getUsers);
router.post('/users', authenticateJWT, authorizeRole(['admin']), authorizeSelfOrAdmin, createUser);
router.post('/login', loginUser);
router.put('/users/:id', authenticateJWT, authorizeSelfOrAdmin, updateUser);
router.delete('/users/:id', authenticateJWT, authorizeRole(['admin']), authorizeSelfOrAdmin, deleteUser);

export default router;