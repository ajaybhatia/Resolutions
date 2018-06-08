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

class LoginComponent extends Component {
  render() {
    return (
      <Container className="mt-5">
        <Form onSubmit={e => {
          e.preventDefault();

          const { client, router } = this.props;
          const form = e.target;
          const username = form.username.value;
          const password = form.password.value;

          Meteor.loginWithPassword(
            username,
            password,
            error => {
              if (error) console.log(error.reason);
              else {
                client.resetStore();
                router.replace('/');
              }
            }
          );
        }}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input type="text" name="username" id="username" placeholder="Username" />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" placeholder="Password" />
          </FormGroup>
          <Button color="primary">Login</Button>
          <Button type="button" color="information" className="float-right" onClick={() => {
            this.props.router.replace('/register');
          }}>Not Registered?</Button>
        </Form>
      </Container>
    );
  }
}
const Login = withApollo(LoginComponent);

export { Login, LoginComponent };
