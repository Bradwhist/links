import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import StackGrid from "react-stack-grid";
import _ from 'lodash'
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
  Search,
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
     console.log(this.props);
     let res = await this.props.fetchPosts(this.props.auth.logged._id);
     this.setState( {posts: this.props.posts} )
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
    let sortedPosts = this.state.posts.slice();
    sortedPosts.sort((a, b) => {
      if (this.state.sortParam === 'time') {
        if (this.state.sortOrder) {
          return a.createdAt > b.createdAt;
        } else {
          return b.createdAt > a.createdAt;
        }
      }
      if (this.state.sortParam === 'score') {
        if (this.state.sortOrder) {
          return b.score - a.score;
        } else {
          return a.score - b.score;
        }
      }
      if (this.state.sortParam === 'replies') {
        if (this.state.sortOrder) {
          return a.comments.length - b.comments.length;
        } else {
          return b.comments.length - a.comments.length;
        }
      }
    });

    this.setState({ posts: sortedPosts, sortParam: sortParam, sortOrder: newSortOrder })
  }

  goToPost(postId) {
    this.props.history.push('/post/' + postId);
  }

   render() {
     console.log('rendering feed', this.props.posts, 'auth', this.props.auth);
     const options = [
       { onClick: () => this.setSort('time'), key: 1, text: 'Time', value: 1 },
       { onClick: () => this.setSort('score'), key: 2, text: 'Hot', value: 2 },
       { onClick: () => this.setSort('replies'), key: 3, text: 'Replies', value: 3 },
     ]
     const { activeItem } = this.state;
     //console.log('rendering feed auth', this.props.auth.logged._id);
     return (
       <div>
       {/* <Menu style = {{fontSize: 12 }} compact>
         <Dropdown text='Sort' options={options} simple item />
       </Menu> */}
        <Menu pointing inverted>
          <Link to = '/feed'><img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/640px-React-icon.svg.png" alt = "reactlogo" style = {{width: 70, height: 50}}/></Link>
          {/*<Input icon='search' onChange = {(e) => this.setInput(e.target.value)} placeholder='Search...' className = 'searchInputBox' />*/}
          <Search className = 'searchInputBox'
          loading={this.state.isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
          results={this.state.results.map(ele => { return { title: ele.type + ': ' + ele.title, id: ele.id, type: ele.type } }) }
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
        <StackGrid
        columnWidth={300}
        >
        {this.state.posts
        .map((ele, i) => {
          return  <div className = "imgBox" key={"key" + i}>
            <img src = {ele.image} alt = {"pic" + i} className = "img" />
            <div class = "overlay"></div>
            <div onClick = { () => this.goToPost(ele._id) } className = "imgTitleBox"><h1 className = "imgTitle">{ele.title}</h1></div>
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

const mapStateToProps = ({auth, posts, input}) => {
  return {
    auth,
    posts,
    input
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
