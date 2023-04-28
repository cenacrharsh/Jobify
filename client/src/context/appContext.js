import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import { DISPLAY_ALERT, CLEAR_ALERT } from "./actions";

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: "",
    alertType: "",
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

    return (
        <AppContext.Provider value={{ ...state, displayAlert }}>
            {children}
        </AppContext.Provider>
    );
};

//* custom hook, which we'll use in other components, to get access to initialState
const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
