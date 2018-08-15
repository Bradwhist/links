import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import StackGrid from "react-stack-grid";
import { logout, fetchSub, fetchPosts, upvotePostFromSub, downvotePostFromSub,
  subscribeFromSub } from '../actions'
import {
  Button,
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Icon,
  Input,
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
  constructor(props) {
    super(props)
    this.state = {
      activeItem: 'subs'
    }
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    if (name === 'home') {
      this.props.history.push('/feed');
    }
    else if (name === 'explore'){
      this.setState({ activeItem: name })
      this.props.history.push('/explore');
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
    //this.props.logout();
  }

  logout = () => {
    this.props.logout();
  }

  createPost = () => {
    this.props.history.push('/createPost');
  }

 componentDidMount() {
   let subscribed = this.props.match.params.id === this.props.auth.logged.subscriptions;
   this.props.fetchSub(this.props.match.params.id, subscribed);
 }

  upvotePostFromSub = (postId, index) => {
    this.props.upvotePostFromSub(postId, index);
  }

  downvotePostFromSub = (postId, index) => {
    this.props.downvotePostFromSub(postId, index);
  }

  // toggle subscribe
  subscribeFromSub = () => {
    this.props.subscribeFromSub(this.props.sub.sub._id);
  }

  openPost = (postId) => {
    this.props.history.push('/post/' + postId);
  }

  deletePost = (postId, i) => {
    this.props.deletePost(postId, i);
  }

  render() {
    console.log('rendering feed', this.props.posts);
    console.log('rendering feed auth', this.props.auth.logged._id);
    //   let StackGridContent = '';
    //   if (this.props.posts) {
    //   this.props.posts.map((ele, i) => {StackGridContent = StackGridContent + '<div key="key' + (i + 1) + '">Meow</div>'})
    // }
    //   console.log(StackGridContent);
    console.log('subs', this.props.sub.posts)
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
             onClick={this.handleItemClick}
           />
           <Menu.Menu position='right'>
           <Dropdown icon = "plus" pointing className='link item'>
             <Dropdown.Menu>
               <Dropdown.Header>Category</Dropdown.Header>
               <Dropdown.Item onClick = {() => this.props.history.push('/createSub')}>Create a new category</Dropdown.Item>
               <Dropdown.Divider />
               <Dropdown.Header>Post</Dropdown.Header>
               <Dropdown.Item active = {activeItem === 'createPost'} onClick = {() => this.props.history.push('/createPost')}>Create a new post</Dropdown.Item>
             </Dropdown.Menu>
           </Dropdown>
           </Menu.Menu>
           <Menu.Menu position='right'>
             <Dropdown icon = "ellipsis horizontal" pointing className='link item'>
               <Dropdown.Menu>
                 <Dropdown.Header>Categories</Dropdown.Header>
                 <Dropdown.Item>Clothing</Dropdown.Item>
                 <Dropdown.Item>Home Goods</Dropdown.Item>
                 <Dropdown.Item>Bedroom</Dropdown.Item>
                 <Dropdown.Divider />
                 <Dropdown.Header>Account</Dropdown.Header>
                 <Dropdown.Item>Status</Dropdown.Item>
                 <Dropdown.Item>Logout</Dropdown.Item>
               </Dropdown.Menu>
             </Dropdown>
           </Menu.Menu>
         </Menu>
         { !!this.props.sub ?
       <StackGrid
         columnWidth={300}
         >
           {this.props.sub.posts.map((ele, i) => {
             return <div className = "imgBox" key={i}>
               <img className = "img" src = {ele.image} alt = {"pic" + i}/>
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
               {/* <h1>{ele.score}</h1> */}
               {/* <Button className = "subBtn" icon color = "teal" onClick={() => this.upvotePostFromSub(ele._id, i)}>
                 <Icon name='thumbs up outline' />
               </Button>
               <Button className = "subBtn" icon basic color = "teal" onClick={() => this.downvotePostFromSub(ele._id, i)}>
                 <Icon name='thumbs down outline' />
               </Button>
               <Button className = "subBtn" animated='vertical' color = "teal" onClick={() => this.openPost(ele._id, i)}>
                 <Button.Content hidden><Icon name='flag' /></Button.Content>
                 <Button.Content visible>
                   Open Post
                 </Button.Content>
               </Button> */}
             </div>}
           )}
         </StackGrid>
       : <div>Facepalm, this WAS the category you were looking for</div> }
         <div>
         {/* <button onClick={this.logout}>Logout</button>
         <button onClick={this.createSub}>Create a new category</button>
         <button onClick={this.createPost}>Create a new post</button> */}
        </div>
        { this.props.sub ?
          <div>{this.props.sub.subscribed ?
            <button onClick = {this.subscribeFromSub}>Unsubscribe</button> :
            <button onClick = {this.subscribeFromSub}>Subscribe</button>
         }</div>
        : null }
       </div>
     )
   }
 }


Sub.propTypes = {
  logout: PropTypes.func,
  fetchPosts: PropTypes.func,
  upvotePostFromSub: PropTypes.func,
  downvotePostFromSub: PropTypes.func,
  subscribeFromSub: PropTypes.func,
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
    fetchSub: (subId, match) => dispatch(fetchSub(subId, match)),
    upvotePostFromSub: (postId, index) => dispatch(upvotePostFromSub(postId, index)),
    downvotePostFromSub: (postId, index) => dispatch(downvotePostFromSub(postId, index)),
    subscribeFromSub: (subId) => dispatch(subscribeFromSub(subId)),
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
