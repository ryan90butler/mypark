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
        this.setState({
          parkId:r.data
        })
      })
  }

  //individualize each parkid on add?

  render(){
    const { addToMyParks, parkid} = this.props
    console.log(this.props.parkid)
    return(
      <div>
      {/* {this.props.myParkAdd ?
      <button className="addToMyParks-Button">Added</button>: */}
      <button className="addToMyParks-Button" onClick={()=>addToMyParks(parkid)}>This is my Add Button</button>
      {/* } */}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({addToMyParks}, dispatch);
}

export default connect(state => state,mapDispatchToProps)(AddToMyParks);