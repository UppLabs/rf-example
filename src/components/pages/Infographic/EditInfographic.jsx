import React, { Component } from 'react';
import { Infographic } from "./Infographic.jsx";
import { callGet } from './../../../common/services/fetchService.jsx';
import { getUserToken } from './../../../common/services/userService.jsx';

export class EditInfographic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isLoading: true
    };

    this.loadUserData();
  }
    
  loadUserData () {
    callGet("user").then(response => {
      this.setState( prevState => {
        return {
            ...prevState,
            user: response.result,
            isLoading: false
        };
      })
    }, errorResponse =>{
      this.setState( prevState => {
        return {
            ...prevState,
            user: {},
            isLoading: false
        };
      })
    });
  }

  render() {
    return (
      <div>
        { !this.state.isLoading ? <Infographic user={this.state.user}/> : <span/>}
      </div>
    );
  }
}

export default EditInfographic;
