import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import StackGrid from "react-stack-grid";
import { logout, fetchPosts, upvotePost, downvotePost, setInput, fetchSubs } from '../actions'
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
class AllPosts extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeItem: 'allPosts'
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
              <div className = "imgBox" key="key1">
                <img src = "https://images.unsplash.com/photo-1533756102515-155e3863ee1c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7714524f4448bdda1d20f3cb883d2e45&auto=format&fit=crop&w=634&q=80" alt = "pic1" className = "img" />
                <div class = "overlay"></div>
                <div className = "imgTitleBox"><h1 className = "imgTitle">Insert title here</h1></div>
                  <div className = 'likeBtn'>
                    <Button
                      icon = 'thumbs up outline'
                      color = "teal"
                      label={{ as: 'a', basic: true, content: '2,048' }}
                      labelPosition='right'
                      // onClick event handler here
                    />
                  </div>
                  <div className = 'dislikeBtn'>
                    <Button
                      icon = 'thumbs down outline'
                      color = "teal"
                      label={{ as: 'a', basic: true, content: '2,048' }}
                      labelPosition='right'
                    />
                  </div>
              </div>
              <div className = "imgBox" key="key2"><img src = "https://images.unsplash.com/photo-1533821312764-eb0483f98f69?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d383aa86b1a43b453dd58374919155b9&auto=format&fit=crop&w=1050&q=80" alt = "pic2" className = "img"/>
                <div class = "overlay"></div>
                <div className = "imgTitleBox"><h1 className = "imgTitle">Insert title here</h1></div>
                <div className = 'likeBtn'>
                  <Button
                    icon = 'thumbs up outline'
                    color = "teal"
                    label={{ as: 'a', basic: true, content: '2,048' }}
                    labelPosition='right'
                  />
                </div>
                <div className = 'dislikeBtn'>
                  <Button
                    icon = 'thumbs down outline'
                    color = "teal"
                    label={{ as: 'a', basic: true, content: '2,048' }}
                    labelPosition='right'
                  />
                </div>
              </div>
              <div className = "imgBox" key="key3"><img src = "https://images.unsplash.com/photo-1533826418470-0cef7eb8bdaa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=714f5ed2388ebfa626d8263ef243c644&auto=format&fit=crop&w=634&q=80" alt = "pic3" className = "img"/>
                <div class = "overlay"></div>
                <div className = "imgTitleBox"><h1 className = "imgTitle">Insert title here</h1></div>
                <div className = 'likeBtn'>
                  <Button
                    icon = 'thumbs up outline'
                    color = "teal"
                    label={{ as: 'a', basic: true, content: '2,048' }}
                    labelPosition='right'
                  />
                </div>
                <div className = 'dislikeBtn'>
                  <Button
                    icon = 'thumbs down outline'
                    color = "teal"
                    label={{ as: 'a', basic: true, content: '2,048' }}
                    labelPosition='right'
                  />
                </div>
              </div>
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

const mapStateToProps = ({auth, subs}) => {
  return {
    auth,
    subs
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllPosts)

// {this.props.posts ?
// this.props.posts.map((ele, i) => <div key={"key" + (i + 1)}>{"key" + (i + 1)}</div> )
// :
// null
// }
