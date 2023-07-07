import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
    //* built in js error always has a message property
    console.log(err);
    const defaultError = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong, Try again later",
    };

    //> Validation Error
    if (err.name === "ValidationError") {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        defaultError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(", ");
        // defaultError.msg = err.message;
    }

    //> Unique Field Error
    if (err.code === 11000) {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        defaultError.msg = `${Object.keys(
            err.keyValue
        )} field has to be unique`;
    }

    // res.status(defaultError.statusCode).json({
    //     msg: err,
    // });
    res.status(defaultError.statusCode).json({
        msg: defaultError.msg,
    });
};

export default errorHandlerMiddleware;
