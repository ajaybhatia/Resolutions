import React, { Component } from 'react';
import { Query, Mutation, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import {
  Badge,
  Container,
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Nav,
  Navbar,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const RESOLUTIONS = gql`
  query Resolutions {
    resolutions {
      _id
      name
      complete
      createdAt
    }
  }
`;

const CREATE_RESOLUTION = gql`
  mutation createResolution($name: String!, $complete: Boolean) {
    createResolution(
      name: $name
      complete: $complete
    ) {
      _id
    }
  }
`;

const REMOVE_RESOLUTION = gql`
  mutation removeResolution($id: ID!) {
    removeResolution(
      id: $id
    ) {
      _id
    }
  }
`;

const TOGGLE_COMPLETE = gql`
  mutation toggleComplete($id: ID!) {
    toggleComplete(
      id: $id
    ) {
      _id
    }
  }
`;

class HomeComponent extends Component {
  render() {
    return (
      <>
        <Navbar color="light" light expand="md">
          <Container>
            <NavbarBrand href="/">Resolutions</NavbarBrand>
            {Meteor.userId() && (
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    <FontAwesomeIcon icon="user" />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={() => {
                      const { client, router } = this.props;
                      Meteor.logout(error => {
                        if (error) console.log(error.reason);
                        else {
                          // Instead of calling just client.resetStore() -
                          setTimeout(() => { client.resetStore(); }, 0);
                          router.replace('/login');
                        }
                      });
                    }}>
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            )}
          </Container>
        </Navbar>
        <Container>
          <Mutation mutation={CREATE_RESOLUTION}>
            {(createResolution, { data }) => (
              <Form className="mt-5" onSubmit={(e) => {
                e.preventDefault();
                createResolution({ variables: {
                  name: e.target.name.value,
                  complete: e.target.complete.checked
                }});

                e.target.name.value = "";
                e.target.complete.checked = false;
              }}>
                <FormGroup>
                  <Label for="name">Resolution Name</Label>
                  <Input type="text" id="name" name="name" placeholder="Name of Resolution" required />
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" name="complete" />{' '}
                    Is Completed?
                  </Label>
                </FormGroup>
                <Button color="success" className="float-right">Save</Button>
              </Form>
            )}
          </Mutation>
          <ListGroup className="mt-5">
            <Query query={RESOLUTIONS} pollInterval={500}>
              {({ loading, error, data, startPolling, stopPolling }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return `Error! ${error.message}`;

                return data.resolutions.map(resolution => (
                  <Mutation mutation={TOGGLE_COMPLETE} key={resolution._id}>
                    {(toggleComplete, { data }) => (
                      <ListGroupItem>
                        <span style={{ textDecoration: resolution.complete ? "line-through": "none" }}>{resolution.name}</span>
                        <Badge
                          color={resolution.complete ? "danger" : "primary"}
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            toggleComplete({ variables: { id: resolution._id } });
                          }}
                        >
                          {resolution.complete ? "Completed" : "Not completed"}
                        </Badge>
                        <Mutation mutation={REMOVE_RESOLUTION}>
                          {(removeResolution, { data }) => (
                            <span className="float-right">
                              <FontAwesomeIcon icon="times" onClick={() => {
                                removeResolution({ variables: { id: resolution._id } });
                              }} />
                            </span>
                          )}
                        </Mutation>
                      </ListGroupItem>
                    )}
                  </Mutation>
                ));
              }}
            </Query>
          </ListGroup>
        </Container>
      </>
    );
  }
}

// const Home = withTracker(() => { return {}; })(HomeComponent);
const Home = withApollo(HomeComponent);

export { Home, HomeComponent };
