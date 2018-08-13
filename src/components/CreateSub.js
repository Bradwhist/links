import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import StackGrid from "react-stack-grid";
import { logout, createSub, setInput } from '../actions'
import {
  Button,
  Container,
  Divider,
  Dropdown,
  Form,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  TextArea,
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
      activeItem: 'createSub',
      title: '',
      image: '',
      description: ''
    };
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
    else if (name === 'createSub'){
      this.setState({ activeItem: name })
      this.props.history.push('/createSub');
    }
    else if (name === 'explore'){
      this.setState({ activeItem: name })
      this.props.history.push('/explore');
    }
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

  setInput = (value) => {
    this.props.setInput(value);
  }

  componentDidMount() {

  }

  render() {
    const { activeItem } = this.state;
     return (
       <div>
         <Menu pointing inverted>
           <Link to = '/feed'><img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/640px-React-icon.svg.png" alt = "reactlogo" style = {{width: 70, height: 50}}/></Link>
           <Input icon='search' onChange = {(e) => this.setInput(e.target.value)} placeholder='Search...' className = 'searchInputBox' />
           <Menu.Item
             name='home'
             active={activeItem === 'home'}
             color='teal'
             onClick={this.handleItemClick} />
           <Menu.Item
             name='explore'
             active={activeItem === 'explore'}
             color='teal'
             onClick={this.handleItemClick}
           />
           <Menu.Item
             name='profile'
             active={activeItem === 'profile'}
             color='teal'
             onClick={this.handleItemClick}
           />
           <Menu.Menu position='right'>
           <Dropdown icon = "plus" pointing className='link item'>
             <Dropdown.Menu>
               <Dropdown.Header>Category</Dropdown.Header>
               <Dropdown.Item active = {activeItem === 'createSub'} onClick = {() => this.props.history.push('./createSub')}>Create a new category</Dropdown.Item>
               <Dropdown.Divider />
               <Dropdown.Header>Post</Dropdown.Header>
               <Dropdown.Item active = {activeItem === 'createPost'} onClick = {() => this.props.history.push('./createPost')}>Create a new post</Dropdown.Item>
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
           <Grid.Column width={4}>
             <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
           </Grid.Column>
           <Grid.Column width={12}>
             <Form>
               <Form.Group widths='equal'>
                 <Form.Field
                   id='form-input-control-first-name'
                   control={Input}
                   value={this.state.title}
                   label='Title'
                   placeholder='Title'
                   onChange={(e) => this.setTitle(e)}
                 />
                 <Form.Field
                   id='form-input-control-last-name'
                   control={Input}
                   value={this.state.image}
                   label='Image'
                   placeholder='Image'
                   onChange={(e) => this.setImage(e)}
                 />
               </Form.Group>
               <Form.Field
                 id='form-textarea-control-opinion'
                 control={TextArea}
                 value={this.state.description}
                 label='Description'
                 placeholder='Description'
               />
               <Form.Field
                 id='form-button-control-public'
                 control={Button}
                 content='Confirm'
                 onClick = {(e) => this.createSub(e)}
               />
             </Form>
           </Grid.Column>
         </Grid>
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
    setInput: (value) => dispatch(setInput(value))
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateSub)
