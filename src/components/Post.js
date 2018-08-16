// Post renders the information relevant to a post, including the comment tree of replies

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import StackGrid from "react-stack-grid"
import { logout, createComment, createRootComment, fetchPost, upvoteComment, downvoteComment, deletePost, deleteComment, deleteRootComment } from '../actions'
import {
  Button,
  Comment,
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
  Visibility,
} from 'semantic-ui-react'

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
* such things.
*/
class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: '',
      content: '',
      replying: null,
      navigation: null,
      showReplies: [],
      value: 'Type something here...',
      replyComments: []
    };
  }

  componentWillMount() {
    // fetchPost loads in the page object to this.props
    // this.props.post.post: post title, content, and image
    // this.props.post.comments: flat array of all comments in tree regardless of depth
    this.props.fetchPost(this.props.auth.logged._id, this.props.match.params.id);
  }

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

  // content updates state value containing current comment draft
  setContent = (e) => {
    this.setState({
      content: e.target.value
    })
  }

  logout = () => {
    this.props.logout();
  }

  // createComment is function to handle submission of form for a non-root level comment
  createComment = (e, id, num) => {
    e.preventDefault();
    console.log('REPLYCOMMENTS', this.state.replyComments, num)
    let newArr = this.state.replyComments.slice();
    newArr.push(num)
    console.log('NEWARR', newArr)
    this.setState({
      content: '',
      replying: null,
      replyComments: newArr
    })
    console.log('REPLYCOMMENTS', this.state.replyComments)
    return this.props.createComment(this.state.content, id);
  }

  // createRootComment handles submission of form for root level comment
  createRootComment = (e) => {
    e.preventDefault();
    //console.log(this.state.content);
    this.props.createRootComment(this.state.content, this.props.match.params.id);
  }
  goProfile = () => {
    this.props.history.push('/feed')
  }
  // upvoteComment handles click for positive vote on comment of any level
  upvoteComment = (commentId, index) => {
    this.props.upvoteComment(commentId, index);
  }
  // downvoteComment handles click for negative vote on comment of any level
  downvoteComment(commentId, index) {
    this.props.downvoteComment(commentId, index);
  }

  // reply comment toggles which comment is being actively replied to
  replyComment = (commentId) => {
    if (commentId === this.state.replying) {
      this.setState({ replying: null });
    } else {
      this.setState({ replying: commentId });
    }
  }

  renderRepliesFromId = (commentId) => {
    let checkIndex = (comment) => {
      return comment._id === commentId;
    }
    let renderIndex = this.props.post.comments.findIndex(checkIndex);
    let renderComment = this.props.post.comments[renderIndex];
    return this.renderReplies(renderComment.comments);
  }
  //
  setNavigation = (commentId) => {
    this.setState({ navigation: commentId })
  }
  //
  deletePost = async (postId) => {
    try {
    const res = await this.props.deletePost(postId);
  }
  catch(err){console.log(err)}
  this.props.history.push('/sub/' + this.props.post.post.sub.id)
  }
  deleteRootComment = (commentId, i) => {
    this.props.deleteRootComment(commentId, i);
  }
  deleteComment = (commentId, i) => {
    this.props.deleteComment(commentId, i);
  }
  // renderReplies is recursive function providing JSX for rendering comment tree
  renderReplies = (comments) => {
    let _this = this;
    let sortedComments = [];  // will become array of next level of comments
    for (let i = 0; i < comments.length; i ++) {

      //  block finds the content object given the id of the object
      let checkIndex = (comment) => {
        return comment._id === comments[i]
      }
      let currentIndex = this.props.post.comments.findIndex(checkIndex);
      let currentComment = this.props.post.comments[currentIndex];
      currentComment.index = currentIndex;
      sortedComments.push(currentComment);                           // adds new comment to array
    }
    sortedComments.sort((a, b) => a.score < b.score);                 //sorts array of comments by score

    // block creates JSX that will be included in the return
    const replyComments = sortedComments.map((ele, i) => {
      return (
        <div>
          <Comment.Group>
            <Comment>
              <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
              <Comment.Content>
                <Comment.Author as='a'>{ele.author.name}</Comment.Author>
                <Comment.Metadata>
                  <div>Just now</div>
                </Comment.Metadata>
                <Comment.Text>{ele.content}</Comment.Text>
                  <Comment.Actions>
                    {this.showReplies(ele._id) ? <div>
                      <Comment.Action onClick = {() => this.upvoteComment(ele._id, i)}><Icon name='thumbs up outline' /></Comment.Action>
                      <Comment.Action onClick = {() => this.downvoteComment(ele._id, i)}><Icon name='thumbs down outline' /></Comment.Action>
                      <Comment.Action onClick = {() => this.deleteComment(ele._id, ele.index)}>Delete Comment</Comment.Action>
                      <Comment.Action onClick = {() => this.replyComment(ele._id)}>Reply</Comment.Action>
                      <Comment.Action onClick = {() => this.toggleReplies(ele._id)}>Hide replies</Comment.Action></div> :
                    ele.comments.length === 0 ? <div>
                      <Comment.Action onClick = {() => this.upvoteComment(ele._id, i)}><Icon name='thumbs up outline' /></Comment.Action>
                      <Comment.Action onClick = {() => this.downvoteComment(ele._id, i)}><Icon name='thumbs down outline' /></Comment.Action>
                      <Comment.Action onClick = {() => this.deleteComment(ele._id, ele.index)}>Delete Comment</Comment.Action>
                      <Comment.Action onClick = {() => this.replyComment(ele._id)}>Reply</Comment.Action></div>:
                    ele.comments.length === 1 ? <div>
                      <Comment.Action onClick = {() => this.upvoteComment(ele._id, i)}><Icon name='thumbs up outline' /></Comment.Action>
                      <Comment.Action onClick = {() => this.downvoteComment(ele._id, i)}><Icon name='thumbs down outline' /></Comment.Action>
                      <Comment.Action onClick = {() => this.deleteComment(ele._id, ele.index)}>Delete Comment</Comment.Action>
                      <Comment.Action onClick = {() => this.replyComment(ele._id)}>Reply</Comment.Action>
                      <Comment.Action onClick = {() => this.toggleReplies(ele._id)}>View {ele.comments.length} reply</Comment.Action></div>:
                      <Comment.Action onClick = {() => this.toggleReplies(ele._id)}>View {ele.comments.length} replies</Comment.Action> }
                    {this.state.replying === ele._id ?
                      <Form reply onSubmit={(e) => this.createComment(e, ele._id, i)}>
                        <Form.TextArea placeholder={"Replying to " + ele.author.name} onChange={this.setContent} />
                        <Button content='Reply' labelPosition='left' icon='edit' primary />
                      </Form>
                      :
                      null
                    }
                  </Comment.Actions>
                </Comment.Content>
                {/* This is to render the replies based on a ternary */}
                {this.showReplies(ele._id) ? this.renderReplies(ele.comments) : null}
              </Comment>
            </Comment.Group>
            {/* // { ele.content }
            // <button onClick={() => this.setNavigation(ele._id)}>Test Navigate Here</button>
            // <button onClick={() => this.upvoteComment(ele._id, i)}>Upvote Comment</button>
            // <button onClick={() => this.downvoteComment(ele._id, i)}>Downvote Comment</button>
            // <button onClick={() => this.replyComment(ele._id)}>Open Post</button> */}


          </div>
        )
      })
      return replyComments;
    }


    showReplies = (commentId) => {
      return this.state.showReplies.indexOf(commentId) !== -1 ;
    }

    toggleReplies = (commentId) => {
      console.log('testing toggle')
      let index = this.state.showReplies.indexOf(commentId);
      let newArr = this.state.showReplies.slice();
      if (index === -1) {
        newArr.push(commentId)
      }

      else if (index !== -1) {
        newArr.splice(index, 1);
      }

      this.setState({
        showReplies: newArr
      })
    }

    render() {
      // Unordered list contains comment tree.  Maps over comments, and displays all root level comments.
      // in each root comment, calls function 'renderReplies', which is recursive and displays non-root comments
      const { activeItem } = this.state;
      const options = [
        { key: 1, text: 'Popular', value: 1 },
        { key: 2, text: 'New', value: 2 },
        { key: 3, text: 'sex', value: 3 },
      ]

      console.log("a;skdfja;sdfj", this.state.showReplies)
      console.log('SD;FJKASF', this.props.post.comments)
      return (
        <div>
          <button onClick = {() => this.deletePost(this.props.match.params.id)}>Delete Post</button>
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
            {this.props.post ?
            <Container>
              <Grid centered columns = {2}>
                <Grid.Column>
                  <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                </Grid.Column>

                <Grid.Row centered columns={2}>
                  <Grid.Column>
                    <Header as='h3' dividing>
                      Comments
                      <Menu style = {{fontSize: 12, position: 'absolute', right: 10, bottom: 475}} compact>
                        <Dropdown text='Sort' options={options} simple item />
                      </Menu>
                    </Header>

                    <Form reply onSubmit={(e) => this.createRootComment(e)}>
                      <Form.TextArea placeholder={this.state.value} onChange={this.setContent} />
                      <Button content='Add Comment' labelPosition='left' icon='edit' primary />
                    </Form>
                    {this.props.post.comments.map((ele, i) => {
                      if (!ele.parent) {
                        return  <Comment.Group>
                          <Comment>
                            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                            <Comment.Content>
                              <Comment.Author as='a'>{ele.author.name}</Comment.Author>
                              <Comment.Metadata>
                                <div>Today at 5:42PM</div>
                              </Comment.Metadata>
                              <Comment.Text>{ele.content}</Comment.Text>
                              <Comment.Actions>
                                {this.showReplies(ele._id) ? <div>
                                  <Comment.Action onClick = {() => this.upvoteComment(ele._id, i)}><Icon name='thumbs up outline' /></Comment.Action>
                                  <Comment.Action onClick = {() => this.downvoteComment(ele._id, i)}><Icon name='thumbs down outline' /></Comment.Action>
                                  <Comment.Action onClick = {() => this.deleteRootComment(ele._id, i)}>Delete Comment</Comment.Action>
                                  <Comment.Action onClick = {() => this.replyComment(ele._id)}>Reply</Comment.Action>
                                  <Comment.Action onClick = {() => this.toggleReplies(ele._id)}>Hide replies</Comment.Action></div> :
                                ele.comments.length === 0 ? <div>
                                  <Comment.Action onClick = {() => this.upvoteComment(ele._id, i)}><Icon name='thumbs up outline' /></Comment.Action>
                                  <Comment.Action onClick = {() => this.downvoteComment(ele._id, i)}><Icon name='thumbs down outline' /></Comment.Action>
                                  <Comment.Action onClick = {() => this.deleteRootComment(ele._id, i)}>Delete Comment</Comment.Action>
                                  <Comment.Action onClick = {() => this.replyComment(ele._id)}>Reply</Comment.Action> </div> :
                                ele.comments.length === 1 ?  <div>
                                  <Comment.Action onClick = {() => this.upvoteComment(ele._id, i)}><Icon name='thumbs up outline' /></Comment.Action>
                                  <Comment.Action onClick = {() => this.downvoteComment(ele._id, i)}><Icon name='thumbs down outline' /></Comment.Action>
                                  <Comment.Action onClick = {() => this.deleteRootComment(ele._id, i)}>Delete Comment</Comment.Action>
                                  <Comment.Action onClick = {() => this.replyComment(ele._id)}>Reply</Comment.Action>
                                  <Comment.Action onClick = {() => this.toggleReplies(ele._id)}>View {ele.comments.length} reply</Comment.Action> </div> :
                                <div>
                                  <Comment.Action onClick = {() => this.upvoteComment(ele._id, i)}><Icon name='thumbs up outline' /></Comment.Action>
                                  <Comment.Action onClick = {() => this.downvoteComment(ele._id, i)}><Icon name='thumbs down outline' /></Comment.Action>
                                  <Comment.Action onClick = {() => this.deleteRootComment(ele._id, i)}>Delete Comment</Comment.Action>
                                  <Comment.Action onClick = {() => this.replyComment(ele._id)}>Reply</Comment.Action>
                                  <Comment.Action onClick = {() => this.toggleReplies(ele._id)}>View {ele.comments.length} replies</Comment.Action> </div>}
                                {this.state.replying === ele._id ?
                                  <Form reply onSubmit={(e) => this.createComment(e, ele._id, i)}>
                                    <Form.TextArea placeholder={"Replying to " + ele.author.name} onChange={this.setContent} />
                                    <Button content='Reply' labelPosition='left' icon='edit' primary />
                                  </Form>
                                  :
                                  null
                                }
                              </Comment.Actions>
                            </Comment.Content>
                            {/* This is to render the replies based on a ternary */}
                            {this.showReplies(ele._id) ? this.renderReplies(ele.comments) : null}
                          </Comment>

                        </Comment.Group>
                      }
                    })}
                    {/* <form onSubmit={(e) => this.createRootComment(e)}>
                    <label>
                    New Comment:
                    <textarea value={this.state.value} onChange={this.setContent} />
                  </label>
                  <input type="submit" value="Submit" />
                </form> */}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          : <div> This post does not exist </div> }
            {/*this.props.post.comments.length > 0 ?
              <ul>{this.renderCommentBlock('5b736da262b180559cb157b0')}</ul> :
              null
              */}
            </div>
          )
        }
      }


      Post.propTypes = {
        logout: PropTypes.func,
        createComment: PropTypes.func,
        createRootComment: PropTypes.func,
        subs: PropTypes.array,
        fetchPost: PropTypes.func,
        post: PropTypes.obj,
        upvoteComment: PropTypes.func,
        downvoteComment: PropTypes.func,
        deletePost: PropTypes.func,
        deleteComment: PropTypes.func,
        deleteRootComment: PropTypes.func,
      };

      const mapStateToProps = ({ auth, post, comments }) => {
        return {
          auth,
          post,
          comments,
        }
      }
      const mapDispatchToProps = (dispatch) => {
        return {
          logout: () => dispatch(logout()),
          createRootComment: (content, postId) => dispatch(createRootComment(content, postId)),
          createComment: (content, commentId) => dispatch(createComment(content, commentId)),
          fetchPost: (userId, postId) => dispatch(fetchPost(userId, postId)),
          upvoteComment: (commentId, index) => dispatch(upvoteComment(commentId, index)),
          downvoteComment: (commentId, index) => dispatch(downvoteComment(commentId, index)),
          deletePost: (postId) => dispatch(deletePost(postId)),
          deleteRootComment: (commentId, i) => dispatch(deleteRootComment(commentId, i)),
          deleteComment: (commentId, i) => dispatch(deleteComment(commentId, i)),
        };
      }

      export default connect(
        mapStateToProps,
        mapDispatchToProps
      )(Post)
