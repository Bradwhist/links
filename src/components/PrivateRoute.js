import React, { Component } from 'react'
import { Button, Header, Image, Icon, Modal, Input } from 'semantic-ui-react'
import { Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = (routeProps) => {
  console.log('private route before return', routeProps)
  const NewComponent = routeProps.component;
  return (

    <Route

    render={props => {
      console.log('in private route', !!routeProps.auth);
      console.log('routeprops', routeProps)

      return (!!routeProps.auth ? (
        <NewComponent {...props} />
      ) : (
        <Redirect
        to={{
          pathname: "/",
          state: { from: props.location }
        }}
        />
      )
    )
  }
}
/>
)};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, null)(PrivateRoute)
