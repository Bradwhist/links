import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import StackGrid from "react-stack-grid";
import _ from 'lodash'
import moment from 'moment'
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
  Label,
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
       sortParam: 'Score',
       sortOrder: true,
       isLoading: false,
       results: [],
       value: '',
       posts: [],
       reload: false,
     }
   }

   componentDidMount() {
     // this.setState({ reload: false });
     let _this = this;
     // setting a timer here so that the page loads after .75 seconds to load all the images cleaner
     var timer = setInterval(function(){

       if (_this.state.reload) {
         clearInterval(timer);
       }
       _this.setState({ reload: true });
     }, 750);
     this.props.fetchPosts(this.props.auth.logged._id);
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
    this.setState({reload: false});
    this.props.upvotePost(postId, index);
    let _this = this;
    var timer = setInterval(function(){

      if (_this.state.reload) {
        clearInterval(timer);
      }
      _this.setState({ reload: true });
    }, 200);
  }

  downvotePost(postId, index) {
    this.setState({reload: false});
    this.props.downvotePost(postId, index);
    let _this = this;
    var timer = setInterval(function(){

      if (_this.state.reload) {
        clearInterval(timer);
      }
      _this.setState({ reload: true });
    }, 200);
  }

  openPost(postId) {
    this.props.history.push('/post/' + postId);
  }

  setSort(sortParam) {
    this.setState({reload: false})
    let newSortOrder = null;
    if (this.state.sortParam === sortParam) {
      newSortOrder = !this.state.sortOrder;
    } else {
      newSortOrder = true;
    }
    this.setState({ sortParam: sortParam, sortOrder: newSortOrder })
    let _this = this;
    var timer = setInterval(function(){

      if (_this.state.reload) {
        clearInterval(timer);
      }
      _this.setState({ reload: true });
    }, 200);
  }

  goToPost(postId) {
    this.props.history.push('/post/' + postId);
  }

  goToSub(subId) {
    this.props.history.push('/sub/' + subId);
  }

   render() {
      let sortDisplay = '';
     if (this.state.sortOrder && this.state.sortParam) {
       sortDisplay = this.state.sortParam + ' (Ascending)';
     } else if (this.state.sortParam) {
       sortDisplay = this.state.sortParam + ' (Descending)';
     }
     console.log(this.state.sortParam, this.state.sortOrder)
     let sortedPosts = this.props.posts.slice();
     if (this.state.sortParam === 'Time') {
      sortedPosts.sort((a, b) => {
        return moment(a.createdAt) - moment(b.createdAt);
      })
    }
    if (this.state.sortParam === 'Score') {
     sortedPosts.sort((a, b) => {
       return b.score - a.score;
     })
   }
   if (this.state.sortParam === 'Replies') {
    sortedPosts.sort((a, b) => {
      return b.comments.length - a.comments.length;
    })
  }
  if (this.state.sortParam === 'Name') {
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
       { onClick: () => this.setSort('Time'), key: 1, text: 'Time', value: 1 },
       { onClick: () => this.setSort('Score'), key: 2, text: 'Hot', value: 2 },
       { onClick: () => this.setSort('Replies'), key: 3, text: 'Replies', value: 3 },
       { onClick: () => this.setSort('Name'), key: 4, text: 'Name', value: 4 },
     ]
     const { activeItem } = this.state;
     //console.log('rendering feed auth', this.props.auth.logged._id);
     for (let i = 0; i < sortedPosts.length; i ++) {
       console.log(sortedPosts[i].createdAt);
     }
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
          style = {{color: '#18dbce'}}
          as='h2'
          content='ALL POSTS'
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
            <Label className = 'ribbonLabel' style = {{position: 'absolute', left: -14, top: 20, zIndex: 1}} as='a' color='teal' ribbon onClick = {() => this.goToSub(ele.sub.id)}>
              {ele.sub.title}
            </Label>
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
