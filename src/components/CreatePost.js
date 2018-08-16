import PropTypes from 'prop-types'
import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import StackGrid from "react-stack-grid"
import { logout, createPost, fetchSubs, setInput } from '../actions'
import {
  Button,
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
  Search,
  Segment,
  Sidebar,
  TextArea,
  Visibility,
} from 'semantic-ui-react'
class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'createPost',
      content: '',
      title: '',
      image: '',
      subSearch: '',
      sub: '',
      isLoading: false,
      results: [],
      value: '',
      flairOptions: [],
      newFlair: '',
    };
  }

  componentWillMount() {
    this.props.fetchSubs(this.props.auth.logged.subscriptions);
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
  setContent = (e) => {
    this.setState({
      content: e.target.value
    })
  }
  setTitle = (e) => {
    this.setState({
      title: e.target.value
    })
    console.log('title', e.target.value)
  }
  setImage = (e) => {
    this.setState({
      image: e.target.value
    })
    console.log('image', e.target.value)
  }

  setSub = (e, {value}) => {
    e.persist();
    this.setState({
      sub: value.id,
      flairOptions: value.flairs,
    })
    console.log('setSub', value.flairs)
  }
  setSubSearch = (e) => {
    this.setState({
      subSearch: e.target.value
    })
    console.log('subsearch', e.target.value)
  }
  setFlair = (e, {value}) => {
    e.persist();
    this.setState({
      newFlair: value,

    })
  }
  setInput = (value) => {
    this.props.setInput(value);
    console.log('INPUT', value)
  }
  logout = () => {
    this.props.logout();
  }
  createPost = async (e) => {
    e.preventDefault();
    console.log(this.state.newFlair);
    const res = await this.props.createPost(this.state.title, this.state.content, this.state.image, this.state.sub, this.state.newFlair);
    this.props.history.push('/post/' + res);
    this.setState({ newFlair: ''})
  }
  goProfile = () => {
    this.props.history.push('/feed')
  }
  componentDidMount() {
  }
  render() {
    console.log('rendering post', this.state.newFlair);
    const { activeItem } = this.state;
    return (
      <div>
        <Menu pointing inverted>
          <Link to = '/feed'><img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/640px-React-icon.svg.png" alt = "reactlogo" style = {{width: 70, height: 50}}/></Link>
          {/*<Input icon='search' onChange = {(e) => this.setInput(e.target.value)} placeholder='Search...' className = 'searchInputBox' />*/}
          <Search className = 'searchInputBox'
          loading={this.state.isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
          results={this.state.results.map(ele => { return { title: ele.type + ': ' + ele.title, id: ele.id, type: ele.type } }) }
          value={this.state.value}
          {...this.props}
          />
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick} />
            <Menu.Menu position='right'>
            <Dropdown text = "Explore" pointing className='link item'>
              <Dropdown.Menu>
                <Dropdown.Header>Subs</Dropdown.Header>
                <Dropdown.Item
                  active = {activeItem === 'allSubs'}
                  onClick = {() => this.props.history.push('/allSubs')}>
                  All Subs
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Posts</Dropdown.Header>
                <Dropdown.Item
                  active = {activeItem === 'allPosts'}
                  onClick = {() => this.props.history.push('/allPosts')}>
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
              onClick={this.handleItemClick}
            />
            <Menu.Menu position='right'>
              <Dropdown icon = "plus" pointing className='link item'>
                <Dropdown.Menu>
                  <Dropdown.Header>Category</Dropdown.Header>
                  <Dropdown.Item
                    active = {activeItem === 'createSub'}
                    onClick = {() => this.props.history.push('/createSub')}>
                    Create a new category
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Header>Post</Dropdown.Header>
                  <Dropdown.Item
                    active = {activeItem === 'createPost'}
                    onClick = {() => this.props.history.push('/createPost')}>
                    Create a new post
                  </Dropdown.Item>
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
          <Grid className = "createPostGrid">
            <Grid.Column width={4}>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
            </Grid.Column>
            <Grid.Column width={12}>
              <Header
                as='h2'
                content='Create a new post'
              />
              <Form>
                <Dropdown style = {{marginBottom: 20}} placeholder='Select Subreddit' onChange={this.setSub} fluid search selection options={this.props.subs.map(ele => { return {key: ele._id, value: { id: ele._id, flairs: ele.flairs }, text: ele.title} })}/>
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
                  <Form.Field
                    id='form-input-control-last-name'
                    control={Input}
                    value={this.state.content}
                    label='Content'
                    placeholder='Content'
                    onChange={(e) => this.setContent(e)}
                  />
                </Form.Group>


              <Dropdown placeholder='Select Flair' onChange={this.setFlair} fluid search selection options={ [{key: -1, value: '', text: "No flair"}].concat(this.state.flairOptions.map((ele, i) => { return {key: i, value: ele, text: ele }}))}/>
              <Form.Field
                style = {{marginTop: 20}}
                id='form-button-control-public'
                control={Button}
                content='Confirm'
                onClick = {(e) => this.createPost(e)}
              />
            </Form>
          </Grid.Column>
        </Grid>
        </Container>
        {/* <button onClick={this.logout}>Logout</button>
        <button onClick={this.goProfile}>Back to profile...</button>
        <form onSubmit={(e) => this.createPost(e)}>
        <label>
        New Post:
        <input type="text" name="title" value={this.state.title} onChange={this.setTitle} />
        <input type="text" name="image" value={this.state.image} onChange={this.setImage} />
        <input type="text" name="subSearch" value={this.state.subSearch} onChange={this.setSubSearch} />
        <input type="text" name="sub" value={this.state.sub} onChange={this.setSub} />
        { this.state.subSearch !== '' ?
        <div>
        <ul>
        {this.props.subs.filter(ele => ele.title.indexOf(this.state.subSearch) !== - 1).map(ele => <li>{ele.title}</li>)}
      </ul>
      <Dropdown placeholder='Select Subreddit' fluid search selection options={this.props.subs.filter(ele => ele.title.indexOf(this.state.subSearch) !== -1)} />
    </div>
    :
    null
  }
  <textarea value={this.state.value} onChange={this.setContent} />
</label>
<input type="submit" value="Submit" />
</form> */}
</div>
)
}
}
CreatePost.propTypes = {
  logout: PropTypes.func,
  createPost: PropTypes.func,
  subs: PropTypes.array,
};
const mapStateToProps = ({ auth, subs, input }) => {
  return {
    auth,
    subs,
    input,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    createPost: (title, content, image, sub, flair) => dispatch(createPost(title, content, image, sub, flair)),
    fetchSubs: (userSub) => dispatch(fetchSubs(userSub)),
    setInput: (value) => dispatch(setInput(value))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePost)
