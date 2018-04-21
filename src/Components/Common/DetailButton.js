import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class DetailButton extends Component{
  constructor(){
    super()
    this.getDetails = this.getDetails.bind(this)
  }

  getDetails(){
    this.props.history.push(`/details/${this.props.parkid}`);
  }

  render(){
    return(
      <button className="getDetails" onClick={()=>this.getDetails()}>Get Details</button>
    )
  }
}

export default withRouter(DetailButton);


