import React, { Component } from 'react';
import Header from '../Header/Header';
import AddToParkButton from '../Common/AddToParkButton';
import ReviewBox from '../Common/ReviewBox';
import axios from 'axios';
import {getUser, getParkDetails} from '../../Redux/Actions/action';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './Details.scss';

class Details extends Component {
  constructor(props){
    super(props)
    this.state = {
      parkDetails: [],
      parkComments: [],
      origin: '',
      destination: ''
  }
  this.goBackButton = this.goBackButton.bind(this)
  }

componentWillMount(){
  this.props.getUser()
    .then((response)=>{
    this.setState({
    origin: response.value.data[0].zip
    });
  this.props.getParkDetails(this.props.match.params.id)
    .then(r =>{
    this.setState({
    destination: r.value.data.data[0].fullName,
    parkDetails: r.value.data.data
    })
  axios.post(`/api/park-map`,{
    destination: r.value.data.data[0].fullName,
    origin: response.value.data[0].zip
    })
    .then((r)=>{
    this.setState({
    isLoaded:true,
    });
  })
})
  axios.get(`/api/get-comments/${this.props.match.params.id}`)
    .then((r)=>{
      this.setState({
        parkComments: r.data
      })
    })
    });
  }

  goBackButton(){
    this.props.history.push('/addpark')
  }

  render() {
    const parkComments = this.state.parkComments.map((data, i)=>(
      <div key={data.id}>
        <div>
          {data.title}
          </div>
        </div>
    ))
    const parkDetails = this.state.parkDetails.map((data, i)=>(
      <div className="park-container" key={data.id}>
     <ul className ="park-box">
      {data.fullName}
      </ul>
      <ul className ="park-box">
      {data.description}
      </ul>
      {data.url}
      <div className='images-holder'>
      <ul>
        {data.images[0].url ?
        <div>
      <img className="park-images" src={data.images[0].url} alt="no-go"/>
      <img className="park-images" src={data.images[1].url} alt="no-go"/>
      <img className="park-images" src={data.images[2].url} alt="no-go"/>
      <img className="park-images" src={data.images[3].url} alt="no-go"/>
      <img className="park-images" src={data.images[4].url} alt="no-go"/>
      </div>: null
        }
      </ul>
      </div>
      <AddToParkButton parkid = {data.parkCode}/>
      <ReviewBox parkCode={data.parkCode}/>
      </div>
    ))

    return (
      <div className="Details">
      <Header/>
        {parkDetails}
        <div>
          {parkComments}
          </div>
      <button onClick={this.goBackButton}>BackButton</button>

      </div>
    );
  }
}
function mapStateToProps({userInfo, getParkDetails}){
  return {userInfo, getParkDetails}
  }

function mapDispatchToProps(dispatch){
	return bindActionCreators({getUser, getParkDetails}, dispatch);
  }

export default connect(mapStateToProps, mapDispatchToProps)(Details);