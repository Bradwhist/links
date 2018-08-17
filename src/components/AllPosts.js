import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import StackGrid from "react-stack-grid";
import naturalCompare from 'string-natural-compare';
// import CreateCategory from './CreateCategory'
import { logout, fetchPosts, upvotePost, downvotePost, setInput } from '../actions'
import CreateSub from './CreateSub'
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
 class AllPosts extends Component {
   constructor(props){
     super(props);
     this.state = {
       activeItem: 'allPosts',
       sortParam: '',
       sortOrder: true,
       isLoading: false,
       results: [],
       value: '',
       posts: [],
     }
   }

   async componentDidMount() {
     let res = await this.props.fetchPosts(this.props.auth.logged._id);
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
     //this.props.logout();
   }

   logout = () => {
     this.props.logout();
   }

   createSub = () => {
     this.props.history.push('/createSub');
   }

   createPost = () => {
     this.props.history.push('/createPost');
   }

   setInput = (value) => {
     this.props.setInput(value);
   }



  upvotePost(postId, index) {
    this.props.upvotePost(postId, index);
  }

  downvotePost(postId, index) {
    this.props.downvotePost(postId, index);
  }

  openPost(postId) {
    this.props.history.push('/post/' + postId);
  }

  setSort(sortParam) {
    let newSortOrder = null;
    if (this.state.sortParam === sortParam) {
      newSortOrder = !this.state.sortOrder;
    } else {
      newSortOrder = true;
    }
    this.setState({ sortParam: sortParam, sortOrder: newSortOrder })
  }

  goToPost(postId) {
    this.props.history.push('/post/' + postId);
  }

   render() {
      let sortDisplay = '';
     if (this.state.sortOrder && this.state.sortParam) {
       sortDisplay = this.state.sortParam + ' (ascending)';
     } else if (this.state.sortParam) {
       sortDisplay = this.state.sortParam + ' (descending)';
     }
     console.log(this.state.sortParam, this.state.sortOrder)
     let sortedPosts = this.props.posts.slice();
     if (this.state.sortParam === 'time') {
      sortedPosts.sort((a, b) => {
        return a.createdAt > b.createdAt;
      })
    }
    if (this.state.sortParam === 'score') {
     sortedPosts.sort((a, b) => {
       return a.score < b.score;
     })
   }
   if (this.state.sortParam === 'replies') {
    sortedPosts.sort((a, b) => {
      return b.comments.length - a.comments.length;
    })
  }
  if (this.state.sortParam === 'name') {
    sortedPosts.sort((a, b) => {
      if (a.title > b.title) {
        return 1;
      } else {
        return -1;
      }
    });
  }
       if (!this.state.sortOrder) {
         sortedPosts.reverse();
       }

     const options = [
       { onClick: () => this.setSort('time'), key: 1, text: 'Time', value: 1 },
       { onClick: () => this.setSort('score'), key: 2, text: 'Hot', value: 2 },
       { onClick: () => this.setSort('replies'), key: 3, text: 'Replies', value: 3 },
       { onClick: () => this.setSort('name'), key: 4, text: 'Name', value: 4 },
     ]
     const { activeItem } = this.state;
     //console.log('rendering feed auth', this.props.auth.logged._id);
     for (let i = 0; i < sortedPosts.length; i ++) {
       console.log(sortedPosts[i].title);
     }
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
              <Dropdown.Item onClick = {() => this.props.history.push('./createSub')}>Create a new category</Dropdown.Item>
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
                <Dropdown.Item>X</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Account</Dropdown.Header>
                <Dropdown.Item>Status</Dropdown.Item>
                <Dropdown.Item>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>

        <Header
          as='h2'
          content='POSTS'
        />
        <Divider />
        <Menu style = {{position: 'absolute', right: 5, top: 70}} compact>
          <Dropdown placeholder="search by" text={sortDisplay} options={options} simple item />
        </Menu>

        <StackGrid
        columnWidth={300}
        >
        {sortedPosts
        .map((ele, i) => {
          return  <div className = "imgBox" key={"key" + i}>
            <Image fluid src = {ele.image} alt = {"pic" + i} className = "img" />
            <div onClick = { () => this.goToPost(ele._id) } className = "overlay"></div>
            <div className = "imgTitleBox"><h1 className = "imgTitle">{ele.title}</h1></div>
              <div className = 'likeBtn'>
                <Button
                  icon = 'thumbs up outline'
                  color = "teal"
                  label={{ as: 'a', basic: true, content: ele.upCount }}
                  labelPosition='right'
                  onClick={ () => this.upvotePost(ele._id, ele.index) }
                  // onClick event handler here
                />
              </div>
              <div className = 'dislikeBtn'>
                <Button
                  icon = 'thumbs down outline'
                  color = "teal"
                  label={{ as: 'a', basic: true, content: ele.downCount }}
                  labelPosition='right'
                  onClick={ () => this.downvotePost(ele._id, ele.index) }
                />
              </div>
          </div>
        })}
        </StackGrid>
        {/* {this.props.posts.map((ele, i) => {
          return <div className = "imgBox"><img src = {ele.image} alt={"pic" + (i + 1)} className= "img" /></div>
        })} */}

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

const mapStateToProps = ({auth, posts}) => {
  return {
    auth,
    posts
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    fetchPosts: (userId) => dispatch(fetchPosts(userId)),
    upvotePost: (postId, index) => dispatch(upvotePost(postId, index)),
    downvotePost: (postId, index) => dispatch(downvotePost(postId, index)),
    setInput: (value) => dispatch(setInput(value))
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllPosts)
