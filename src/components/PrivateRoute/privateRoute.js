import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import fakeAuth from "../../services/FakeAuth";
import PATHS from '../../constants/routes';

const PrivateRouteLogin = ({ component: Component, ...rest }) => (
    <Route {...rest}
        render={props => {
            return !fakeAuth.isAuthenticated ? <Redirect to={PATHS.LOGIN} /> : <Component {...props} />
        }}
    />
);

const PrivateRouteTodos = ({ component: Component, ...rest }) => (
    <Route {...rest}
        render={props => {
            return fakeAuth.isAuthenticated ? <Redirect to={PATHS.TODOS} /> : <Component {...props} />
        }}
    />
);

export { PrivateRouteLogin, PrivateRouteTodos };