import React, { Component } from 'react';
import {addParkComments, getParkComments} from '../../Redux/Actions/action';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class ReviewBox extends Component{
  constructor(){
    super()
    this.state = {
      commentTitle: '',
      comments: '',
      addReview: false
    }
    this.addComment = this.addComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.allowComment =  this.allowComment.bind(this);
  }

  handleChange(e){
    const name = e.target.name
    const value = e.target.value
    this.setState({
    [name]: value,
    });
  }

  addComment(e){
    e.preventDefault();
    this.props.addParkComments({
      comments: this.state.comments,
      commentTitle: this.state.commentTitle,
      parkCode: this.props.parkCode})
        .then(r=>{
     this.setState({
       addReview: false,
       commentTitle: '',
       comments: '',
     })
    })
  }
  allowComment(){
    this.setState({
      addReview: true
    })
  }

  render(){
    return(
        <div>
          {this.state.addReview ?
          <form onSubmit={this.addComment}>

          <button className="comment-button"onClick={this.addComment}>Submit Comment</button>

          <input name="commentTitle" className="input-field"type="text" value={this.state.commentTitle} placeholder="Title" onChange={this.handleChange}/>

          <input name="comments" className="input-field"type="text" value={this.state.comments} placeholder="Enter Personal Experiences" onChange={this.handleChange}/>

        </form>: <button style={{height: 30}} onClick={this.allowComment}>Comment</button>}
      </div>
    )
  }
}

function mapStateToProps({userInfo}){
  return {userInfo}
  }

function mapDispatchToProps(dispatch){
	return bindActionCreators({addParkComments, getParkComments}, dispatch);
  }

export default connect(mapStateToProps, mapDispatchToProps)(ReviewBox);