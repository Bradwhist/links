import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import StackGrid from "react-stack-grid";
import { logout } from '../actions'
import CreateCategory from './CreateCategory'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Input,
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
 class Feed extends Component {
   constructor(props){
     super(props);
     this.state = {
       activeItem: 'home'
     }
   }

   handleItemClick = (e, { name }) => this.setState({ activeItem: name })

   // logout = () => {
   //   this.props.logout();
   // }
   // createCategory = () => {
   //   this.props.history.push('/createCategory');
   // }
   // createPost = () => {
   //   this.props.history.push('/post');
   // }
   // componentWillMount() {
   //
   // }
   componentDidMount() {

   }

   render() {
     console.log('rendering feed', this.props);
     const { activeItem } = this.state;
     return (
       <div>
        <Menu pointing>
          <img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/640px-React-icon.svg.png" alt = "reactlogo" style = {{width: 70, height: 50}}/>
          <Menu.Menu position='left'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
          </Menu.Menu>
          <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item
            name='profile'
            active={activeItem === 'profile'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.handleItemClick}
          />
        </Menu>

        <StackGrid
        columnWidth={150}
        >
        <div key="key1">Item 1</div>
        <div key="key2">Item 2</div>
        <div key="key3">Item 3</div>
        <div key="key4">Item 4</div>
        <div key="key5">Item 5</div>
        <div key="key6">Item 6</div>
        <div key="key7">Item 7</div>
        <div key="key8">Item 8</div>
        <div key="key9">Item 9</div>
        <div key="key10">Item 10</div>
        <div key="key11">Item 11</div>
        <div key="key12">Item 12</div>
        <div key="key13">Item 13</div>
        </StackGrid>

       {/* <div>
       <button onClick={this.logout}>Logout</button>
       <button onClick={this.createCategory}>Create a new category</button>
       <button onClick={this.createPost}>Create a new post</button>
       <StackGrid
       columnWidth={150}
       >
       <div key="key1">Item 1</div>
       <div key="key2">Item 2</div>
       <div key="key3">Item 3</div>
       <div key="key4">Item 4</div>
       <div key="key5">Item 5</div>
       <div key="key6">Item 6</div>
       <div key="key7">Item 7</div>
       <div key="key8">Item 8</div>
       <div key="key9">Item 9</div>
       <div key="key10">Item 10</div>
       <div key="key11">Item 11</div>
       <div key="key12">Item 12</div>
       <div key="key13">Item 13</div>
       </StackGrid>
       </div> */}
      </div>
     )
   }
 }


Feed.propTypes = {
  logout: PropTypes.func,
};

const mapStateToProps = ({auth}) => {
  return {
    auth,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Feed)
