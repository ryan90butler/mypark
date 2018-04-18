import React, { Component } from 'react';
import Header from '../Header/Header';
import {Link} from 'react-router-dom';
import axios from 'axios'
import './Details.scss';

class Details extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoaded: false,
      parkDetails: []
  }
  this.goBackButton = this.goBackButton.bind(this)
  }

  componentWillMount(){
    axios.get(`/api/park-details/${this.props.match.params.id}`)
    .then((r)=>{
      console.log(r)
      this.setState({
        isLoaded:true,
        parkDetails: r.data.data
    });
      });
  }

  goBackButton(){
    this.props.history.push({
      pathname: '/addpark'
    })
  }

  render() {

    const parkDetails = this.state.parkDetails.map((data, i)=>(
      <div className="park-container" key={data.id}>
     <ul className ="park-box">
      {data.fullName}
      </ul>
      <ul className ="park-box">
      {data.description}
      </ul>
      <div className='images-holder'>
      {data.url}
      </div>
      <button onClick={this.getDetails}>Details</button>
      </div>
    ))

    console.log(this.props.history)
    return (
      <div className="Details">
      <Header/>
        {parkDetails}
      <button onClick={this.goBackButton}>BackButton</button>
      <Link to='/addpark'>Back</Link>

      </div>
    );
  }
}

export default Details;