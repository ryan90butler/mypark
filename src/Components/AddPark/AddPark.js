import React, { Component } from 'react';
import Header from '../Header/Header';
import {Link} from 'react-router-dom';
import './AddPark.scss';

class AddPark extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="AddPark">
      <Header/>
        AddPark

        <Link to='/dashboard'>Back</Link>
        <Link to='/details/:id'>Detail</Link>

      </div>
    );
  }
}

export default AddPark;