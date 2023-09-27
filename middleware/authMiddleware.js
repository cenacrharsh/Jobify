import {
    BadRequestError,
    UnauthenticatedError,
    UnauthorizedError,
} from '../errors/customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser = (req, res, next) => {
    //* check if cookie contains token
    const { token } = req.cookies;
    if (!token) {
        throw new UnauthenticatedError('Authentication Invalid');
    }

    //* verify the token
    try {
        const { userId, role } = verifyJWT(token);

        const testUser = userId === '650f1e566c75be9d463d84a7';

        //* attach user details to req body
        req.user = {
            userId,
            role,
            testUser,
        };

        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication Invalid');
    }
};

export const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError('Unauthorized to access this route');
        }

        next();
    };
};

export const checkForTestUser = (req, res, next) => {
    if (req.user.testUser) {
        throw new BadRequestError('Demo User. Read Only!');
    }
    next();
};
