import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import axios from 'axios';
import { addToMyParks } from '../../Redux/Actions/action';

class AddToMyParks extends Component{
  constructor(){
    super()
    this.removePark = this.removePark.bind(this)
  }


  removePark(parkId){
    axios.delete(`api/remove/`+ parkId)
      .then(r=>{
        console.log(r.data)
      })
  }

  render(){
    const { addToMyParks, parkid} = this.props
    return(
      <div>
      {this.props.myParkAdd ?
      <button className="addToMyParks-Button" onClick={() => this.removePark(parkid)}>Remove</button>:
      <button className="addToMyParks-Button" onClick={() => addToMyParks(parkid)}>Add</button>
      }
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({addToMyParks}, dispatch);
}

export default connect(state => state,mapDispatchToProps)(AddToMyParks);