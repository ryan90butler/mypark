import React, { Component } from 'react';

class DetailButton extends Component{
  constructor(){
    super()
    this.getDetails = this.getDetails.bind(this)
  }

  getDetails(){
    console.log(this.props)
    this.props.history.push(`/details/${this.props}`);
  }

  render(){
    console.log(this.props)
    return(
      <button className="addToBasket-Button" onClick={this.getDetails}>Get Details</button>
    )
  }
}

export default DetailButton;


