import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PATHS from "../../constants/routes";
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import fakeAuth from '../../services/FakeAuth';
class Header extends Component {
  render() {
    return (
      <Toolbar className='for-tool'>
        <NavLink to={PATHS.TODOS} className='for-link' activeClassName='selected'><Button>Todo List</Button></NavLink>
        {!fakeAuth.isAuthenticated && <NavLink to={PATHS.SIGNUP} className='for-link' activeClassName='selected'><Button>Sign Up</Button></NavLink>}
        {!fakeAuth.isAuthenticated && <NavLink to={PATHS.LOGIN} className='for-link' activeClassName='selected'><Button>Login</Button></NavLink>}
        {fakeAuth.isAuthenticated && <NavLink to={PATHS.LOGOUT} className='for-link' activeClassName='selected'><Button>Logout</Button></NavLink>}
      </Toolbar>);
  }
}

export default Header;
