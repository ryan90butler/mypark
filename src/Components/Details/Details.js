import React, { Component } from 'react';
import Header from '../Header/Header';
import {Link} from 'react-router-dom';
import AddToParkButton from '../Common/AddToParkButton';
import axios from 'axios';
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
      this.setState({
        isLoaded:true,
        parkDetails: r.data.data
    });
      });
  }

  goBackButton(){
    this.props.history.push('/addpark')
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
      <ul>
      <img src={data.images[0].url} alt="no-go"/>
      </ul>
      <AddToParkButton parkid = {data.id}/>
      </div>
      <button onClick={this.getDetails}>Details</button>
      </div>
    ))

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