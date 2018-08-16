import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import _ from 'lodash'
import StackGrid from "react-stack-grid"
import { logout, createSub, createPost, fetchSubs, setInput, fetchProfile } from '../actions'
import {
  Button,
  Card,
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
  Search,
  Segment,
  Sidebar,
  TextArea,
  Visibility,
} from 'semantic-ui-react'

 class Profile extends Component {
   constructor(props){
     super(props);
     this.state = {
       activeItem: 'profile',
       secondActiveItem: 'bio',
       isLoading: false,
       results: [],
       value: '',
     }
   }

   componentDidMount() {
     this.props.fetchProfile();
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
     else if (name === 'profile'){
       this.setState({ activeItem: name })
       this.props.history.push('/profile');
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
     else if (name === 'createSub'){
       this.setState({ activeItem: name })
       this.props.history.push('/createSub');
     }
     else if (name === 'createPost'){
       this.setState({ activeItem: name })
       this.props.history.push('/createPost');
     }
     else if (name === 'bio'){
       this.setState({ secondActiveItem: name })
       this.props.history.push('/profile');
     }
     else if (name === 'subscriptions'){
       console.log('subscriptions', name)
       this.setState({ secondActiveItem: name })
     }
     else if (name === 'my posts'){
       console.log('posts', name)
       this.setState({ secondActiveItem: name })
       // this.props.history.push('/profile/' + name);
     }
     else if (name === 'comment history'){
       console.log('comment history', name)
       this.setState({ secondActiveItem: name })
     }
     else if (name === 'activity'){
       console.log('activity', name)
       this.setState({ secondActiveItem: name })
       console.log(name, this.state, this.props.history);
       // this.props.history.push('/profile/' + name);
     }
   }

   logout = () => {
   this.props.logout();
   }

   setInput = (value) => {
     this.props.setInput(value);
   }
   goToSub = (subId) => {
     this.props.history.push('/sub/' + subId);
   }
   goToPost = (postId) => {
     this.props.history.push('/post/' + postId);
   }
   goToComment = (commentId, postId) => {
     this.props.history.push('/post/' + postId + '/' + commentId);
   }
  //  goProfile = () => {
  //   this.props.history.push('/feed')
  // }
  // setDescription = (e) => {
  //   this.setState({
  //     description: e.target.value
  //   })
  // }
  // setTitle = (e) => {
  //   this.setState({
  //     title: e.target.value
  //   })
  // }
  // setImage = (e) => {
  //   this.setState({
  //     image: e.target.value
  //   })
  // }
  // createSub = (e) => {
  //   e.preventDefault();
  //   this.props.createSub(this.state.title, this.state.description, this.state.image);
  // }

   render() {
     console.log(this.props.profile)
    const { activeItem } = this.state;
    const { secondActiveItem } = this.state;
    const extra = (
      <a>
        <Icon name='user' />
        116 Friends
      </a>
    )
     return (
       <div>
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
             color='teal'
             onClick={this.handleItemClick}
           />
           <Menu.Menu position='right'>
           <Dropdown icon = "plus" pointing className='link item'>
             <Dropdown.Menu>
               <Dropdown.Header>Category</Dropdown.Header>
               <Dropdown.Item
                 active = {activeItem === 'createSub'}
                 onClick = {() => this.props.history.push('./createSub')}>
                 Create a new category
               </Dropdown.Item>
               <Dropdown.Divider />
               <Dropdown.Header>Post</Dropdown.Header>
               <Dropdown.Item
                 active = {activeItem === 'createPost'}
                 onClick = {() => this.props.history.push('./createPost')}>
                 Create a new post
               </Dropdown.Item>
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

           <Grid>
             <Grid.Column width={3}>
               <Menu fluid vertical tabular>
                 <Menu.Item
                   name='bio'
                   active={secondActiveItem === 'bio'}
                   color='teal'
                   onClick={this.handleItemClick} />
                   <Menu.Item
                     name='subscriptions'
                     active={secondActiveItem === 'subscriptions'}
                     color='teal'
                     onClick={this.handleItemClick} />
                 <Menu.Item
                   name='my posts'
                   active={secondActiveItem === 'my posts'}
                   color='teal'
                   onClick={this.handleItemClick} />
                 <Menu.Item
                   name='comment history'
                   active={secondActiveItem === 'comment history'}
                   color='teal'
                   onClick={this.handleItemClick} />
                 <Menu.Item
                   name='activity'
                   active={secondActiveItem === 'activity'}
                   color='teal'
                   onClick={this.handleItemClick}
                 />
               </Menu>
             </Grid.Column>

             <Grid.Column stretched width={10}>
               {/* Put a ternary in here to render content depending on what the state is */}
               <Segment>
                 {this.state.secondActiveItem === 'bio' ? <p> This is the bio </p> : null}
                 {this.state.secondActiveItem === 'subscriptions' ?
                 <ul> { this.props.profile.subscriptions.map((ele, i) => {
                   return <li onClick={() => this.goToSub(ele._id)}>{ele.title}</li>;
                 })}</ul>
                 : null}
                 {this.state.secondActiveItem === 'my posts' ?
                 this.props.profile.posts.length > 0 ?
                 <StackGrid
                   columnWidth={150}
                   > {this.props.profile.posts.map((ele, i) => {
                   return <div className = "imgBox" key={i}>
                     <img className = "img" src = {ele.image} alt = {"pic" + i}/>
                     <div class = "overlay"></div>
                     <div onClick = { () => this.goToPost(ele._id) } className = "imgTitleBox"><h1 className = "imgTitle">{ele.title}</h1></div>
                   </div>
                 })}</StackGrid>
                 : <Header as='h2'>
                   You have no posts right now.
                   <Header.Subheader>Create a post in the menu bar above</Header.Subheader>
                 </Header> : null}
                 {this.state.secondActiveItem === 'comment history' ?
                 this.props.profile.comments.length > 0 ?
                 <List>
                     {this.props.profile.comments.map((ele, i) => {
                      return <List.Item as='a'>
                        <Icon name='file alternate outline' />
                        <List.Content>
                          <List.Header>{ele.postTitle}</List.Header>
                          <List.Description onClick={() => this.goToComment(ele._id, ele.ancestor)}>{ele.content}</List.Description>
                        </List.Content>
                        <Divider />
                      </List.Item>
                    })}

                </List>

               //    <ul> { this.props.profile.comments.map((ele, i) => {
               //     return <li onClick={() => this.goToComment(ele._id, ele.ancestor)}>{ele.content}</li>;
               //   })}
               // </ul>
                 : <Header as='h2'>
                   You have no comments right now.
                   <Header.Subheader>Create a comment on a post to see your history!</Header.Subheader>
                 </Header> : null}
                 {this.state.secondActiveItem === 'activity' ? <p> This is the activity </p> : null}
               </Segment>
             </Grid.Column>
             <Grid.Column width={3}>
               <Card
                 image='https://www.w3schools.com/howto/img_avatar.png'
                 header='Daniel Ko'
                 meta='Friend'
                 description='Daniel is a software engineer living in NYC who loves to chill.'
                 extra={extra}
               />
             </Grid.Column>
           </Grid>
       </div>
     )
   }
 }

Profile.propTypes = {
  logout: PropTypes.func,
};

const mapStateToProps = ({auth, profile, input}) => {
  return {
    auth,
    profile,
    input,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    setInput: (value) => dispatch(setInput(value)),
    fetchProfile: () => dispatch(fetchProfile()),
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)
