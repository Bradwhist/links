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
<Link to = '/feed'><img src = "https://www.logolynx.com/images/logolynx/03/039ededed692e0176c366382c101e9ef.jpeg" alt = "reactlogo" style = {{marginLeft: 10, marginTop: 5, width: 70, height: 50}}/></Link>          {/*<Input icon='search' onChange = {(e) => this.setInput(e.target.value)} placeholder='Search...' className = 'searchInputBox' />*/}
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
              <Image src='data:image/png;base64,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' />
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
