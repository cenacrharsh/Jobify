import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

class CustomAPIError extends Error {
    constructor(message) {
        super(message);
    }
}

class BadRequestError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

class NotFoundError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

const register = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new BadRequestError("Please provide all values");
    }

    const user = await User.create({ name, email, password });
    res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
    res.send("Login User");
};

const updateUser = async (req, res) => {
    res.send("Update User");
};

export { register, login, updateUser };
