/** @namespace Client */
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import fontawesome from "@fortawesome/fontawesome";
import { faTimes } from "@fortawesome/fontawesome-free-solid";

fontawesome.library.add(faTimes);

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

const App = () => (
  <ApolloProvider client={client}>
  <Routes />
  </ApolloProvider>
);


ReactDOM.render(<App />, document.getElementById('app'));
