import { Router } from 'express';
const router = Router();

import rateLimiter from 'express-rate-limit';
const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 15,
    message: {
        msg: 'IP rate limit exceeded, retry in 15 minutes',
    },
});

import {
    validateRegisterInput,
    validateLoginInput,
} from '../middleware/validationMiddleware.js';
import { login, logout, register } from '../controllers/authController.js';

router.post('/register', apiLimiter, validateRegisterInput, register);

router.post('/login', apiLimiter, validateLoginInput, login);

router.get('/logout', logout);

export default router;
