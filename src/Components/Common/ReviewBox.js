import React, { Component } from 'react';
import axios from 'axios';

class ReviewBox extends Component{
  constructor(){
    super()
    this.state = {
      commentTitle: '',
      comments: '',
      allComments: []
    }
    this.addComment = this.addComment.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    const name = e.target.name
    const value = e.target.value
    this.setState({
    [name]: value,
    });
  }

  // componentWillMount(){
  //   axios.get(`/api/get-comments`,{
  //     parkCode:this.allComments
  //   })
  //   .then(r=>{
  //   console.log(r)
  //   this.setState({
  //   myParks: r.data
  //     })
  //   })
  // }

  addComment(e){
    e.preventDefault();
    axios.post(`/api/add-comment`,{
      comments: this.state.comments,
      commentTitle: this.state.commentTitle,
      parkCode: this.props.parkCode
    })
    .then(r=>{
      console.log(r.data)
     this.setState({
       allComments: r.data
     })
    })
  }

  render(){
    const reviews = this.state.allComments.map((data,i)=>(
      <div key={i}>
      <div>
        <div>
        {data.title}
        </div>
        <div>
        {data.description}
        </div>
        <div>
        {data.created_on}
          </div>
        </div>
        </div>
    ))
    return(
      <div className="comment-box">
        <div>
          <form onSubmit={this.addComment}>
          <button className="comment-button"onClick={this.addComment}>Add Comment</button>
          <input name="commentTitle" className="input-field"type="text" value={this.state.commentTitle} placeholder="Title" onChange={this.handleChange}/>
          <input name="comments" className="input-field"type="text" value={this.state.comments} placeholder="Enter Personal Experiences" onChange={this.handleChange}/>
          </form>
          </div>
          {reviews}
        </div>
    )
  }
}

export default ReviewBox;