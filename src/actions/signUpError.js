export const ERROR_SIGNUP = 'ERROR_SIGNUP';
export const NONERROR_SIGNUP = 'NONERROR_SIGNUP';
export const setErrorSignUp = error =>({
    type: ERROR_SIGNUP,
    message: error.message
});
export const setErrorNuller= () =>({
    type: NONERROR_SIGNUP,
    message: ''
});