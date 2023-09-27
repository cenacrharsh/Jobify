import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);

    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const msg = err.message || 'Something Went Wrong, Try Again Later.';

    res.status(statusCode).json({
        msg,
    });
};

export default errorHandlerMiddleware;
