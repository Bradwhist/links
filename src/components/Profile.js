import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { logout } from '../actions'
import {
  Button,
  Card,
  Container,
  Divider,
  Dropdown,
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

const extra = (
  <a>
    <Icon name='user' />
    16 Friends
  </a>
)
 class Profile extends Component {
   constructor(props){
     super(props);
     this.state = {
       activeItem: 'profile'
     }
   }

   handleItemClick = (e, { name }) => {
     this.setState({ activeItem: name })
     if (name === 'home') {
       this.props.history.push('/feed');
     }
     else {
       this.props.history.push('/' + name);
     }
     //this.props.logout();
     //this.props.logout();
   }

   logout = () => {
   this.props.logout();
 }

   componentDidMount() {

   }

   render() {
    const { activeItem } = this.state;
     const options = [
      { key: 1, text: 'Create Profile', value: 1 },
      { key: 2, text: 'Following', value: 2 },
      { key: 3, text: 'Logout', value: 3 },
     ]
     return (
       <div>
         <Menu pointing>
           <Link to = '/feed'><img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/640px-React-icon.svg.png" alt = "reactlogo" style = {{width: 70, height: 50}}/></Link>
           <Input icon='search' placeholder='Search...' className = 'searchInputBox' />
           <Menu.Item
             name='home'
             active={activeItem === 'home'}
             onClick={this.handleItemClick} />
           <Menu.Item
             name='profile'
             active={activeItem === 'profile'}
             onClick={this.handleItemClick}
           />
           <Menu.Menu position='right'>
             <Dropdown item simple icon = "ellipsis horizontal" direction='right' options={options} />
           </Menu.Menu>
           {/* <Menu.Item
             name='logout'
             active={activeItem === 'logout'}
             onClick={this.handleItemClick}
           /> */}
         </Menu>
         <Card
           image='https://www.w3schools.com/howto/img_avatar.png'
           header='Daniel Ko'
           meta='Friend'
           description='Daniel is a software engineer living in NYC who enjoys fucking bitches and getting money.'
           extra={extra}
         />
       </div>
     )
   }
 }


Profile.propTypes = {
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
}

export default connect(
    null,
    mapDispatchToProps
)(Profile)
