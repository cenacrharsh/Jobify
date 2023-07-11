import React, { useReducer, useContext } from "react";
import axios from "axios";

import reducer from "./reducer";
import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
} from "./actions";

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: "",
    alertType: "",
    user: null,
    token: null,
    userLocation: "",
    jobLocation: "",
};

const AppContext = React.createContext();

//* children is our application, which we are rendering
const AppProvider = ({ children }) => {
    //* reducer is a function which will handle our dispatch
    const [state, dispatch] = useReducer(reducer, initialState);

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT });
        clearAlert();
    };

    //* it will clear the alert in 3sec
    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT });
        }, 3000);
    };

    const registerUser = async (currentUser) => {
        dispatch({
            type: REGISTER_USER_BEGIN,
        });

        try {
            const response = await axios.post(
                "/api/v1/auth/register",
                currentUser
            );
            console.log(response);
            const { user, token, location } = response.data;
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: {
                    user,
                    token,
                    location,
                },
            });
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: {
                    msg: error.response.data.msg,
                },
            });
        }

        clearAlert();
    };

    return (
        <AppContext.Provider value={{ ...state, displayAlert, registerUser }}>
            {children}
        </AppContext.Provider>
    );
};

//* custom hook, which we'll use in other components, to get access to initialState
const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
