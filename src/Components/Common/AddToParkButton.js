import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { addToMyParks } from '../../Redux/Actions/action';

class AddToMyParks extends Component{

  render(){
    const { addToMyParks, parkid} = this.props
    return(
      <div>
      {this.props.addToMyParks ?
      <button className="addToMyParks-Button" onClick={() => addToMyParks(parkid)}>ADD</button>:
      <div>added</div>
      }
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({addToMyParks}, dispatch);
}

export default connect(state => state,mapDispatchToProps)(AddToMyParks);