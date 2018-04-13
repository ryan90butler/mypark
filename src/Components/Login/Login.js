import React, { Component } from 'react';
import axios from 'axios';
import './Login.scss';

class Login extends Component {
  constructor(props){
      super(props)
      this.state = {
          email: "",
          password:"",
      }
      this.handleChange = this.handleChange.bind(this);
  }

  registerOrLogin(e, login){
      e.preventDefault();
      axios.post(`/api/${login}`, {email:this.state.email, password:this.state.password})
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
                      <button onClick={(event)=>{this.registerOrLogin(event, 'register')}} className="sign-up-button">Register</button>
                      </div>
                  </form>
              </div>
              <div className="register-form">
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
                      <button onClick={(event)=>{this.registerOrLogin(event, 'register')}} className="sign-up-button">Register</button>
                      </div>
                  </form>
              </div>
          </div>
      )
  }
}
export default Login;