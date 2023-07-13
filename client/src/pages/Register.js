import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo, FormRow, Alert } from "../components";
import { useAppContext } from "../context/appContext";

const initialState = {
    name: "",
    email: "",
    password: "",
    isMember: true,
};

const Register = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState(initialState);

    const {
        user,
        isLoading,
        showAlert,
        displayAlert,
        registerUser,
        loginUser,
    } = useAppContext();

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember });
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        //* if any value is missing, throw display alert
        const { name, email, password, isMember } = values;

        //* name is only required when isMember is not true
        if (!email || !password || (!isMember && !name)) {
            displayAlert();
            return;
        }

        const currentUser = { name, email, password };
        if (isMember) {
            loginUser(currentUser);
        } else {
            registerUser(currentUser);
        }
    };

    //* runs on initial render and anytime when user value changes (during register and login)
    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate("/");
            }, 3000);
        }
    }, [user, navigate]);

    return (
        <Wrapper className="full-page">
            <form className="form" onSubmit={onSubmit}>
                <Logo />
                <h3>{values.isMember ? "Login" : "Register"}</h3>

                {/* Alert */}
                {showAlert && <Alert />}

                {/* Name Input */}
                {!values.isMember && (
                    <FormRow
                        type="text"
                        name="name"
                        value={values.name}
                        handleChange={handleChange}
                    />
                )}
                {/* Email Input */}
                <FormRow
                    type="email"
                    name="email"
                    value={values.email}
                    handleChange={handleChange}
                />
                {/* Password Input */}
                <FormRow
                    type="password"
                    name="password"
                    value={values.password}
                    handleChange={handleChange}
                />

                <button
                    type="submit"
                    className="btn btn-block"
                    disabled={isLoading}
                >
                    Submit
                </button>

                <p>
                    {values.isMember
                        ? "Not a member yet ?"
                        : "Already a member ?"}
                    <button
                        type="button"
                        onClick={toggleMember}
                        className="member-btn"
                    >
                        {values.isMember ? "Register" : "Login"}
                    </button>
                </p>
            </form>
        </Wrapper>
    );
};

export default Register;
