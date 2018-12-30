import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withFormik, Form, Field } from 'formik';
import Button from '@material-ui/core/Button';
import ItemsService from '../../services/ItemsService';
import PATHS from '../../constants/routes';
import { setErrorSignUp,setErrorNuller } from '../../actions/signUpError';
import * as Yup from 'yup';

const SignUp = ({
    errorMessage,
    errors,
    touched }) => (
        <Form className='for-form'>
            <h1>Registration form</h1>
            <div>
                {touched.firstName && errors.firstName && <p>{errors.firstName}</p>}
                <Field type="text" name="firstName" placeholder="FirstName" />
            </div>
            <div>
                {touched.lastName && errors.lastName && <p>{errors.lastName}</p>}
                <Field type="text" name="lastName" placeholder="LastName" />
            </div>
            <div>
                {touched.email && errors.email && <p>{errors.email}</p>}
                <Field type="email" name="email" placeholder="Email" />
            </div>
            <div>
                {touched.username && errors.username && <p>{errors.username}</p>}
                <Field type="text" name="username" placeholder="Username" />
            </div>
            <div>
                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field type="password" name="password" placeholder="Password" />
            </div>
            <div>
                {touched.cpassword && errors.cpassword && <p>{errors.cpassword}</p>}
                <Field type="password" name="cpassword" placeholder="Confirm password" />
            </div>
            <div style={{ color: 'red' }}>{errorMessage}</div>
            <button type='submit'>Submit</button>
        </Form>
    );


const SignUpForm = withFormik({
    mapPropsToValues({ firstName, lastName, email, username, password, cpassword }) {
        return {
            firstName: firstName || '',
            lastName: lastName || '',
            email: email || '',
            username: username || '',
            password: password || '',
            cpassword: cpassword || ''
        }
    },
    validationSchema: Yup.object().shape({
        firstName: Yup.string().required('FirstName is required'),
        lastName: Yup.string().required('LastName is required'),
        email: Yup.string().email('Email not valid').required('Email is required'),
        username: Yup.string().min(5, 'Username must be 5 characters or longer').required('Username is required'),
        password: Yup.string().min(9, 'Password must be 9 characters or longer').required('Password is required'),
        cpassword: Yup.string().oneOf([Yup.ref('password'), null], "Passwords don't match").min(9, 'Password must be 9 characters or longer').required('Password is required')
    }),
    handleSubmit(values, { props }) {
        let { firstName, lastName, username, email, password, cpassword } = values;
        let serverAns = ItemsService.postSignUp(firstName, lastName, username, email, password);
        serverAns.then((resolve) => {
            console.log(resolve);
            // console.log(props);
            if (resolve.error) {
                props.actions.setErrorSignUp(resolve);
            } else {
                props.actions.setErrorNuller();
                props.history.push(PATHS.LOGIN);
            }
        }).catch(err => console.log(err));
    }
})(SignUp);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        setErrorSignUp,
        setErrorNuller
    }, dispatch)
});

const mapStateToProps = ({ signUpError }) => ({
    errorMessage: signUpError.message
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
