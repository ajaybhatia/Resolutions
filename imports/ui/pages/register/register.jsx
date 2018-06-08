import React, { Component } from 'react';
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

class RegisterComponent extends Component {
  render() {
    return (
      <Container className="mt-5">
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
            if (error) console.log(error.reason);
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
          <Button type="button" color="information" className="float-right" onClick={() => {
            this.props.router.replace('/login');
          }}>Already Registered?</Button>
        </Form>
      </Container>
    );
  }
}
const Register = withApollo(RegisterComponent);

export { Register, RegisterComponent };
