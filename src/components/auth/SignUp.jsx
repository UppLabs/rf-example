import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Row, Col, FormGroup, Button } from 'react-bootstrap'
import RenderField from '../hoc/RenderField'
import {required, email, comparePassword} from '../../common/validation'
import {connect} from 'react-redux'
import { signUpAction } from '../../actions'

class SignUp extends Component {
  submit = (values) => {
    this.props.signUpAction(values, this.props.history);
  }
  errorMessage() {
    if (this.props.errorMessage) {
      return (
        <div className="text-danger">
          {this.props.errorMessage}
        </div>
      );
    }
  }
  render() {
    const {password, handleSubmit } = this.props;
    return (
      <Row>
          <Col lgOffset={4} mdOffset={4} lg={4} md={4}>
              <form onSubmit={ handleSubmit(this.submit) }>
              <FormGroup
                controlId="fullName"
              >
                <Field
                      label="Full name"
                      id="fullName" 
                      name="UserName"
                      component={RenderField}
                      type="text"
                      placeholder="Please type user full name" 
                      validate={[ required ]}
                />
                </FormGroup>
              <FormGroup
                controlId="email"
              >
                <Field
                      label="Email"
                      id="email" 
                      name="Email"
                      component={RenderField}
                      type="text"
                      placeholder="Email" 
                      validate={[ required, email ]}
                />
                </FormGroup>
                <FormGroup
                  controlId="password"
                >
                <Field
                      label="Password" 
                      id="passport" 
                      name="Password" 
                      component={RenderField}
                      type="password" 
                      placeholder="Password" 
                      validate={[required]}
                />
                </FormGroup>
                <Button type="submit">Submit</Button>

              </form>
              {this.errorMessage()}
          </Col>     
        </Row>
    );
  }
}

//const selector = formValueSelector('signup')
SignUp = connect(
  state => {
    //const password = selector(state, 'password')
    return {
      errorMessage: state.auth.error,
      //password
    }
  },
  {signUpAction}
)(SignUp)

export default reduxForm({
  form: 'signup'
})(SignUp);