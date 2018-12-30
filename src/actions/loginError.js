export const ERROR_LOGIN = 'ERROR_LOGIN';
export const setErrorLogin = error =>({
    type: ERROR_LOGIN,
    auth: error.auth,
    token:null,
    message: error.message
});
export const SUCCESS_LOGIN = 'SUCCESS_LOGIN';
export const setSuccessLogin = data =>({
    type: SUCCESS_LOGIN,
    auth: data.auth,
    token: data.token,
    message:''
});