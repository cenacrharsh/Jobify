import { body, param, validationResult } from 'express-validator';
import mongoose from 'mongoose';

import {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
} from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import Job from '../models/JobModel.js';
import User from '../models/UserModel.js';

const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg);

                //* check if it's a not found error
                if (errorMessages[0].startsWith('No Job')) {
                    throw new NotFoundError(errorMessages);
                }

                //* check if it's a unauthorized error
                if (errorMessages[0].startsWith('Not authorized')) {
                    throw new UnauthorizedError(
                        'Not authorized to access this route',
                    );
                }

                throw new BadRequestError(errorMessages);
            }

            next();
        },
    ];
};

export const validateJobInput = withValidationErrors([
    body('company').notEmpty().withMessage('company is required'),

    body('position').notEmpty().withMessage('position is required'),

    body('jobLocation').notEmpty().withMessage('job location is required'),

    body('jobStatus')
        .isIn(Object.values(JOB_STATUS))
        .withMessage('invalid status value'),

    body('jobType')
        .isIn(Object.values(JOB_TYPE))
        .withMessage('invalid type value'),
]);

export const validateIdParam = withValidationErrors([
    param('id').custom(async (value, { req }) => {
        const isValidId = mongoose.Types.ObjectId.isValid(value);
        if (!isValidId) {
            throw new BadRequestError('Invalid MongoDB ObjectId');
        }

        const job = await Job.findById(value);
        if (!job) {
            throw new NotFoundError(`No Job With Given Id ${value}`);
        }

        //* check if user logged in is an admin or the actual owner
        const isAdmin = req.user.role === 'admin';
        const isOwner = req.user.userId === job.createdBy.toString();
        if (!isAdmin && !isOwner) {
            throw new UnauthorizedError('Not authorized to access this route');
        }
    }),
]);

export const validateRegisterInput = withValidationErrors([
    body('name').notEmpty().withMessage('name is required'),

    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('invalid email format')
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (user) {
                throw new BadRequestError('Email already exists');
            }
        }),

    body('password')
        .notEmpty()
        .withMessage('password is required')
        .isLength({
            min: 8,
        })
        .withMessage('password must be 8 characters long'),

    body('location').notEmpty().withMessage('location is required'),

    body('lastName').notEmpty().withMessage('last name is required'),
]);

export const validateLoginInput = withValidationErrors([
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('invalid email format'),
    body('password').notEmpty().withMessage('password is required'),
]);

export const validateUpdateUserInput = withValidationErrors([
    body('name').notEmpty().withMessage('name is required'),

    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('invalid email format')
        .custom(async (email, { req }) => {
            const user = await User.findOne({ email });

            //* we need to check id's otherwise our user document would be taken as duplicate accounts
            if (user && user._id.toString() !== req.user.userId) {
                throw new Error('Email already exists');
            }
        }),

    body('lastName').notEmpty().withMessage('last name is required'),

    body('location').notEmpty().withMessage('location is required'),
]);
