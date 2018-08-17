import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import StackGrid from "react-stack-grid";
import _ from 'lodash'
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
  Popup,
  Responsive,
  Search,
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
      activeItem: 'following',
      loaded: false,
      isLoading: false,
      results: [],
      value: '',
      reload: false,
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
    this.setState({ reload: false });
    let _this = this;
    var timer = setInterval(function(){

      if (_this.state.reload) {
        clearInterval(timer);
      }
      _this.setState({ reload: true });
    }, 750);
    this.props.fetchSubs();
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
    console.log(subId, i);
  this.props.subscribe(subId, i);
  }

  render() {

    const { activeItem } = this.state;
    console.log(this.props.subs);
    let counter = 0;
    return (
      <div>
        <Menu pointing inverted>
          <Link to = '/feed'><img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/640px-React-icon.svg.png" alt = "reactlogo" style = {{width: 70, height: 50}}/></Link>
          <Search className = 'searchInputBox'
          fluid = {true}
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

          {this.props.subs.map(ele => {
            if (!ele.subscribed) {
              counter++;
            }
          })}

          {counter === this.props.subs.length ? <Header as='h2'>
            No Follows
            <Header.Subheader>Please follow a few subs to display all your followings here!</Header.Subheader>
          </Header> : null}

          <StackGrid
            columnWidth={300}
            >
              {this.props.subs.map((ele, i) => {
                if (ele.subscribed) {
                  return <div className = "imgBox" key={i} >
                  <Image fluid src = {ele.image} alt = {"pic" + i} className = "img"/>
                  <div className = "overlay" onClick = {() => this.props.history.push('/sub/' + ele._id)} ></div>
                  <div className = "imgTitleBoxForSub"><h1 className = "imgTitle">{ele.title}</h1></div>
                  <Popup trigger={
                    <Button
                    onClick={() => {
                      this.subscribe(ele._id, i)
                      console.log('subscribe')
                    }}
                    className = "followBtn"
                    icon = 'minus'
                    color="teal"
                  />}
                    content = "Press here to unfollow this sub!"
                    inverted />

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
            }
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

    const mapStateToProps = ({ auth, subs, input }) => {
      return {
        auth,
        subs,
        input
      }
    }

    const mapDispatchToProps = (dispatch) => {
      return {
        logout: () => dispatch(logout()),
        fetchSubs: () => dispatch(fetchSubs()),
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
