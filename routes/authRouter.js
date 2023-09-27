import { Router } from 'express';
const router = Router();

import { validateRegisterInput } from '../middleware/validationMiddleware.js';
import { login, logout, register } from '../controllers/authController.js';

router.post('/register', validateRegisterInput, register);

router.post('/login', login);

router.get('/logout', logout);

export default router;
