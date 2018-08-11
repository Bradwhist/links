import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import StackGrid from "react-stack-grid"
import { logout, createComment, createRootComment, fetchPost, fetchCommentsFP, upvoteComment, downvoteComment } from '../actions'
import {
  Button,
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
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
       content: '',
    };
   }
   componentWillMount() {
      console.log('auth logged id', this.props.auth.logged._id, 'match params id', this.props.match.params.id);
       this.props.fetchPost(this.props.auth.logged._id, this.props.match.params.id);
       this.props.fetchCommentsFP(this.props.match.params.id);
   }
   componentDidMount() {

   }
   setContent = (e) => {
     this.setState({
       content: e.target.value
     })
   }

   logout = () => {
   this.props.logout();
 }
  createRootComment = (e) => {
    e.preventDefault();
    this.props.createRootComment(this.state.content, this.props.match.params.id);
  }
  goProfile = () => {
    this.props.history.push('/feed')
  }
  upvoteComment(commentId, index) {
    this.props.upvoteComment(commentId, index);
  }
  downvoteComment(commentId, index) {
    this.props.downvoteComment(commentId, index);
  }

   componentDidMount() {

   }

   render() {
     ///console.log('rendering post', this.props.subs);
     console.log('this.props.comments', this.props.comments);
     console.log('url params', this.props.match);
     console.log('global?', this.props.post);
     console.log('content', this.state.content);
     return (
       <div>
        <button onClick={this.logout}>Logout</button>
        <button onClick={this.goProfile}>Back to profile...</button>
        <ul>
          {this.props.comments.map((ele, i) => {
            return <li>
            {ele.content}
            <button onClick={() => this.upvoteComment(ele._id, i)}>Upvote Comment</button>
            <button onClick={() => this.downvoteComment(ele._id, i)}>Downvote Comment</button>
            </li>
          })}
        </ul>
        <form onSubmit={(e) => this.createRootComment(e)}>
          <label>
            New Comment:
            <textarea value={this.state.value} onChange={this.setContent} />
          </label>
          <input type="submit" value="Submit" />
        </form>
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
  fetchCommentsFP: PropTypes.func,
  post: PropTypes.obj,
  upvoteComment: PropTypes.func,
  downvoteComment: PropTypes.func,
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
    fetchCommentsFP: (postId) => dispatch(fetchCommentsFP(postId)),
    upvoteComment: (commentId, index) => dispatch(upvoteComment(commentId, index)),
    downvoteComment: (commentId, index) => dispatch(downvoteComment(commentId, index))
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post)
