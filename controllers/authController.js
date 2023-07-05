const register = (req, res) => {
    res.send("Register User");
};

const login = (req, res) => {
    res.send("Login User");
};

const updateUser = (req, res) => {
    res.send("Update User");
};

export { register, login, updateUser };
