import React, { Component } from 'react';
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';

import './styles/base.scss';
import Main from './components/Main';
import TodosContainer from './containers/TodosContainer';
import Todos from './components/Todos';
import PATHS from "./constants/routes";
import Error404 from './components/ERROR';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import TodoItem from './components/TodoItem';
import {PrivateRouteLogin , PrivateRouteTodos} from './components/PrivateRoute';
import fakeAuth from './services/FakeAuth';
import './styles/style.css'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Main>
              <Switch>
                <Route exact path={PATHS.INDEX} render={props =>(<Redirect to={PATHS.TODOS}/>)} />
                <PrivateRouteTodos path={PATHS.SIGNUP} component={SignUpForm} />
                <PrivateRouteTodos path={PATHS.LOGIN} component={LoginForm} />
                <Route path={PATHS.LOGOUT} render={props =>{fakeAuth.logOut();return <Redirect to={PATHS.INDEX}/>}}/>
                <PrivateRouteLogin exact path={PATHS.TODOS} component={TodosContainer}/>
                <PrivateRouteLogin exact path={PATHS.TODOID} component={TodoItem}/>
                <Route component={Error404}/>
              </Switch>
            </Main>
          </div>
        </BrowserRouter>
        </Provider>
    );
  }
}

export default App;
