import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class DetailButton extends Component{
  constructor(){
    super()
    this.getDetails = this.getDetails.bind(this)
  }

  getDetails(){
    console.log(this.props.latLong)
    this.props.history.push({
      pathname: `/details/${this.props.parkid}`,
      state: { latLong: this.props.latLong }
    }
  );
  }

  render(){
    return(
      <button className="getDetails" onClick={()=>this.getDetails()}>Get Details</button>
    )
  }
}

export default withRouter(DetailButton);


