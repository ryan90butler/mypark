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
      this.register = this.register.bind(this);
  }

  register(){
      this.props.history.push('/new-user');
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

    const { email, password } = this.state;
    const isEnabled =
      email.length > 0 &&
      password.length > 0
      return (
        <div className="login-page">
    <div className="title-container">
    <h1>MyPark</h1>
    <h4>Your Guide to Visiting National Parks, Monuments, and more</h4>
    </div>
    <div className="login-register-container">
    <div className="login-form">
    <form onSubmit={(event)=>{this.registerOrLogin(event, 'login')}} >
    <div>
        <h2>Login</h2>
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
    <div className="login-button">
    <button disabled={!isEnabled} type="submit">Login</button>
    <br/>
    <button onClick={this.register}>Register</button>
    </div>
    </form>
    </div>
    </div>
</div>
      )
  }
}
export default Login;