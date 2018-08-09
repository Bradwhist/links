import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import StackGrid from "react-stack-grid"
import { logout, post, fetchSubs } from '../actions'
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
       title: '',
       image: '',
       subSearch: '',
       sub: '',
     };
   }
   componentWillMount() {
     this.props.fetchSubs();
   }
   setContent = (e) => {
     this.setState({
       content: e.target.value
     })
   }
   setTitle = (e) => {
     this.setState({
       title: e.target.value
     })
   }
   setImage = (e) => {
     this.setState({
       image: e.target.value
     })
   }
   setSubSearch = (e) => {
     this.setState({
       subSearch: e.target.value
     })
   }
   logout = () => {
   this.props.logout();
 }
  post = (e) => {
    e.preventDefault();
    this.props.post(this.state.title, this.state.content, this.state.image, this.state.sub);
  }
  goProfile = () => {
    this.props.history.push('/feed')
  }

   componentDidMount() {

   }

   render() {
     console.log('rendering post', this.props.subs);

     return (
       <div>
        <button onClick={this.logout}>Logout</button>
        <button onClick={this.goProfile}>Back to profile...</button>
        <form onSubmit={(e) => this.post(e)}>
          <label>
            New Post:
            <input type="text" name="title" value={this.state.title} onChange={this.setTitle} />
            <input type="text" name="image" value={this.state.image} onChange={this.setImage} />
            <input type="text" name="sub" value={this.state.subSearch} onChange={this.setSubSearch} />
            { this.state.subSearch !== '' ?
            <div>
            <ul>
              {this.props.subs.filter(ele => ele.title.indexOf(this.state.subSearch) !== - 1).map(ele => <li>{ele.title}</li>)}
            </ul>
            <Dropdown placeholder='Select Subreddit' fluid search selection options={this.props.subs.filter(ele => ele.title.indexOf(this.state.subSearch) !== -1)} />
            </div>
          :
          null
        }
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
  post: PropTypes.func,
  subs: PropTypes.array,
};

const mapStateToProps = ({ auth, subs }) => {
  return {
    auth,
    subs,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    post: (title, content, image, sub) => dispatch(post(title, content, image, sub)),
    fetchSubs: () => dispatch(fetchSubs()),
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post)
