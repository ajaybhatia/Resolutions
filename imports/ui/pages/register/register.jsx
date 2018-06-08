import React, { Component } from 'react';
import { Link } from 'react-router';
import { Query, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container
} from 'reactstrap';
import { withAlert } from 'react-alert';

class RegisterComponent extends Component {
  render() {
    return (
      <Container>
        <div className="d-flex justify-content-center" style={{ height: "100vh" }}>
          <div className="col-md-4 align-self-center">
            <legend>User Register</legend>
            <Form onSubmit={e => {
              e.preventDefault();
              const form = e.target;

              const { client, router } = this.props;
              const username = form.username.value;
              const password = form.password.value;

              Accounts.createUser({
                username,
                password
              }, error => {
                if (error) this.props.alert.show(error.reason);
                else {
                  client.resetStore();
                  router.replace('/');
                }
              });
            }}>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input type="text" name="username" id="username" placeholder="Username" />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" placeholder="Password" />
              </FormGroup>
              <Button color="primary">Register</Button>
              <Link className="float-right pt-2" to="/login">Already Registered?</Link>
            </Form>
          </div>
        </div>
      </Container>
    );
  }
}
const Register = withApollo(withAlert(RegisterComponent));

export { Register, RegisterComponent };
