import { useState, useEffect } from "react";
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
    const [values, setValues] = useState(initialState);

    const { isLoading, showAlert, displayAlert } = useAppContext();

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

        console.log(values);
    };

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

                <button type="submit" className="btn btn-block">
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
