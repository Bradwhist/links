import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import StackGrid from "react-stack-grid";
import { logout, fetchSub, fetchPosts, upvotePostFromSub, downvotePostFromSub } from '../actions'
import {
  Button,
  Container,
  Divider,
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
 class Sub extends Component {

   logout = () => {
     this.props.logout();
   }

   createPost = () => {
     this.props.history.push('/createPost');
   }
   componentWillMount() {

   }
   componentDidMount() {
     this.props.fetchSub(this.props.match.params.id);
   }
  upvotePostFromSub(postId, index) {
    this.props.upvotePostFromSub(postId, index);
  }
  downvotePostFromSub(postId, index) {
    this.props.downvotePostFromSub(postId, index);
  }
  openPost(postId) {
    this.props.history.push('/post/' + postId);
  }
   render() {
     console.log('rendering feed', this.props.posts);
     console.log('rendering feed auth', this.props.auth.logged._id);
   //   let StackGridContent = '';
   //   if (this.props.posts) {
   //   this.props.posts.map((ele, i) => {StackGridContent = StackGridContent + '<div key="key' + (i + 1) + '">Meow</div>'})
   // }
   //   console.log(StackGridContent);


     return (
       <div>
       <button onClick={this.logout}>Logout</button>
       <button onClick={this.createSub}>Create a new category</button>
       <button onClick={this.createPost}>Create a new post</button>
       <StackGrid
       columnWidth={150}
       >
         {this.props.sub.posts.map((ele, i) => {
           return <div key={i}>
           {ele.score}
           <button onClick={() => this.upvotePostFromSub(ele._id, i)}>Big ups</button>
           <button onClick={() => this.downvotePostFromSub(ele._id, i)}>Big downs</button>
           <button onClick={() => this.openPost(ele._id)}>Open Post</button>
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
  upvotePostFromSub: PropTypes.func,
  downvotePostFromSub: PropTypes.func,
  auth: PropTypes.obj,
  sub: PropTypes.obj,
};

const mapStateToProps = ({auth, sub}) => {
  return {
    auth,
    sub
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    fetchSub: (subId) => dispatch(fetchSub(subId)),
    upvotePostFromSub: (postId, index) => dispatch(upvotePostFromSub(postId, index)),
    downvotePostFromSub: (postId, index) => dispatch(downvotePostFromSub(postId, index))
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
