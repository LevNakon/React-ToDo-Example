import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withFormik, Form, Field } from 'formik';
import Button from '@material-ui/core/Button';
import ItemsService from '../../services/ItemsService'
import * as Yup from 'yup';
import PATHS from '../../constants/routes';
import fakeAuth from '../../services/FakeAuth';
import { fetchCraeteItem } from '../../actions/items';

const Item = ({
    values,
    errors,
    touched }) => (
        <Form className='for-items'>
            <h1>Item form</h1>
            <div>
                {(values.title === '') ? <React.Fragment>
                    {touched.title && errors.title && <p>{errors.title}</p>}
                    <Field type="text" name="title" placeholder="Title" /></React.Fragment> :
                    <React.Fragment>
                        {touched.title && errors.title && <p>{errors.title}</p>}
                        <Field type="text" name="title" placeholder={values.title} value={values.title}/></React.Fragment>}
            </div>
            <div>
                {touched.expires_at && errors.expires_at && <p>{errors.expires_at}</p>}
                <Field type="datetime-local" name="expires_at" placeholder="Date" />
            </div>
            <button type="submit">Submit</button>
        </Form>
    );


const ItemForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues({ title, expires_at }) {
        return {
            title: title || '',
            expires_at: expires_at || ''
        }
    },
    validationSchema: Yup.object().shape({
        title: Yup.string().min(3, 'Title must be 3 characters or longer').required('Title is required'),
        expires_at: Yup.string().required('Date is required')
    }),
    handleSubmit(values, { props }) {
        let { title, expires_at } = values;
        let new_time = expires_at.concat(':00.000Z');
        props.actions.fetchCraeteItem(props.token, title, new_time);
    }
})(Item);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        fetchCraeteItem
    }, dispatch)
});

const mapStateToProps = ({ loginErrorSuc }) => ({
    token: loginErrorSuc.token
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);
