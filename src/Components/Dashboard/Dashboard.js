import React, { Component } from 'react';
import Header from '../Header/Header';
import {connect} from 'react-redux';
import {getUser} from '../../Redux/Actions/action';
import { bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import './Dashboard.scss';

class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
        isLoaded: false,
        firstName: ''
    }
  }

    componentDidMount(){
      this.props.getUser()
      .then((r)=>{
        this.setState({
            isLoaded:true,
            firstName: r.value.data[0].firstname
        });
    })
    }

    render() {
    return (
      <div className="Dashboard">
      <Header/>
      This is the dashboard of {this.state.firstName}

      <br/>

        Dashboard

        <Link to='/addpark'>Search for Parks</Link>
      </div>
    );
  }
}

function mapStateToProps({userInfo}){
  return {userInfo}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({getUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);