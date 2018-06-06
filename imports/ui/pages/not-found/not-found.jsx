import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Query } from 'react-apollo';
import gql from 'graphql-tag'; 

class NotFoundComponent extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  render() {
    return (<h2 className="not-found">Find me in app/imports/ui/pages/not-found/not-found</h2>);
  }
}
const NotFound = withTracker(() => { return {}; })(NotFoundComponent);

export { NotFound, NotFoundComponent };
