import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import StackGrid from "react-stack-grid";
import _ from 'lodash'
import { logout, fetchSub, fetchPosts, upvotePostFromSub, downvotePostFromSub, toggleFlair,
  subscribeFromSub } from '../actions'
import {
  Button,
  Container,
  Divider,
  Dropdown,
  Grid,
  Form,
  Header,
  Icon,
  Input,
  Image,
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
class Sub extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: 'subs',
      sortParam: '',
      sortOrder: true,
      isLoading: false,
      results: [],
      value: '',
      newFlair: null,
      flairFilters: [],
      defaultFlair: 'new tag here',
      isFlairLoading: false,
      flairValue: '',
      flairResults: [],
    }
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
//flair search
resetFlairComponent = () => this.setState({ isFlairLoading: false, flairResults: [], flairValue: ''})

handleFlairSelect = (e, { flairResult }) => {
  let newState = this.state.flairFilters.slice();
  newState.push(e.target.innerText.trim());
  this.setState({flairFilters: newState});
}

changeFlairSearch = (e, { flairValue }) => {
  this.setState({ isFlairLoading: true, flairValue: e.target.value })

  setTimeout(() => {
    if (this.state.flairValue.length < 1) return this.resetFlairComponent()

    const re = new RegExp(_.escapeRegExp(this.state.flairValue), 'i')
    const isMatch = flairResult => re.test(flairResult)

    this.setState({
      isFlairLoading: false,
      flairResults: _.filter(this.props.sub.sub.flairs, isMatch),
    })
  }, 300)
}

removeFlairFilter = (i) => {
  let newState = this.state.flairFilters.slice();
  newState.splice(i, 1);
  this.setState({ flairFilters: newState })
}
/////////////////////////

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

  toggleFlair = () => {
    this.props.toggleFlair(this.state.content, this.props.sub.sub._id);
  }

  setFlair = (e) => {
    this.setState({
      newFlair: e.target.value
    })
  }

  toggleFlair = (e) => {
    e.preventDefault();
    //console.log(this.state.content);
    this.props.toggleFlair(this.state.newFlair, this.props.sub.sub._id);
    this.setState({ newFlair: null });
  }

 componentDidMount() {
   let subscribed = this.props.match.params.id === this.props.auth.logged.subscriptions;
   this.props.fetchSub(this.props.match.params.id, subscribed, this.props.auth.logged._id);
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

  setSort(sortParam) {
    let newSortOrder = null;
    if (this.state.sortParam === sortParam) {
      newSortOrder = !this.state.sortOrder;
    } else {
      newSortOrder = true;
    }
    this.setState({ sortParam: sortParam, sortOrder: newSortOrder })
  }

  goToPost = (postId) => {
    this.props.history.push('/post/' + postId);
  }

  render() {
    const options = [
      { onClick: () => this.setSort('time'), key: 1, text: 'Time', value: 1 },
      { onClick: () => this.setSort('score'), key: 2, text: 'Hot', value: 2 },
      { onClick: () => this.setSort('replies'), key: 3, text: 'Replies', value: 3 },
    ]
    console.log(this.state.flairFilters);
    console.log(this.props.sub.posts);
    //   let StackGridContent = '';
    //   if (this.props.posts) {
    //   this.props.posts.map((ele, i) => {StackGridContent = StackGridContent + '<div key="key' + (i + 1) + '">Meow</div>'})
    // }
    //   console.log(StackGridContent);
    const { activeItem } = this.state;
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
                   onClick = {() => this.props.history.push('/allSubs')}>
                   All Subs
                 </Dropdown.Item>
                 <Dropdown.Divider />
                 <Dropdown.Header>Posts</Dropdown.Header>
                 <Dropdown.Item
                   active = {activeItem === 'allPosts'}
                   onClick = {() => this.props.history.push('/allPosts')}>
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

         {/* DAN plz move these or make them look nice */}
         <Form reply onSubmit={(e) => this.toggleFlair(e)}>
           <Form.TextArea value={this.state.newFlair || ''} placeholder={this.state.defaultFlair} onChange={this.setFlair} />
           <Button content='Add Flair' labelPosition='left' icon='edit' primary />
         </Form>
         <Search className = 'searchInputBox'
         loading={this.state.isFlairLoading}
         onResultSelect={this.handleFlairSelect}
         onSearchChange={_.debounce(this.changeFlairSearch, 500, { leading: true })}
         results={this.state.flairResults
           .filter(ele => {
             return this.state.flairFilters.indexOf(ele) === -1;
           })
           .map((ele, i) => { return { title: ele, id: i  } }) }
         value={this.state.flairValue}
         {...this.props}
         />
         { this.state.flairFilters.map((ele, i) => <li onClick={() => this.removeFlairFilter(i)} >{'Remove filter: ', ele}</li>) }
         {/* end flair search components */}

         { !!this.props.sub ?
       <StackGrid
         columnWidth={300}
         >
           {this.props.sub.posts
             .filter(ele => {
               if (!this.state.flairFilters.length) {
                 return true;
               } else {
                 return this.state.flairFilters.indexOf(ele.flair) !== -1;
               }
             })
             .sort((a, b) => {
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
           })
             .map((ele, i) => {
             return <div className = "imgBox" key={i}>
               <img className = "img" src = {ele.image} alt = {"pic" + i}/>
               <div class = "overlay"></div>
               <div onClick = { () => this.goToPost(ele._id) } className = "imgTitleBox"><h1 className = "imgTitle">{ele.title}</h1></div>
               <div className = 'likeBtn'>
                 <Button
                   icon = 'thumbs up outline'
                   color = "teal"
                   label={{ as: 'a', basic: true, content: ele.upCount }}
                   labelPosition='right'
                   onClick={ () => this.upvotePostFromSub(ele._id, ele.index) }
                 />
               </div>
               <div className = 'dislikeBtn'>
                 <Button
                   icon = 'thumbs down outline'
                   color = "teal"
                   label={{ as: 'a', basic: true, content: ele.downCount }}
                   labelPosition='right'
                   onClick={ () => this.downvotePostFromSub(ele._id, ele.index) }
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
         {/* { this.props.sub ?
           <div>{this.props.sub.subscribed ?
             <button onClick = {this.subscribeFromSub}>Unsubscribe</button> :
             <button onClick = {this.subscribeFromSub}>Subscribe</button>
          }</div>
         : null } */}
        </div>
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

const mapStateToProps = ({auth, sub, input}) => {
  return {
    auth,
    sub,
    input,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    fetchSub: (subId, match, userId) => dispatch(fetchSub(subId, match, userId)),
    upvotePostFromSub: (postId, index) => dispatch(upvotePostFromSub(postId, index)),
    downvotePostFromSub: (postId, index) => dispatch(downvotePostFromSub(postId, index)),
    subscribeFromSub: (subId) => dispatch(subscribeFromSub(subId)),
    toggleFlair: (content, subId) => dispatch(toggleFlair(content, subId)),
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
