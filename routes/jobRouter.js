import { Router } from 'express';
const router = Router();

import {
    validateJobInput,
    validateIdParam,
} from '../middleware/validationMiddleware.js';
import {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
    showStats,
} from '../controllers/jobController.js';
import { checkForTestUser } from '../middleware/authMiddleware.js';

router
    .route('/')
    .get(getAllJobs)
    .post(checkForTestUser, validateJobInput, createJob);

router.route('/stats').get(showStats);

router
    .route('/:id')
    .get(validateIdParam, getJob)
    .patch(checkForTestUser, validateIdParam, validateJobInput, updateJob)
    .delete(checkForTestUser, validateIdParam, deleteJob);

export default router;
