import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
} from "./actions";

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertType: "danger",
            alertText: "Please provide all values!",
        };
    }

    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: "",
            alertText: "",
        };
    }

    if (action.type === REGISTER_USER_BEGIN) {
        return {
            ...state,
            isLoading: true,
        };
    }

    if (action.type === REGISTER_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            token: action.payload.token,
            userLocation: action.payload.user.location,
            jobLocation: action.payload.user.location,
            showAlert: true,
            alertType: "success",
            alertText: "User Created! Redirecting...",
        };
    }

    if (action.type === REGISTER_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.msg,
        };
    }

    throw new Error(`no such action : ${action.type}`);
};

export default reducer;
