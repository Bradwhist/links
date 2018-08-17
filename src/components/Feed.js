import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import StackGrid from "react-stack-grid";
import _ from 'lodash'
// import CreateCategory from './CreateCategory'
import { logout, fetchPosts, fetchSubs, upvotePost, downvotePost, setInput } from '../actions'
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
  Loader,
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
 class Feed extends Component {
   constructor(props){
     super(props);
     this.state = {
       activeItem: 'home',
       sortParam: '',
       sortOrder: true,
       loaded: false,
       isLoading: false,
       results: [],
       value: '',
     }
   }

   async componentDidMount() {
     console.log(this.props);
     this.props.fetchSubs();
     let res = await this.props.fetchPosts(this.props.auth.logged._id);
     this.setState({ loaded: res })
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
    this.setState({ sortParam: sortParam, sortOrder: newSortOrder })
  }

  goToPost(postId) {
    this.props.history.push('/post/' + postId);
  }

  goToSub(subId) {
    this.props.history.push('/sub/' + subId);
  }

   render() {
     console.log('rendering feed', this.props.input);
     console.log('xxx', this.state.results);
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
          fluid = {true}
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
        { this.state.loaded ?
          this.props.subs.length === 0 ? <Header as='h2'>
            Customize your feed!
            <Header.Subheader>This area will consist of all posts from subreddits that you follow! To get started, click explore and start following some subs!</Header.Subheader>
          </Header> :
        <StackGrid
        columnWidth={300}
        >
        {this.props.posts.filter((ele) => ele.subscribed)
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
          return  <div className = "imgBox" key={"key" + i}>
            <Image
              fluid
              src = {ele.image} alt = {"pic" + i} className = "img" />
              <Label className = 'ribbonLabel' style = {{position: 'absolute', left: -14, top: 20, zIndex: 1}} as='a' color='teal' ribbon onClick = {() => this.goToSub(ele.sub.id)}>
                {ele.sub.title}
              </Label>
              <div onClick = { () => this.goToPost(ele._id) } class = "overlay"></div>
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
      : <Loader active content = "Loading" inline='centered' />}
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

const mapStateToProps = ({auth, posts, input, subs}) => {
  return {
    auth,
    posts,
    input,
    subs
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    fetchPosts: (userId) => dispatch(fetchPosts(userId)),
    fetchSubs: () => dispatch(fetchSubs()),
    upvotePost: (postId, index) => dispatch(upvotePost(postId, index)),
    downvotePost: (postId, index) => dispatch(downvotePost(postId, index)),
    setInput: (value) => dispatch(setInput(value))
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Feed)

// {this.props.posts ?
// this.props.posts.map((ele, i) => <div key={"key" + (i + 1)}>{"key" + (i + 1)}</div> )
// :
// null
// }



// <div className = "imgBox" key="key1">
//   <img src = "https://images.unsplash.com/photo-1533756102515-155e3863ee1c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7714524f4448bdda1d20f3cb883d2e45&auto=format&fit=crop&w=634&q=80" alt = "pic1" className = "img" />
//   <div class = "overlay"></div>
//   <div className = "imgTitleBox"><h1 className = "imgTitle">Insert title here</h1></div>
//     <div className = 'likeBtn'>
//       <Button
//         icon = 'thumbs up outline'
//         color = "teal"
//         label={{ as: 'a', basic: true, content: '2,048' }}
//         labelPosition='right'
//         // onClick event handler here
//       />
//     </div>
//     <div className = 'dislikeBtn'>
//       <Button
//         icon = 'thumbs down outline'
//         color = "teal"
//         label={{ as: 'a', basic: true, content: '2,048' }}
//         labelPosition='right'
//       />
//     </div>
// </div>
// <div className = "imgBox" key="key2"><img src = "https://images.unsplash.com/photo-1533821312764-eb0483f98f69?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d383aa86b1a43b453dd58374919155b9&auto=format&fit=crop&w=1050&q=80" alt = "pic2" className = "img"/>
//   <div class = "overlay"></div>
//   <div className = "imgTitleBox"><h1 className = "imgTitle">Insert title here</h1></div>
//   <div className = 'likeBtn'>
//     <Button
//       icon = 'thumbs up outline'
//       color = "teal"
//       label={{ as: 'a', basic: true, content: '2,048' }}
//       labelPosition='right'
//     />
//   </div>
//   <div className = 'dislikeBtn'>
//     <Button
//       icon = 'thumbs down outline'
//       color = "teal"
//       label={{ as: 'a', basic: true, content: '2,048' }}
//       labelPosition='right'
//     />
//   </div>
// </div>
// <div className = "imgBox" key="key3"><img src = "https://images.unsplash.com/photo-1533826418470-0cef7eb8bdaa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=714f5ed2388ebfa626d8263ef243c644&auto=format&fit=crop&w=634&q=80" alt = "pic3" className = "img"/>
//   <div class = "overlay"></div>
//   <div className = "imgTitleBox"><h1 className = "imgTitle">Insert title here</h1></div>
//   <div className = 'likeBtn'>
//     <Button
//       icon = 'thumbs up outline'
//       color = "teal"
//       label={{ as: 'a', basic: true, content: '2,048' }}
//       labelPosition='right'
//     />
//   </div>
//   <div className = 'dislikeBtn'>
//     <Button
//       icon = 'thumbs down outline'
//       color = "teal"
//       label={{ as: 'a', basic: true, content: '2,048' }}
//       labelPosition='right'
//     />
//   </div>
// </div>
// <div className = "imgBox" key="key4"><img src = "https://images.unsplash.com/photo-1533765204875-741de68c678e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=85f7d010307ca1ff3e6d0674a611e2a1&auto=format&fit=crop&w=634&q=80" alt = "pic4" className = "img"/><div class = "overlay"></div></div>
// <div className = "imgBox" key="key5"><img src = "https://images.unsplash.com/photo-1533756972958-d6f38a9761e3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d710493bc1818842db8ce47f887708f2&auto=format&fit=crop&w=1189&q=80" alt = "pic5" className = "img"/><div class = "overlay"></div></div>
// <div className = "imgBox" key="key6"><img src = "https://images.unsplash.com/photo-1533764625214-b97671494f23?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f6130b5c1dd5cbba0fa332b333cac299&auto=format&fit=crop&w=634&q=80" alt = "pic6" className = "img"/></div>
// <div className = "imgBox" key="key7"><img src = "https://images.unsplash.com/photo-1533740566848-5f7d3e04e3d7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=066fe0801369a27252aaf3f937dfc1c2&auto=format&fit=crop&w=966&q=80" alt = "pic7" className = "img"/></div>
// <div className = "imgBox" key="key8"><img src = "https://images.unsplash.com/photo-1533801486575-df9ba68f1b2d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5a4e7b86f088a08627e672c5ac6769c3&auto=format&fit=crop&w=700&q=80" alt = "pic8" className = "img"/></div>
// <div className = "imgBox" key="key9"><img src = "https://images.unsplash.com/photo-1533743409942-b91130480a7a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8de38cb4666d15a48e3c62406cc28bf6&auto=format&fit=crop&w=1050&q=80" alt = "pic9" className = "img"/></div>
// <div className = "imgBox" key="key10"><img src = "https://images.unsplash.com/photo-1533737338828-ebebc30718b3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=53e27caa90c9ba12aa428c6991faca79&auto=format&fit=crop&w=634&q=80" alt = "pic10" className = "img"/></div>
// <div className = "imgBox" key="key11"><img src = "https://images.unsplash.com/photo-1533811097408-37b102ee4f2a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d2ec440abcfd00cba15b6923aee49ac2&auto=format&fit=crop&w=1050&q=80" alt = "pic11" className = "img"/></div>
// <div className = "imgBox" key="key12"><img src = "https://images.unsplash.com/photo-1533743280867-7ba1c2b1b72f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=528bb435f73af6ac1a4c3221b0fba409&auto=format&fit=crop&w=700&q=80" alt = "pic12" className = "img"/></div>
// <div className = "imgBox" key="key13"><img src = "https://images.unsplash.com/photo-1533777977055-64856abacf89?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2a32fe8de53706e32ee40ec0763f2218&auto=format&fit=crop&w=634&q=80" alt = "pic13" className = "img"/></div>
// <div className = "imgBox" key="key14"><img src = "https://images.unsplash.com/photo-1533770699395-5761e5d08106?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=363f39b71ee57e936da6f04a7830895f&auto=format&fit=crop&w=1049&q=80" alt = "pic14" className = "img"/></div>
// <div className = "imgBox" key="key15"><img src = "https://images.unsplash.com/photo-1533806064455-027ff369d458?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=13359ba9b7e00f6ef4d9d221f2e3a272&auto=format&fit=crop&w=1050&q=80" alt = "pic15" className = "img"/></div>
// <div className = "imgBox" key="key16"><img src = "https://images.unsplash.com/photo-1533779088228-9db21617b403?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6b9dfe6474ef37028996bdd798bd5637&auto=format&fit=crop&w=634&q=80" alt = "pic16" className = "img"/></div>
// <div className = "imgBox" key="key17"><img src = "https://images.unsplash.com/photo-1533737181121-ae845505976e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1ea3573c278bf3979183a7e0f738adb7&auto=format&fit=crop&w=1050&q=80" alt = "pic17" className = "img"/></div>
// <div className = "imgBox" key="key18"><img src = "https://images.unsplash.com/photo-1533776898888-0c5f1128419e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a00993b7eda8ff178a69302ecc0bce15&auto=format&fit=crop&w=931&q=80" alt = "pic18" className = "img"/></div>
// <div className = "imgBox" key="key19"><img src = "https://images.unsplash.com/photo-1533806481099-93f1242aea1e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0f2ba53e0ed1f9ecd16acb04ad0f70f7&auto=format&fit=crop&w=1050&q=80" alt = "pic19" className = "img"/></div>
// <div className = "imgBox" key="key20"><img src = "https://images.unsplash.com/photo-1533821263976-14bd21f716cd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4a2d29ad653b5a3f335c766c70ae4b61&auto=format&fit=crop&w=1234&q=80" alt = "pic20" className = "img"/></div>
// <div className = "imgBox" key="key21"><img src = "https://images.unsplash.com/photo-1533792658684-4c83f4825a61?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e434a913163a01e2d2462d5d924ec545&auto=format&fit=crop&w=1050&q=80" alt = "pic21" className = "img"/></div>
// <div className = "imgBox" key="key22"><img src = "https://images.unsplash.com/photo-1533787896899-91b040188f57?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=aebf11a22dc7c7a52794bb8a15749071&auto=format&fit=crop&w=1020&q=80" alt = "pic22" className = "img"/></div>
// <div className = "imgBox" key="key23"><img src = "https://images.unsplash.com/photo-1533796846028-7243a1adf748?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fab1a48ac8030aee83bb5bb1a350a3c3&auto=format&fit=crop&w=634&q=80" alt = "pic23" className = "img"/></div>
// <div className = "imgBox" key="key24"><img src = "https://images.unsplash.com/photo-1533734640-1e555dd1f5cf?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fc0e392eae87dfc489da6569ab45258c&auto=format&fit=crop&w=1050&q=80" alt = "pic24" className = "img"/></div>


// <div className = "imgBox" key="key1"><img src = "https://images.unsplash.com/photo-1533756102515-155e3863ee1c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7714524f4448bdda1d20f3cb883d2e45&auto=format&fit=crop&w=634&q=80" alt = "pic1" className = "img" /><div class = "overlay"></div></div>
// <div className = "imgBox" key="key2"><img src = "https://images.unsplash.com/photo-1533821312764-eb0483f98f69?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d383aa86b1a43b453dd58374919155b9&auto=format&fit=crop&w=1050&q=80" alt = "pic2" className = "img"/><div class = "overlay"></div></div>
// <div className = "imgBox" key="key3"><img src = "https://images.unsplash.com/photo-1533826418470-0cef7eb8bdaa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=714f5ed2388ebfa626d8263ef243c644&auto=format&fit=crop&w=634&q=80" alt = "pic3" className = "img"/><div class = "overlay"></div></div>
// <div className = "imgBox" key="key4"><img src = "https://images.unsplash.com/photo-1533765204875-741de68c678e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=85f7d010307ca1ff3e6d0674a611e2a1&auto=format&fit=crop&w=634&q=80" alt = "pic4" className = "img"/><div class = "overlay"></div></div>
// <div className = "imgBox" key="key5"><img src = "https://images.unsplash.com/photo-1533756972958-d6f38a9761e3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d710493bc1818842db8ce47f887708f2&auto=format&fit=crop&w=1189&q=80" alt = "pic5" className = "img"/><div class = "overlay"></div></div>
// <div className = "imgBox" key="key6"><img src = "https://images.unsplash.com/photo-1533764625214-b97671494f23?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f6130b5c1dd5cbba0fa332b333cac299&auto=format&fit=crop&w=634&q=80" alt = "pic6" className = "img"/></div>
// <div className = "imgBox" key="key7"><img src = "https://images.unsplash.com/photo-1533740566848-5f7d3e04e3d7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=066fe0801369a27252aaf3f937dfc1c2&auto=format&fit=crop&w=966&q=80" alt = "pic7" className = "img"/></div>
// <div className = "imgBox" key="key8"><img src = "https://images.unsplash.com/photo-1533801486575-df9ba68f1b2d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5a4e7b86f088a08627e672c5ac6769c3&auto=format&fit=crop&w=700&q=80" alt = "pic8" className = "img"/></div>
// <div className = "imgBox" key="key9"><img src = "https://images.unsplash.com/photo-1533743409942-b91130480a7a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8de38cb4666d15a48e3c62406cc28bf6&auto=format&fit=crop&w=1050&q=80" alt = "pic9" className = "img"/></div>
// <div className = "imgBox" key="key10"><img src = "https://images.unsplash.com/photo-1533737338828-ebebc30718b3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=53e27caa90c9ba12aa428c6991faca79&auto=format&fit=crop&w=634&q=80" alt = "pic10" className = "img"/></div>
// <div className = "imgBox" key="key11"><img src = "https://images.unsplash.com/photo-1533811097408-37b102ee4f2a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d2ec440abcfd00cba15b6923aee49ac2&auto=format&fit=crop&w=1050&q=80" alt = "pic11" className = "img"/></div>
// <div className = "imgBox" key="key12"><img src = "https://images.unsplash.com/photo-1533743280867-7ba1c2b1b72f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=528bb435f73af6ac1a4c3221b0fba409&auto=format&fit=crop&w=700&q=80" alt = "pic12" className = "img"/></div>
// <div className = "imgBox" key="key13"><img src = "https://images.unsplash.com/photo-1533777977055-64856abacf89?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2a32fe8de53706e32ee40ec0763f2218&auto=format&fit=crop&w=634&q=80" alt = "pic13" className = "img"/></div>
// <div className = "imgBox" key="key14"><img src = "https://images.unsplash.com/photo-1533770699395-5761e5d08106?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=363f39b71ee57e936da6f04a7830895f&auto=format&fit=crop&w=1049&q=80" alt = "pic14" className = "img"/></div>
// <div className = "imgBox" key="key15"><img src = "https://images.unsplash.com/photo-1533806064455-027ff369d458?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=13359ba9b7e00f6ef4d9d221f2e3a272&auto=format&fit=crop&w=1050&q=80" alt = "pic15" className = "img"/></div>
// <div className = "imgBox" key="key16"><img src = "https://images.unsplash.com/photo-1533779088228-9db21617b403?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6b9dfe6474ef37028996bdd798bd5637&auto=format&fit=crop&w=634&q=80" alt = "pic16" className = "img"/></div>
// <div className = "imgBox" key="key17"><img src = "https://images.unsplash.com/photo-1533737181121-ae845505976e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1ea3573c278bf3979183a7e0f738adb7&auto=format&fit=crop&w=1050&q=80" alt = "pic17" className = "img"/></div>
// <div className = "imgBox" key="key18"><img src = "https://images.unsplash.com/photo-1533776898888-0c5f1128419e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a00993b7eda8ff178a69302ecc0bce15&auto=format&fit=crop&w=931&q=80" alt = "pic18" className = "img"/></div>
// <div className = "imgBox" key="key19"><img src = "https://images.unsplash.com/photo-1533806481099-93f1242aea1e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0f2ba53e0ed1f9ecd16acb04ad0f70f7&auto=format&fit=crop&w=1050&q=80" alt = "pic19" className = "img"/></div>
// <div className = "imgBox" key="key20"><img src = "https://images.unsplash.com/photo-1533821263976-14bd21f716cd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4a2d29ad653b5a3f335c766c70ae4b61&auto=format&fit=crop&w=1234&q=80" alt = "pic20" className = "img"/></div>
// <div className = "imgBox" key="key21"><img src = "https://images.unsplash.com/photo-1533792658684-4c83f4825a61?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e434a913163a01e2d2462d5d924ec545&auto=format&fit=crop&w=1050&q=80" alt = "pic21" className = "img"/></div>
// <div className = "imgBox" key="key22"><img src = "https://images.unsplash.com/photo-1533787896899-91b040188f57?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=aebf11a22dc7c7a52794bb8a15749071&auto=format&fit=crop&w=1020&q=80" alt = "pic22" className = "img"/></div>
// <div className = "imgBox" key="key23"><img src = "https://images.unsplash.com/photo-1533796846028-7243a1adf748?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fab1a48ac8030aee83bb5bb1a350a3c3&auto=format&fit=crop&w=634&q=80" alt = "pic23" className = "img"/></div>
// <div className = "imgBox" key="key24"><img src = "https://images.unsplash.com/photo-1533734640-1e555dd1f5cf?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fc0e392eae87dfc489da6569ab45258c&auto=format&fit=crop&w=1050&q=80" alt = "pic24" className = "img"/></div>
