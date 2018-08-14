import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import StackGrid from "react-stack-grid";
import { logout, fetchSubs, upvotePost, downvotePost, subscribe } from '../actions'
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
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
* such things.
*/
class Sub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'subs',
    };
  }

  handleItemClick = (e, { name }) => {
    if (name === 'home') {
      this.setState({ activeItem: name })
      this.props.history.push('/feed');
    }
    else if (name === 'explore'){
      this.setState({ activeItem: name })
      this.props.history.push('/explore');
    }
    else if (name === 'subs'){
      this.setState({ activeItem: name })
      this.props.history.push('/subs');
    }
    else if (name === 'profile'){
      this.setState({ activeItem: name })
      this.props.history.push('/profile');
    }
    else if (name === 'createSub'){
      this.setState({ activeItem: name })
      this.props.history.push('/createSub');
    }
    else if (name === 'createPost'){
      this.setState({ activeItem: name })
      this.props.history.push('/createPost');
    }
  }

  logout = () => {
    this.props.logout();
  }

  createPost = () => {
    this.props.history.push('/createPost');
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

  subscribe = (subId, i) => {
  this.props.subscribe(subId, i);
}

  render() {
    console.log('rendering feed', this.props.posts);
    console.log('rendering feed auth', this.props.auth.logged._id);
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
              name='subs'
              active={activeItem === 'subs'}
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
                  <img src = {ele.image} alt = "pic4" className = "img"/>
                  <div class = "overlay"></div>
                  <div className = "imgTitleBox"><h1 className = "imgTitle">{ele.title}</h1></div>
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
                {/* </div> */}
                {/* {ele.subscribed ?
                  <button onClick={() => this.subscribe(ele._id, i)}>Unsubscribe</button> :
                  <button onClick={() => this.subscribe(ele._id, i)}>Subscribe</button> } */}
              </div>}
              )}
            </StackGrid>
          </div>
        )
      }
    }


    Sub.propTypes = {
      logout: PropTypes.func,
      fetchPosts: PropTypes.func,
      upvotePost: PropTypes.func,
      downvotePost: PropTypes.func,
      auth: PropTypes.obj,
      sub: PropTypes.obj,
    };

    const mapStateToProps = ({auth, subs}) => {
      return {
        auth,
        subs
      }
    }

    const mapDispatchToProps = (dispatch) => {
      return {
        logout: () => dispatch(logout()),
        fetchSubs: (userSub) => dispatch(fetchSubs(userSub)),
        upvotePost: (postId, index) => dispatch(upvotePost(postId, index)),
        downvotePost: (postId, index) => dispatch(downvotePost(postId, index)),
        subscribe: (subId, i) => dispatch(subscribe(subId, i))
      };
    }

    export default connect(
      mapStateToProps,
      mapDispatchToProps
    )(Sub)

    // {this.props.posts ?
    // this.props.posts.map((ele, i) => <div key={"key" + (i + 1)}>{"key" + (i + 1)}</div> )
    // :
    // null
    // }
