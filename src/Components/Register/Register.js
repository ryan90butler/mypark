import React, { Component } from 'react';
import axios from 'axios';
import './Register.scss';

class Register extends Component {
  constructor(props){
      super(props)
      this.state = {
          email: "",
          password:"",
          firstName: "",
          lastName: "",
          city: "",
          state: "",
          zip: ""
      }
      this.handleChange = this.handleChange.bind(this);
      this.cancelRegister = this.cancelRegister.bind(this);
  }

  cancelRegister(){
    this.props.history.push('/')
  }

  registerOrLogin(e, login){
      e.preventDefault();
      axios.post(`/api/${login}`, {email:this.state.email, password:this.state.password, firstName:this.state.firstName, lastName:this.state.lastName, city:this.state.city, state:this.state.state, zip:this.state.zip})
          .then((response)=>{
              if(response.data.success){
                  this.props.history.push('/dashboard');
              }else{
                  alert("password or your email is incorrect")
              }
          })
          .catch((err)=>{
              console.log(err)
    })
  }

  handleChange(e){
      this.setState({
          [e.target.name]: e.target.value,
      });
  }

render(){
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
        <div className="register-container">
        <div className="details">
        <h2>Welcome to MyParks!</h2>
        <span>MyParks allows you to access travel and park information on any and all National Parks, Monuments, Landmarks, etc. in the United States.</span>
        </div>
        <div className="register-form">
        <form onSubmit={(event)=>{this.registerOrLogin(event, 'register')}} >
        <h2>Register</h2>
            <label>First Name</label>
            <br/>
            <input className="login-input"  name="firstName" value={this.state.firstName} onChange={this.handleChange} type="text"/>
        <br/>
            <label>Last Name</label>
            <br/>
            <input className="login-input"  name="lastName" value={this.state.lastName} onChange={this.handleChange} type="text"/>
        <br/>
            <label>City</label>
            <br/>
            <input className="login-input"  name="city" value={this.state.city} onChange={this.handleChange} type="text"/>
        <br/>
            <label>State</label>
            <br/>
            <input className="login-input"  name="state" value={this.state.state} onChange={this.handleChange} type="text"/>
        <br/>
            <label>Zip</label>
            <br/>
            <input className="login-input"  name="zip" value={this.state.zip} onChange={this.handleChange} type="text"/>
        <br/>
            <label>Email</label>
            <br/>
            <input className="login-input"  name="email" value={this.state.email} onChange={this.handleChange} type="text"/>
        <br/>
            <label>Password</label>
            <br/>
            <input className="login-input" name="password" value={this.state.password} onChange={this.handleChange} type="text"/>
        <div className="register-buttons">
        <button disabled={!isEnabled}className="sign-up-button">Register</button>
        <button onClick={this.cancelRegister}>Cancel</button>
        </div>
        </form>
        </div>
        </div>
    )
  }
}
export default Register;