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
      destination: '',
      campground: [],
      mapDirections: []
  }
  this.goBackButton = this.goBackButton.bind(this)
  }

componentWillMount(){
  this.props.getUser()
    .then((r)=>{
    this.setState({
    origin: r.value.data[0].zip,
    userId: r.value.data[0].id
    });
  this.props.getParkDetails(this.props.match.params.id)
    .then(r =>{
    this.setState({
    destination: r.value.data.data[0].fullName,
    parkDetails: r.value.data.data
    })
  axios.post(`/api/park-map`,{
    destination: r.value.data.data[0].fullName,
    origin: r.value.data.data[0].zip
    })
    .then((r)=>{
    this.setState({
    mapDirections: r.data.routes[0].legs,
    isLoaded:true,
    });
  })
})
axios.get(`/api/campgrounds/${this.props.match.params.id}`)
  .then((r)=>{
    this.setState({
      campground: r.data.data
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
    const distance = this.state.mapDirections.map((data, i)=>(
      <div className="distance-container" key={i}>
        {data.start_address}
        <ul/>
        {data.end_address}
        <ul/>
        {data.distance.text}
        <ul/>
        {data.duration.text}
        </div>
    ))

    console.log(this.state.userId)

    const parkComments = this.state.parkComments.map((data, i)=>{
      const date = new Date(data.created_on);
      const dateDisplay = `${ date.getMonth() + 1 }/${ date.getDate() }/${ date.getFullYear() }`
      return (
      <div className="comments-container" key={data.id}>
        <div className="individual-comments">
          <h3>{data.title}</h3>
          {data.description}

          {dateDisplay}
          <ul/>
          {data.user_id}
          <ul/>
          {this.state.userId === data.user_id?
           <div>you may delete</div> :null
          }
          </div>
        </div>
    );
  })

    const campgrounds = this.state.campground.map((data,i)=>(
      <div key={data.id}>
      <ul>
        <h3>{data.name}</h3>
        </ul>
      <ul>
        {data.description}
        </ul>
      <ul>
        <h4>Amenities</h4>
        {data.amenities.campStore ? <div>Camp Store</div>: null}
        {data.amenities.laundry ? <div>Laundry</div>: null}
        {data.amenities.potableWater ? <div>Drinking Water</div>: null}
        {data.amenities.showers ? <div>Showers</div>: null}
        {data.amenities.fireWoodForSale ? <div>Firewood</div>: null}
        {data.amenities.toilets ? <div>Toilets</div>: null}
        {data.amenities.cellPhoneReception ? <div>Cell Phone Reception</div>: null}
        </ul>
        </div>
    ))

    const parkDetails = this.state.parkDetails.map((data, i)=>(
      <div key={data.id}>
     <ul className ="park-box">
      <h2>{data.fullName}</h2>
      </ul>
      <ul className ="park-box">
      {data.description}
      </ul>
      <a href={data.url} target="_blank">Visit Official NPS site</a>
      <div className='images-holder'>
      <ul>
        <div>
         {data.images[0] ?
      <img className="park-images" src={data.images[0].url} alt="no-go"/>:
      null
          }
          {data.images[1] ?
      <img className="park-images" src={data.images[1].url} alt="no-go"/>:
      null
          }
          {data.images[2] ?
      <img className="park-images" src={data.images[2].url} alt="no-go"/>:
      null
          }
          {data.images[3] ?
      <img className="park-images" src={data.images[3].url} alt="no-go"/>: null
          }
          {data.images[4] ?
      <img className="park-images" src={data.images[4].url} alt="no-go"/>:
      null
          }
      </div>
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
        {distance}
        <div>
          <div>
          {parkComments ? <div className="comment-container"><h2>Visitor Comments</h2>{parkComments}</div> :null}
          </div>
          <div>
          {campgrounds ? <div className="campground-container"><h2>Campgrounds</h2>
          {campgrounds}
          </div>:null}
          </div>
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