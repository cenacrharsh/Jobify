import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);
    const defaultError = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Something went wrong, Try again later",
    };
    res.status(defaultError.statusCode).json({
        message: err,
    });
};

export default errorHandlerMiddleware;
