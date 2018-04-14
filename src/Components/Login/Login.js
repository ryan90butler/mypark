import React, { Component } from 'react';
import axios from 'axios';
import './Login.scss';

class Login extends Component {
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
      return (
          <div className="login-page">
          <div className="title-container">
          <h1>MyPark</h1>
          </div>
          <div className="login-register-container">
              <div className="login-form">
                  <form onSubmit={(event)=>{this.registerOrLogin(event, 'login')}} >
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
                      <button type="submit">Login</button>
                      </div>
                  </form>
              </div>
              <div className="register-form">
                  <form onSubmit={(event)=>{this.registerOrLogin(event, 'register')}} >
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
                      <button className="sign-up-button">Register</button>
                      </div>
                  </form>
              </div>
              </div>
          </div>
      )
  }
}
export default Login;