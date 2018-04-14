import React, { Component } from 'react';
import Header from '../Header/Header';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './Dashboard.scss';

class Dashboard extends Component {
  render() {
    console.log(this.props.getUserInfo)
    return (
      <div className="Dashboard">
      <Header/>
        Dashboard
        {this.props.getUserInfo}

        <Link to='/addpark'>Search for Parks</Link>
      </div>
    );
  }
}

function mapStateToProps({getUserInfo}){
  return {getUserInfo}
}

export default connect(mapStateToProps)(Dashboard);