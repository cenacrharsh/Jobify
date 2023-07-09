import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

const register = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new BadRequestError("Please provide all values");
    }

    //* check for duplicate email
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
        throw new BadRequestError("Email already registered");
    }

    //# select: false, doesn't work with create()
    //* create a new user in DB
    const user = await User.create({ name, email, password });

    //* create JWT Token
    const token = user.createJWT();

    res.status(StatusCodes.CREATED).json({
        user: {
            email: user.email,
            lastName: user.lastName,
            location: user.location,
            name: user.name,
        },
        token,
    });
};

const login = async (req, res) => {
    res.send("Login User");
};

const updateUser = async (req, res) => {
    res.send("Update User");
};

export { register, login, updateUser };
