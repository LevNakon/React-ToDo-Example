import {combineReducers} from 'redux';
import signUpError from './signUpError';
import loginErrorSuc from './loginErrorSuc';
import itemsReducer from './itemsReducer';


export default combineReducers({
    signUpError,
    loginErrorSuc,
    itemsReducer
});