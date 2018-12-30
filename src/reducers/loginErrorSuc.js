import { ERROR_LOGIN, SUCCESS_LOGIN } from "../actions/loginError";
import LOCALSTORAGE from '../constants/localstorage';

const initialState = { message: '', token: localStorage.getItem(LOCALSTORAGE.TOKEN), auth: null };

export default (state = initialState, action) => {
    switch (action.type) {
        case ERROR_LOGIN:
            return {
                ...state,
                auth:action.auth,
                message: action.message,
                token: action.token
            };
        case SUCCESS_LOGIN:
            return {
                ...state,
                auth:action.auth,
                message: action.message,
                token: action.token
            };
        default: return state;
    }
}