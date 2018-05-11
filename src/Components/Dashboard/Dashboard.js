import React, { Component } from 'react';
import Header from '../Header/Header';
import {connect} from 'react-redux';
import {getUser} from '../../Redux/Actions/action';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import DetailButton from '../Common/DetailButton';
import ReviewBox from '../Common/ReviewBox';
import './Dashboard.scss';

class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
        firstName: '',
        myParks: [],
        myParkPictures: []
    }
    this.removePark = this.removePark.bind(this);
    this.searchForParks = this.searchForParks.bind(this);
  }

componentDidMount(){
      this.props.getUser()
      .then((r)=>{
        this.setState({
            firstName: r.value.data[0].firstname
        });
        })
      .then(()=>{
        axios.get(`/api/myparks`)
        .then(r=>{
        this.setState({
          myParks: r.data
        })
      })
    })
  }
  searchForParks(){
    this.props.history.push('/addpark')
  }
  removePark(parkId){
    axios.delete(`api/remove/`+ parkId)
      .then(r=>{
        this.setState({
          myParks: r.data
        })
      })
  }

render() {
  const myParkData = this.state.myParks.map((data, i)=>(
    <div className="my-park-details" key={i}>
    <h2>
    {data.data[0].fullName}
    </h2>
    <p>
    {data.data[0].description}
    </p>
      <div className="dashboard-image-holder">{data.data[0].images[0] ?
     <img className="myParkImages"src={data.data[0].images[0].url} alt="noGo"/>:null}
     {data.data[0].images[1] ?
     <img className="myParkImages"src={data.data[0].images[1].url} alt="noGo"/>:null}
      {data.data[0].images[2] ?
     <img className="myParkImages"src={data.data[0].images[2].url} alt="noGo"/>:null}
     {data.data[0].images[3] ?
     <img className="myParkImages"src={data.data[0].images[3].url} alt="noGo"/>:null}
     </div>
     <div className="park-buttons">
    <DetailButton parkName ={data.data[0].fullName} parkid = {data.data[0].parkCode}/>
    <button onClick={()=>{ if (window.confirm('Are you sure you wish to delete this park?')) this.removePark(data.data[0].parkCode)}}>Remove</button>
    <ReviewBox parkCode={data.data[0].parkCode}/>
    </div>
    </div>
  ))
  return (
      <div className="Dashboard">
      <Header/>
      <div className="dashboard-header-container">
      <h2 className="dashboard-title">{this.state.firstName}'s Dashboard</h2>
        <button className="search-button" onClick={this.searchForParks}>Search for Parks</button>
      </div>
      <br/>
      <div className="MyPark-list">
       {myParkData}
        </div>
      </div>
    );
  }
  }

  function mapStateToProps({userInfo}){
    return {userInfo}
    }
  function mapDispatchToProps(dispatch){
    return bindActionCreators({getUser}, dispatch);
    }
  export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);