import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import StackGrid from "react-stack-grid";
import { logout, fetchPosts, upvotePost, downvotePost, setInput, fetchSubs, subscribe } from '../actions'
import {
  Button,
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
  Popup,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
* such things.
*/
class Explore extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeItem: 'allSubs'
    }
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    if (name === 'home') {
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
      this.props.history.push('/following');
    }
    else if (name === 'profile'){
      this.props.history.push('/profile');
    }
    else if (name === 'createSub'){
      this.props.history.push('/createSub');
    }
    else if (name === 'createPost'){
      this.props.history.push('/createPost');
    }
  }

  logout = () => {
    this.props.logout();
  }

  createPost = () => {
    this.props.history.push('/createPost');
  }

  setInput = (value) => {
    this.props.setInput(value);
  }

  componentDidMount() {
    this.props.fetchSubs(this.props.auth.logged.subscriptions);
  }

  upvotePost = (postId, index) => {
    this.props.upvotePost(postId, index);
  }

  downvotePost = (postId, index) => {
    this.props.downvotePost(postId, index);
  }

  openPost = (postId) => {
    this.props.history.push('/post/' + postId);
  }

  render() {
    console.log('rendering feed', this.props);
    const { activeItem } = this.state;
    // console.log('rendering feed auth', this.props.auth.logged._id);
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
            <Menu.Menu position='right'>
              <Dropdown  text = "Explore" pointing className='link item'>
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
                  <Dropdown.Item onClick = {() => this.props.history.push('./createSub')}>Create a new category</Dropdown.Item>
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

          <StackGrid
            columnWidth={300}
            >
              {this.props.subs.map((ele, i) => {
                return <div className = "imgBox" key={i} onClick = {() => this.props.history.push('/sub/' + ele._id)}>
                <img src = {ele.image} alt = {"pic" + i} className = "img"/>
                <div class = "overlay"></div>
                <div className = "imgTitleBoxForSub"><h1 className = "imgTitle">{ele.title}</h1></div>
                { this.props.sub ?
                  this.props.sub.subscribed ?
                    <Popup trigger={
                      <Button
                        className = "followBtn"
                        icon = 'minus'
                        color="teal"
                        onClick = {this.subscribe}
                      />}
                      content = "Press here to unfollow this sub!"
                      inverted /> :
                    <Popup trigger={
                      <Button
                        className = "followBtn"
                        icon = 'plus'
                        color="teal"
                        onClick = {this.subscribe}
                      />}
                      content = "Press here to follow this sub!"
                      inverted />

                : null }

                  {/* <div className = 'dislikeBtn'>
                  <Button
                  icon = 'thumbs down outline'
                  color = "teal"
                  label={{ as: 'a', basic: true, content: '2,048' }}
                  labelPosition='right'
                />
              </div> */}
              {/* </div> */}
              {/* {ele.subscribed ?
                <button onClick={() => this.subscribe(ele._id, i)}>Unsubscribe</button> :
                <button onClick={() => this.subscribe(ele._id, i)}>Subscribe</button> } */}
              </div>}
            )}
          </StackGrid>

          {/* <div>
            <button onClick={this.logout}>Logout</button>
            <button onClick={this.createSub}>Create a new category</button>
            <button onClick={this.createPost}>Create a new post</button>
            <StackGrid
            columnWidth={150}
            >
            {this.props.posts.map((ele, i) => {
            return <div key={i}>
            {ele.score}
            <button onClick={() => this.upvotePost(ele._id, i)}>Big ups</button>
            <button onClick={() => this.downvotePost(ele._id, i)}>Big downs</button>
            <button onClick={() => this.openPost(ele._id)}>Open Post</button>
          </div>}
        )}
      </StackGrid> */}
    </div>
  )
}
}


// Feed.propTypes = {
//   logout: PropTypes.func,
//   fetchPosts: PropTypes.func,
//   upvotePost: PropTypes.func,
//   downvotePost: PropTypes.func,
//   auth: PropTypes.obj,
//   posts: PropTypes.array,
// };

const mapStateToProps = ({auth, subs, sub}) => {
  return {
    auth,
    subs,
    sub
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    fetchPosts: (userId) => dispatch(fetchPosts(userId)),
    upvotePost: (postId, index) => dispatch(upvotePost(postId, index)),
    downvotePost: (postId, index) => dispatch(downvotePost(postId, index)),
    setInput: (value) => dispatch(setInput(value)),
    fetchSubs: (userSub) => dispatch(fetchSubs(userSub)),
    subscribe: (subId, i) => dispatch(subscribe(subId, i))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Explore)

// {this.props.posts ?
// this.props.posts.map((ele, i) => <div key={"key" + (i + 1)}>{"key" + (i + 1)}</div> )
// :
// null
// }
