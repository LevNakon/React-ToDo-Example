import { ERROR_SIGNUP,NONERROR_SIGNUP} from "../actions/signUpError";

const initialState = { message: '' };

export default (state = initialState, action) => {
    switch (action.type) {
        case ERROR_SIGNUP:
            return {
                ...state,
                message: action.message
            };
        case NONERROR_SIGNUP:
            return {
                ...state,
                message: action.message
            };
        default: return state;
    }
}