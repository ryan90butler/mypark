import React, { Component } from 'react';
import Header from '../Header/Header';
import {Link} from 'react-router-dom';
import './UpdateUser.scss';

class UpdateUser extends Component {
  render() {
    return (
      <div className="UpdateUser">
      <Header/>
        UpdateUser
        <Link to='/dashboard'>Back</Link>
      </div>
    );
  }
}

export default UpdateUser;