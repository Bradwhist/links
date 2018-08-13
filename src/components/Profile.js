import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { logout, createSub, createPost, fetchSubs, setInput } from '../actions'
import {
  Button,
  Card,
  Container,
  Divider,
  Dropdown,
  Form,
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
  TextArea,
  Visibility,
} from 'semantic-ui-react'

 class Profile extends Component {
   constructor(props){
     super(props);
     this.state = {
       activeItem: 'profile',
       secondActiveItem: 'bio'
     }
   }

   handleItemClick = async (e, { name }) => {
     if (name === 'home') {
       this.setState({ activeItem: name })
       this.props.history.push('/feed');
     }
     else if (name === 'profile'){
       this.setState({ activeItem: name })
       this.props.history.push('/profile');
     }
     else if (name === 'explore'){
       this.setState({ activeItem: name })
       this.props.history.push('/explore');
     }
     else if (name === 'createSub'){
       this.setState({ activeItem: name })
       this.props.history.push('/createSub');
     }
     else if (name === 'bio'){
       this.setState({ secondActiveItem: name })
       this.props.history.push('/profile');
     }
     else if (name === 'posts'){
       console.log('posts', name)
       this.setState({ secondActiveItem: name })
       // this.props.history.push('/profile/' + name);
     }
     else if (name === 'activity'){
       console.log('activity', name)
       this.setState({ secondActiveItem: name })
       console.log(name, this.state, this.props.history);
       // this.props.history.push('/profile/' + name);
     }
   }

   logout = () => {
   this.props.logout();
   }

   setInput = (value) => {
     this.props.setInput(value);
   }

  //  goProfile = () => {
  //   this.props.history.push('/feed')
  // }
  // setDescription = (e) => {
  //   this.setState({
  //     description: e.target.value
  //   })
  // }
  // setTitle = (e) => {
  //   this.setState({
  //     title: e.target.value
  //   })
  // }
  // setImage = (e) => {
  //   this.setState({
  //     image: e.target.value
  //   })
  // }
  // createSub = (e) => {
  //   e.preventDefault();
  //   this.props.createSub(this.state.title, this.state.description, this.state.image);
  // }

   render() {
    const { activeItem } = this.state;
    const { secondActiveItem } = this.state;
    const extra = (
      <a>
        <Icon name='user' />
        116 Friends
      </a>
    )
     return (
       <div>
         <Menu pointing>
           <Link to = '/feed'><img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/640px-React-icon.svg.png" alt = "reactlogo" style = {{width: 70, height: 50}}/></Link>
           <Input icon='search' onChange = {(e) => this.setInput(e.target.value)} placeholder='Search...' className = 'searchInputBox' />
           <Menu.Item
             name='home'
             active={activeItem === 'home'}
             onClick={this.handleItemClick} />
           <Menu.Item
             name='explore'
             active={activeItem === 'explore'}
             onClick={this.handleItemClick}
           />
           <Menu.Item
             name='profile'
             active={activeItem === 'profile'}
             onClick={this.handleItemClick}
           />
           <Menu.Menu position='right'>
           <Dropdown icon = "plus" pointing className='link item'>
             <Dropdown.Menu>
               <Dropdown.Header>Category</Dropdown.Header>
               <Dropdown.Item onClick = {() => this.props.history.push('./createSub')}>Create a new category</Dropdown.Item>
               <Dropdown.Divider />
               <Dropdown.Header>Post</Dropdown.Header>
               <Dropdown.Item>Create a new post</Dropdown.Item>
             </Dropdown.Menu>
           </Dropdown>
           </Menu.Menu>
           <Menu.Menu position='right'>
             <Dropdown icon = "ellipsis horizontal" pointing className='link item'>
               <Dropdown.Menu>
                 <Dropdown.Header>Categories</Dropdown.Header>
                 <Dropdown.Item>X</Dropdown.Item>
                 <Dropdown.Divider />
                 <Dropdown.Header>Account</Dropdown.Header>
                 <Dropdown.Item>Status</Dropdown.Item>
                 <Dropdown.Item onClick = {this.logout}>Logout</Dropdown.Item>
               </Dropdown.Menu>
             </Dropdown>
           </Menu.Menu>
         </Menu>

           <Grid>
             <Grid.Column width={3}>
               <Menu fluid vertical tabular>
                 <Menu.Item
                   name='bio'
                   active={secondActiveItem === 'bio'}
                   onClick={this.handleItemClick} />
                 <Menu.Item
                   name='posts'
                   active={secondActiveItem === 'posts'}
                   onClick={this.handleItemClick} />
                 <Menu.Item
                   name='activity'
                   active={secondActiveItem === 'activity'}
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
    setInput: (value) => dispatch(setInput(value))
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)
