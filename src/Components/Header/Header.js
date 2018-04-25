import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import './Header.scss';

class Header extends Component {
  constructor(){
    super()
    this.sessionDestroy = this.sessionDestroy.bind(this)
  }

  sessionDestroy(){
    axios.get(`/api/logout`)
      .then((r)=>{
        if(r.data.success){
          this.props.history.push('/');
        }else{
          alert("unable to logout")
        }
      })
  }

  render() {
    return (
      <div className="Header">
      <div className="header-logo">
        <Link to='/dashboard'><h1 className="header-text">MyParks</h1></Link>
        </div>
        <div className="button-container">
        <Link className="header-link"to='/updateuser'>Update User</Link>
        <button className="header-link" onClick={this.sessionDestroy}>Logout</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);