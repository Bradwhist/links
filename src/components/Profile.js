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
    116 Friends
  </a>
)
 class Profile extends Component {
   constructor(props){
     super(props);
     this.state = {
       activeItem: 'profile',
       secondActiveItem: 'bio'
     }
   }

   handleItemClick = (e, { name }) => {
     if (name === 'home') {
       this.setState({ activeItem: name })
       this.props.history.push('/feed');
     }
     else if (name === 'profile'){
       this.setState({ activeItem: name })
       this.props.history.push('/profile');
     }
     else if (name === 'bio'){
       this.setState({ secondActiveItem: name })
       this.props.history.push('/profile');
     }
     else if (name === 'posts'){
       this.setState({ secondActiveItem: name })
       this.props.history.push('/profile/' + name);
     }
     else if (name === 'activity'){
       this.setState({ secondActiveItem: name })
       this.props.history.push('/profile/' + name);
     }
     else if (name === 'links'){
       this.setState({ secondActiveItem: name })
       this.props.history.push('/profile/' + name);
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
    const { secondActiveItem } = this.state;
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
             <Dropdown icon = "ellipsis horizontal" pointing className='link item'>
               <Dropdown.Menu>
                 <Dropdown.Header>Categories</Dropdown.Header>
                 <Dropdown.Item>Clothing</Dropdown.Item>
                 <Dropdown.Item>Home Goods</Dropdown.Item>
                 <Dropdown.Item>Bedroom</Dropdown.Item>
                 <Dropdown.Divider />
                 <Dropdown.Header>Order</Dropdown.Header>
                 <Dropdown.Item>Status</Dropdown.Item>
                 <Dropdown.Item>Cancellations</Dropdown.Item>
               </Dropdown.Menu>
             </Dropdown>
           </Menu.Menu>
         </Menu>

           <Grid>
             <Grid.Column width={3}>
               <Menu fluid vertical tabular>
                 <Menu.Item name='bio'
                   active={secondActiveItem === 'bio'}
                   onClick={this.handleItemClick} />
                 <Menu.Item name='posts'
                   active={secondActiveItem === 'posts'}
                   onClick={this.handleItemClick} />
                 <Menu.Item
                   name='activity'
                   active={secondActiveItem === 'activity'}
                   onClick={this.handleItemClick}
                 />
                 <Menu.Item
                   name='links'
                   active={secondActiveItem === 'links'}
                   onClick={this.handleItemClick}
                 />
               </Menu>
             </Grid.Column>

             <Grid.Column stretched width={10}>
               {/* Put a ternary in here to render content depending on what the state is */}
               <Segment>
               {this.state.secondActiveItem === 'bio' ? <p> This is the bio </p> : null}
               {this.state.secondActiveItem === 'posts' ? <p> This is the posts </p> : null}
               {this.state.secondActiveItem === 'activity' ? <p> This is the activity </p> : null}
               {this.state.secondActiveItem === 'links' ? <p> This is the links </p> : null}
              </Segment>
             </Grid.Column>
             <Grid.Column width={3}>
               <Card
                 image='https://www.w3schools.com/howto/img_avatar.png'
                 header='Daniel Ko'
                 meta='Friend'
                 description='Daniel is a software engineer living in NYC who enjoys to smoke weed.'
                 extra={extra}
               />
             </Grid.Column>
           </Grid>
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
