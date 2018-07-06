import React, { Component } from 'react';
import Header from '../Header/Header';
import {connect} from 'react-redux';
import {getUser} from '../../Redux/Actions/action';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import './UpdateUser.scss';

class UpdateUser extends Component {
  constructor(){
    super()
    this.state = {
      email: "",
      password:"",
      firstName: "",
      lastName: "",
      city: "",
      state: "",
      zip: "",
      id: ""
  }
  this.handleChange = this.handleChange.bind(this);
  this.updateUser = this.updateUser.bind(this);
  this.toDash = this.toDash.bind(this);
  }

  handleChange(e){
    this.setState({
        [e.target.name]: e.target.value,
    });
  }
  toDash(){
    this.props.history.push('/dashboard')
  }
  componentDidMount(){
    this.props.getUser()
    .then((r)=>{
      this.setState({
          id: r.value.data[0].id,
          email: r.value.data[0].email,
          firstName: r.value.data[0].firstname,
          lastName: r.value.data[0].lastname,
          city: r.value.data[0].city,
          state: r.value.data[0].state,
          zip: r.value.data[0].zip
      });
    })
  }

  updateUser(){
    axios.put(`/api/update-user`, {email:this.state.email, password:this.state.password, firstName:this.state.firstName, lastName:this.state.lastName, city:this.state.city, state:this.state.state, zip:this.state.zip, id: this.state.id })
  }
  render() {
    const { email, password, firstName, lastName, city, state, zip } = this.state;
    const isEnabled =
      email.length > 0 &&
      password.length > 0 &&
      firstName.length > 0 &&
      lastName.length > 0 &&
      city.length > 0 &&
      state.length > 0 &&
      zip.length > 0
    return (
      <div className="UpdateUser">
      <Header/>
  <div className="update-form">
  <div className="update-table">
    <form onSubmit={(event)=>{this.updateUser()}}>
    <h2>
      Update User
      </h2>
      <div>
      <label className="update-label">First Name</label>
      <br/>
      <input className="update-input"  name="firstName" value={this.state.firstName} onChange={this.handleChange} type="text"/>
      </div>
      <br/>
      <div>
      <label className="update-label">Last Name</label>
      <br/>
      <input className="update-input"  name="lastName" value={this.state.lastName} onChange={this.handleChange} type="text"/>
      </div>
      <br/>
      <div>
      <label className="update-label">City</label>
      <br/>
      <input className="update-input" name="city" value={this.state.city} onChange={this.handleChange} type="text"/>
      </div>
      <br/>
      <div>
      <label className="update-label">State</label>
      <br/>
       <input className="update-input"  name="state" value={this.state.state} onChange={this.handleChange} type="text"/>
        </div>
        <br/>
        <div>
        <label className="update-label">Zip</label>
        <br/>
        <input className="update-input"  name="zip" value={this.state.zip} onChange={this.handleChange} type="text"/>
        </div>
        <br/>
        <div>
        <label className="update-label">Email</label>
        <br/>
        <input className="update-input"  name="email" value={this.state.email} onChange={this.handleChange} type="text"/>
        </div>
        <br/>
        <div>
        <label className="update-label">Password</label>
        <br/>
        <input className="update-input" name="password" value={this.state.password} onChange={this.handleChange} type="text"/>
        </div>
        <div className="update-buttons">
        <button disabled={!isEnabled}className="sign-up-button">Update</button>
        </div>
        </form>
        <button className="update-user-back" onClick={this.toDash}>Back</button>
         </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);