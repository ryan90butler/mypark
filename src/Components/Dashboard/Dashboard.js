import React, { Component } from 'react';
import Header from '../Header/Header';
import {connect} from 'react-redux';
import {getUser} from '../../Redux/Actions/action';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ReviewBox from '../Common/ReviewBox';
import './Dashboard.scss';

class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
        isLoaded: false,
        firstName: '',
        myParks: []
    }
    this.removePark = this.removePark.bind(this)
  }

componentWillMount(){
      this.props.getUser()
      .then((r)=>{
        this.setState({
            isLoaded:true,
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
    <ul>
    {data.data[0].fullName}
    </ul>
    <ul>
    {data.data[0].description}
    </ul>
    <ReviewBox parkCode={data.data[0].parkCode}/>
    <button onClick={()=> this.removePark(data.data[0].parkCode)}>Remove</button>
    </div>
  ))
  return (
      <div className="Dashboard">
      <Header/>
      This is the dashboard of {this.state.firstName}
      <br/>
      <div>
        <Link to='/addpark'>Search for Parks</Link>
       {myParkData}
        </div>
      <br/>
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