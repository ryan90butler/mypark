import React, { Component } from 'react';
import Header from '../Header/Header';
import {Link} from 'react-router-dom';
import './Details.scss';

class Details extends Component {
  render() {
    return (
      <div className="Details">
      <Header/>
        Details

      <Link to='/dashboard'>Back</Link>

      </div>
    );
  }
}

export default Details;