import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar } from 'react-bootstrap'
import { connect } from 'react-redux'

class TopMenu extends Component {
  render() {
    return (
        <Navbar collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <NavLink to='/'>RentalFriend</NavLink>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
        </Navbar>
    );
  }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    };
}
  
export default connect(mapStateToProps)(TopMenu);
