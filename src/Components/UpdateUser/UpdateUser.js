import React, { Component } from 'react';
import Header from '../Header/Header';
import {Link} from 'react-router-dom';
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
      zip: ""
  }
  this.handleChange = this.handleChange.bind(this)
  this.updateUser = this.updateUser.bind(this)
  }

  handleChange(e){
    this.setState({
        [e.target.name]: e.target.value,
    });
}

  updateUser(){
    axios.put(`/api/update-user`, {email:this.state.email, password:this.state.password, firstName:this.state.firstName, lastName:this.state.lastName, city:this.state.city, state:this.state.state, zip:this.state.zip})
  }
  render() {
    return (
      <div className="UpdateUser">
      <Header/>
  <div className="update-form">
    <form onSubmit={(event)=>{this.updateUser()}} >
      <div>
        <label>First Name</label>
         <br/>
          <input className="login-input"  name="firstName" value={this.state.firstName} onChange={this.handleChange} type="text"/>
          </div>
          <br/>
      <div>
      <label>Last Name</label>
      <br/>
      <input className="login-input"  name="lastName" value={this.state.lastName} onChange={this.handleChange} type="text"/>
      </div>
      <br/>
      <div>
      <label>City</label>
      <br/>
      <input className="login-input"  name="city" value={this.state.city} onChange={this.handleChange} type="text"/>
      </div>
      <br/>
      <div>
      <label>State</label>
      <br/>
       <input className="login-input"  name="state" value={this.state.state} onChange={this.handleChange} type="text"/>
        </div>
        <br/>
        <div>
        <label>Zip</label>
        <br/>
        <input className="login-input"  name="zip" value={this.state.zip} onChange={this.handleChange} type="text"/>
        </div>
        <br/>
        <div>
        <label>Email</label>
        <br/>
        <input className="login-input"  name="email" value={this.state.email} onChange={this.handleChange} type="text"/>
        </div>
        <br/>
        <div>
        <label>Password</label>
        <br/>
        <input className="login-input" name="password" value={this.state.password} onChange={this.handleChange} type="text"/>
        </div>
        <div className="login-buttons">
        <button className="sign-up-button">Update</button>
        </div>
        </form>
         </div>

        <Link to='/dashboard'>Back</Link>
      </div>
    );
  }
}

export default UpdateUser;