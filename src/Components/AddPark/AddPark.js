import React, { Component } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import AddToParkButton from '../Common/AddToParkButton';
import DetailButton from '../Common/DetailButton';
import ReviewBox from '../Common/ReviewBox';
import './AddPark.scss';

class AddPark extends Component {
  constructor(){
    super()
      this.state={
        state: "",
        search: "",
        parkData:[]
      }
      this.handleChange = this.handleChange.bind(this);
      this.getPark = this.getPark.bind(this);
      this.backToDashboard = this.backToDashboard.bind(this);
  }

  handleChange(e){
    const name = e.target.name
    const value = e.target.value
    this.setState({
    [name]: value,
    });
  }

  backToDashboard(){
    this.props.history.push('/dashboard')
  }

  getPark(e){
    e.preventDefault();
    axios.get(`/api/parks?state=${this.state.state}`)
    .then(r => {
      this.setState({
        parkData: r.data.data,
      })
    })
      .catch(error => {
        console.warn(error)
      })
  }

  render() {
      const parkResults = this.state.parkData.map((data, i)=>(
      <div className="park-box"key={data.id}>
     <h2>
      {data.fullName}
      </h2>
      <p>
      {data.description}
      </p>
      <div className='add-park-images-holder'>
      {data.images[0] ?
      <img width="250" height="250" alt='holder' src={data.images[0].url}/>:null}
      {data.images[1] ?
      <img width="250" height="250" alt='holder' src={data.images[1].url}/>:null}
      {data.images[2] ?
      <img width="250" height="250" alt='holder' src={data.images[2].url}/>:null}
      </div>
      <div className="add-park-buttons">
      <ReviewBox/>
      <DetailButton parkName ={data.fullName} parkid = {data.parkCode}/>
      <AddToParkButton parkid = {data.parkCode}/>
      </div>
      </div>
    ))
  return (
    <div className="AddPark">
      <Header/>
      <p>You can browse National Parks, Monuments, or Landmarks by selecting any state in the United States.</p>
<form onSubmit={this.getPark}>
  <select className="select-state-drop-down"name='state' value={this.state.state} onChange={this.handleChange}>
    <option>Select State</option>
    <option value="AL">Alabama</option>
    <option value="AK">Alaska</option>
    <option value="AZ">Arizona</option>
    <option value="AR">Arkansas</option>
    <option value="CA">California</option>
    <option value="CO">Colorado</option>
    <option value="CT">Connecticut</option>
    <option value="DE">Delaware</option>
    <option value="DC">District Of Columbia</option>
    <option value="FL">Florida</option>
    <option value="GA">Georgia</option>
    <option value="HI">Hawaii</option>
    <option value="ID">Idaho</option>
    <option value="IL">Illinois</option>
    <option value="IN">Indiana</option>
    <option value="IA">Iowa</option>
    <option value="KS">Kansas</option>
    <option value="KY">Kentucky</option>
    <option value="LA">Louisiana</option>
    <option value="ME">Maine</option>
    <option value="MD">Maryland</option>
    <option value="MA">Massachusetts</option>
    <option value="MI">Michigan</option>
    <option value="MN">Minnesota</option>
    <option value="MS">Mississippi</option>
    <option value="MO">Missouri</option>
    <option value="MT">Montana</option>
    <option value="NE">Nebraska</option>
    <option value="NV">Nevada</option>
    <option value="NH">New Hampshire</option>
    <option value="NJ">New Jersey</option>
    <option value="NM">New Mexico</option>
    <option value="NY">New York</option>
    <option value="NC">North Carolina</option>
    <option value="ND">North Dakota</option>
    <option value="OH">Ohio</option>
    <option value="OK">Oklahoma</option>
    <option value="OR">Oregon</option>
    <option value="PA">Pennsylvania</option>
    <option value="RI">Rhode Island</option>
    <option value="SC">South Carolina</option>
    <option value="SD">South Dakota</option>
    <option value="TN">Tennessee</option>
    <option value="TX">Texas</option>
    <option value="UT">Utah</option>
    <option value="VT">Vermont</option>
    <option value="VA">Virginia</option>
    <option value="WA">Washington</option>
    <option value="WV">West Virginia</option>
    <option value="WI">Wisconsin</option>
    <option value="WY">Wyoming</option>
  </select>
  <br/>
  <button className="searchButton">Search</button>
</form>
{parkResults.length ?
<div className='park-list'>
  {parkResults}
  </div>:
  null}
 <button className="dashboard-button"onClick={this.backToDashboard}>Dashboard</button>
  </div>
  );
  }
}

export default AddPark;