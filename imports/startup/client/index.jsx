/** @namespace Client */
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import fontawesome from "@fortawesome/fontawesome";
import { faTimes, faUser } from "@fortawesome/fontawesome-free-solid";

fontawesome.library.add(faTimes, faUser);

// Apollo Client configuration using vanilla meteor settings.
import ApolloClient from 'apollo-client';
import { createMeteorNetworkInterface, meteorClientConfig } from 'meteor/apollo';
import { ApolloProvider } from 'react-apollo';
const networkInterface = createMeteorNetworkInterface({
  opts: { credentials: 'same-origin' },
  uri: Meteor.absoluteUrl('graphql'),
  useMeteorAccounts: true,
  batchingInterface: true,
  batchInterval: 10,
});
const client = new ApolloClient(meteorClientConfig({ networkInterface }));

import Routes from './routes.jsx';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

// optional cofiguration
const options = {
  position: 'top right',
  timeout: 3000,
  type: 'error',
  offset: '30px',
  transition: 'scale',
  zIndex: 100
}

const App = () => (
  <ApolloProvider client={client}>
    <AlertProvider template={AlertTemplate} {...options}>
      <Routes />
    </AlertProvider>
  </ApolloProvider>
);


ReactDOM.render(<App />, document.getElementById('app'));
