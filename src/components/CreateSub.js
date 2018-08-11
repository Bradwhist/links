import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import StackGrid from "react-stack-grid";
import { logout, createSub } from '../actions'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
 class CreateSub extends Component {
   constructor(props) {
     super(props);
     this.state = {
       description: '',
       title: '',
       image: '',
     };
   }

   logout = () => {
   this.props.logout();
 }
  goProfile = () => {
    this.props.history.push('/feed')
  }
  setDescription = (e) => {
    this.setState({
      description: e.target.value
    })
  }
  setTitle = (e) => {
    this.setState({
      title: e.target.value
    })
  }
  setImage = (e) => {
    this.setState({
      image: e.target.value
    })
  }
  createSub = (e) => {
    e.preventDefault();
    this.props.createSub(this.state.title,  this.state.description, this.state.image);
  }

   componentDidMount() {

   }

   render() {
     console.log('rendering profile', this.state.description, this.state.title, this.state.image);

     return (
       <div>
        <button onClick={this.logout}>Logout</button>
        <button onClick={this.goProfile}>Back to profile...</button>
        <form onSubmit={(e) => this.createSub(e)}>
          <label>
            New Post:
            <input type="text" name="title" value={this.state.title} onChange={this.setTitle} />
            <input type="text" name="image" value={this.state.image} onChange={this.setImage} />
            <textarea value={this.state.value} onChange={this.setDescription} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        </div>
      )
    }
  }


CreateSub.propTypes = {
  logout: PropTypes.func,
  createSub: PropTypes.func,
};

const mapStateToProps = ({auth}) => {
  return {
    auth,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    createSub: (title, description, image) => dispatch(createSub(title, description, image)),
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateSub)
