import React, { Component } from 'react';
import Header from '../Header/Header';
import AddToParkButton from '../Common/AddToParkButton';
import ReviewBox from '../Common/ReviewBox';
import axios from 'axios';
import {getUser, getParkDetails, removeComments, getParkComments} from '../../Redux/Actions/action';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './Details.scss';

class Details extends Component {
  constructor(props){
    super(props)
    this.state = {
      parkDetails: [],
      origin: '',
      destination: '',
      campground: [],
      mapDirections: []
      }
  this.goBackButton = this.goBackButton.bind(this);
  this.deleteComment = this.deleteComment.bind(this);
  this.addComment = this.addComment.bind(this);
  }

componentWillMount(){
  this.props.getUser()
    .then((response)=>{
    this.setState({
    origin: response.value.data[0].zip,
    userId: response.value.data[0].id
    });
  this.props.getParkDetails(this.props.match.params.id)
    .then((r) =>{
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
    mapDirections: r.data.routes[0].legs,
    });
  })
})
axios.get(`/api/campgrounds/${this.props.match.params.id}`)
  .then((r)=>{
    this.setState({
      campground: r.data.data
    })
  })
  this.props.getParkComments(this.props.match.params.id)
    });
  }

  deleteComment(id, parkid){
    this.props.removeComments(id, parkid)
  }

  addComment(e){
    e.preventDefault();
    this.props.addParkComments({
      comments: this.state.comments,
      commentTitle: this.state.commentTitle,
      parkCode: this.props.parkCode
    })
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
    const parkComments = this.props.parkComments.map((data, i)=>{
      const date = new Date(data.created_on);
      const dateDisplay = `${ date.getMonth() + 1 }/${ date.getDate() }/${ date.getFullYear() }`
      return (
      <div className="comments-container" key={data.id}>
        <div className="individual-comments">
          {dateDisplay}
          <ul/>
          <h3>{data.title}</h3>

          {data.description}
          <ul/>
          {data.userFirstName}
          {data.userLastName}
          <ul/>
          {this.state.userId === data.user_id?
          <button onClick={()=>{ if (window.confirm('Are you sure you wish to delete this comment?')) this.deleteComment(data.id, data.parkid)}}>you may delete</button> :null
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
          {campgrounds.length ? <div className="campground-container"><h2>Campgrounds</h2>
          {campgrounds}
          </div>:null}
          </div>
          <div>
          {parkComments.length ? <div className="comment-container"><h2>Visitor Comments</h2>{parkComments}</div> :null}
          </div>
          </div>
      <button onClick={this.goBackButton}>BackButton</button>
      </div>
    );
  }
}
function mapStateToProps({userInfo, parkComments}){
  return {userInfo, parkComments}
  }

function mapDispatchToProps(dispatch){
	return bindActionCreators({getUser,getParkComments, removeComments, getParkDetails}, dispatch);
  }

export default connect(mapStateToProps, mapDispatchToProps)(Details);