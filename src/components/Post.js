// Post renders the information relevant to a post, including the comment tree of replies

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import StackGrid from "react-stack-grid"
import { logout, createComment, createRootComment, fetchPost, upvoteComment, downvoteComment } from '../actions'
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
       replying: null,
    };
   }
   componentWillMount() {
      // fetchPost loads in the page object to this.props
      // this.props.post.post: post title, content, and image
      // this.props.post.comments: flat array of all comments in tree regardless of depth
       this.props.fetchPost(this.props.auth.logged._id, this.props.match.params.id);

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
  createComment = (e, id) => {
    e.preventDefault();
      this.setState({
        content: '',
        replying: null,
      })
      //console.log(this.state.content);
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
  upvoteComment(commentId, index) {
    this.props.upvoteComment(commentId, index);
  }
  // downvoteComment handles click for negative vote on comment of any level
  downvoteComment(commentId, index) {
    this.props.downvoteComment(commentId, index);
  }

  // reply comment toggles which comment is being actively replied to
   replyComment(postId) {
     if (postId === this.state.replying) {
       this.setState({ replying: null });
     } else {
       this.setState({ replying: postId });
     }
   }

   // renderReplies is recursive function providing JSX for rendering comment tree
   renderReplies(comments) {
     let _this = this;
     let sortedComments = [];  // will become array of next level of comments
     for (var i = 0; i < comments.length; i ++) {

        //  block finds the content object given the id of the object
       let checkIndex = (comment) => {
         return comment._id === comments[i]
       }
       let currentIndex = this.props.post.comments.findIndex(checkIndex);
       let currentComment = this.props.post.comments[currentIndex];

       sortedComments.push(currentComment);                           // adds new comment to array
     }
     sortedComments.sort((a, b) => a.score < b.score);                 //sorts array of comments by score

     // block creates JSX that will be included in the return
     const replyComments = sortedComments.map((ele, i) => {
       let replies;                                                // JSX content
       if (ele.comments.length > 0) {                              // iterates over comments
         replies = _this.renderReplies(ele.comments)               // recursive function call
       }
       return (
         <li>
         { ele.content }
         <button onClick={() => this.upvoteComment(ele._id, i)}>Upvote Comment</button>
         <button onClick={() => this.downvoteComment(ele._id, i)}>Downvote Comment</button>
         <button onClick={() => this.replyComment(ele._id)}>Open Post</button>
         { this.state.replying === ele._id ?
           <form onSubmit={(e) => this.createComment(e, ele._id)}>
             <label>
               New Comment:
               <textarea value={this.state.value} onChange={this.setContent} />
             </label>
             <input type="submit" value="Submit" />
           </form>
         :
         null
       }
         { replies }
         </li>
       )
     })
     return <ul>{ replyComments }</ul>
   }

   render() {
      console.log('rendering post', this.props.post.comments);
             // Unordered list contains comment tree.  Maps over comments, and displays all root level comments.
             // in each root comment, calls function 'renderReplies', which is recursive and displays non-root comments
     return (
       <div>
        <button onClick={this.logout}>Logout</button>
        <button onClick={this.goProfile}>Back to profile...</button>
        <ul>
          {this.props.post.comments.map((ele, i) => {
            if (!ele.parent) {
              return <li>
            { ele.content }
            <button onClick={() => this.upvoteComment(ele._id, i)}>Upvote Comment</button>
            <button onClick={() => this.downvoteComment(ele._id, i)}>Downvote Comment</button>
            <button onClick={() => this.replyComment(ele._id)}>Open Post</button>
            { this.state.replying === ele._id ?
              <form onSubmit={(e) => this.createComment(e, ele._id)}>
                <label>
                  New Comment:
                  <textarea value={this.state.value} onChange={this.setContent} />
                </label>
                <input type="submit" value="Submit" />
              </form>
            :
            null
          }
              { this.renderReplies(ele.comments) }
            </li>
          }
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
    upvoteComment: (commentId, index) => dispatch(upvoteComment(commentId, index)),
    downvoteComment: (commentId, index) => dispatch(downvoteComment(commentId, index))
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post)
