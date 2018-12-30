import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withFormik, Form, Field } from 'formik';
import Button from '@material-ui/core/Button';
import ItemsService from '../../services/ItemsService'
import * as Yup from 'yup';
import PATHS from '../../constants/routes';
import fakeAuth from '../../services/FakeAuth';
import {setErrorLogin,setSuccessLogin} from '../../actions/loginError';
import {setErrorNuller} from '../../actions/signUpError';

const Login = ({
    errorMessage,
    errors,
    touched }) => (
        <Form className='for-form'>
            <h1>Logination form</h1>
            <div>
                {touched.username && errors.username && <p>{errors.username}</p>}
                <Field type="text" name="username" placeholder="Username" />
            </div>
            <div>
                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field type="password" name="password" placeholder="Password" />
            </div>
            <div style={{ color: 'red' }}>{errorMessage}</div>
            <button type="submit">Submit</button>
        </Form>
    );


const LoginForm = withFormik({
    mapPropsToValues({ username, password }) {
        return {
            username: username || '',
            password: password || ''
        }
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().min(5, 'Username must be 5 characters or longer').required('Username is required'),
        password: Yup.string().min(9, 'Password must be 9 characters or longer').required('Password is required')
    }),
    handleSubmit(values, { props }) {
        let { username, password } = values;
        let serverAns = ItemsService.postLogin(username, password);
        serverAns.then((resolve)=>{
            // console.log(resolve);
            if(!resolve.auth){
                //console.log(resolve.message);
                props.actions.setErrorLogin(resolve);
            }else{
                // console.log(resolve.token);
                props.actions.setSuccessLogin(resolve);
                props.actions.setErrorNuller();
                fakeAuth.login(resolve.token);
                props.history.push(PATHS.TODOS);
            }
        }).catch(err => console.log(err));
    }
})(Login);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        setErrorLogin,
        setSuccessLogin,
        setErrorNuller
    }, dispatch)
});

const mapStateToProps = ({ loginErrorSuc }) => ({
    errorMessage: loginErrorSuc.message
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
