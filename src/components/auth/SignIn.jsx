import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signInAction } from '../../actions';
import { Row, Col, FormGroup, Button } from 'react-bootstrap'
import RenderField from '../hoc/RenderField'
import {required, email} from '../../common/validation'

class SignIn extends Component {
  submit = (values) => {
    this.props.signInAction(values, this.props.history);
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
    const { handleSubmit } = this.props;
    return (
        <Row>
          <Col lgOffset={4} mdOffset={4} lg={4} md={4}>
              <form onSubmit={ handleSubmit(this.submit) }>
              <FormGroup
                controlId="email"
              >
                <Field
                      label="Login"
                      id="email" 
                      name="email"
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
                      name="password" 
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

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

const reduxFormSignin = reduxForm({
  form: 'signin'
})(SignIn);

export default connect(mapStateToProps, {signInAction})(reduxFormSignin);