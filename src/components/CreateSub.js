import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
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
  Search,
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
      description: '',
      isLoading: false,
      results: [],
      value: '',
    };
  }

  //////////////////////
  // search functions
 resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => {
    console.log(result);
    if (result.type === 'Post') {
    this.props.history.push('/post/' + result.id);
  } else {
    this.props.history.push('/sub/' + result.id);
  }
    this.setState({ value: result.title })
  }

  handleSearchChange = (e, { value }) => {
  this.setState({ isLoading: true, value })

  setTimeout(() => {
    if (this.state.value.length < 1) return this.resetComponent()

    const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
    const isMatch = result => re.test(result.title)

    this.setState({
      isLoading: false,
      results: _.filter(this.props.input.searchArr, isMatch),
    })
  }, 300)
}
///////////////////////

  handleItemClick = (e, { name }) => {
    if (name === 'home') {
      this.setState({ activeItem: name })
      this.props.history.push('/feed');
    }
    else if (name === 'allSubs'){
      this.setState({ activeItem: name })
      this.props.history.push('/allSubs');
    }
    else if (name === 'allPosts'){
      this.setState({ activeItem: name })
      this.props.history.push('/allPosts');
    }
    else if (name === 'following'){
      this.setState({ activeItem: name })
      this.props.history.push('/following');
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
  createSub = async (e) => {
    e.preventDefault();
    const res = await this.props.createSub(this.state.title,  this.state.description, this.state.image);
    this.props.history.push('/sub/' + res);
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
<Link to = '/feed'><img src = "https://www.logolynx.com/images/logolynx/03/039ededed692e0176c366382c101e9ef.jpeg" alt = "reactlogo" style = {{marginLeft: 10, marginTop: 5, width: 70, height: 50}}/></Link>           {/*<Input icon='search' onChange = {(e) => this.setInput(e.target.value)} placeholder='Search...' className = 'searchInputBox' />*/}
           <Search className = 'searchInputBox'
           loading={this.state.isLoading}
           onResultSelect={this.handleResultSelect}
           onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
             results={this.state.results.map(ele => { return { title: ele.type, description: ele.title, image: ele.image, type: ele.type } }) }
           value={this.state.value}
           {...this.props}
           />
           <Menu.Item
             name='home'
             active={activeItem === 'home'}
             color='teal'
             onClick={this.handleItemClick} />
             <Menu.Menu position='right'>
             <Dropdown text = "Explore" pointing className='link item'>
               <Dropdown.Menu>
                 <Dropdown.Header>Subs</Dropdown.Header>
                 <Dropdown.Item
                   active = {activeItem === 'allSubs'}
                   onClick = {() => this.props.history.push('./allSubs')}>
                   All Subs
                 </Dropdown.Item>
                 <Dropdown.Divider />
                 <Dropdown.Header>Posts</Dropdown.Header>
                 <Dropdown.Item
                   active = {activeItem === 'allPosts'}
                   onClick = {() => this.props.history.push('./allPosts')}>
                   All Posts
                 </Dropdown.Item>
               </Dropdown.Menu>
             </Dropdown>
             </Menu.Menu>
           <Menu.Item
             name='following'
             active={activeItem === 'following'}
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

         <Container>
           <Grid>
             <Grid.Column width={4}>
               <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFBKQxn9q5OMW8FunZ026F_Cz1ONwtWwKhO4xOSDHCNtyolrxC_w' />
             </Grid.Column>
             <Grid.Column width={12}>
               <Header
                 as='h2'
                 content='Create a new category'
               />
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
                   placeholder='Image URL'
                   onChange={(e) => this.setImage(e)}
                 />
               </Form.Group>
               <Form.Field
                 id='form-textarea-control-opinion'
                 control={TextArea}
                 value={this.state.description}
                 label='Description'
                 placeholder='Description'
                 onChange={(e) => this.setDescription(e)}
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
        </Container>
        </div>
      )
    }
  }


CreateSub.propTypes = {
  logout: PropTypes.func,
  createSub: PropTypes.func,
};

const mapStateToProps = ({auth, input}) => {
  return {
    auth,
    input,
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
