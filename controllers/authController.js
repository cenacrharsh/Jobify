import User from "../models/User.js";

const register = async (req, res, next) => {
    const user = await User.create(req.body);
    res.status(201).json({ user });
};

const login = async (req, res) => {
    res.send("Login User");
};

const updateUser = async (req, res) => {
    res.send("Update User");
};

export { register, login, updateUser };
