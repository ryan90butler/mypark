import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { addToMyParks } from '../../Redux/Actions/action';

class AddToMyParks extends Component{

  render(){
    const { addToMyParks, parkID} = this.props
    return(
      <button className="addToMyParks-Button" onClick={() => addToMyParks(parkID)}>ADD TO BASKET</button>
    )
  }
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({addToMyParks}, dispatch);
}

export default connect(state => state,mapDispatchToProps)(AddToMyParks);