import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar } from 'react-bootstrap'
import { connect } from 'react-redux'

class Menu extends Component {
    navbarLinks() {
        if(!this.props.authenticated){
            return (
                <ul className="nav navbar-nav mr-auto pull-right">
                    <li className="nav-item">
                    <NavLink to='/signin' activeClassName="active">Sign in</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/signup' activeClassName="active">Sign up</NavLink>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul className="nav navbar-nav mr-auto pull-right">
                    <li className="nav-item">
                        <NavLink to='/signout' activeClassName="active">Sign out</NavLink>
                    </li>
                </ul>
            );
        }
    };

  render() {
    return (
        <Navbar collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <NavLink to='/home' activeClassName="active">Home</NavLink>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
            <ul className="nav navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink to='/elements' activeClassName="active">Elements</NavLink>
                </li>
            </ul>
            {this.navbarLinks()}
            </Navbar.Collapse>
        </Navbar>
    );
  }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    };
}
  
export default connect(mapStateToProps)(Menu);
