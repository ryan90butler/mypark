import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import axios from 'axios';
import { addToMyParks, getParkId } from '../../Redux/Actions/action';

class AddToMyParks extends Component{
  constructor(){
    super()
    this.removePark = this.removePark.bind(this)
  }

  componentDidMount(){
    this.props.getParkId()
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
    // const myParkId = this.props.mypar

    const { addToMyParks, parkid} = this.props

    // const myAddedProps = this.props.addToMyParks.map((data, i)=>(
    //   <div>{data.parkid}</div>
    // ))

    // if this.props.addToMyParks.
    return(
      <div>
      {/* {this.props.myParkAdd ?
      <button className="addToMyParks-Button">Added</button>: */}
      <button style={{height: 30}} className="addToMyParks-Button" onClick={()=>addToMyParks(parkid)}>Add To MyParks</button>
      {/* } */}
      </div>
    )}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({addToMyParks, getParkId}, dispatch);
}

function mapStateToProps({userInfo, getParkId}){
  return {userInfo, getParkId}
  }

export default connect(mapStateToProps,mapDispatchToProps)(AddToMyParks);