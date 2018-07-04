import React, { Component } from 'react';
import axios from 'axios';
import './ContactUs.scss';

class ContactUs extends Component {
  constructor(props){
      super(props)
      this.state = {
        name: '',
        email: '',
        message: ''
      }
      this.handleChange = this.handleChange.bind(this);
      this.sendEmail = this.sendEmail.bind(this);
  }

  sendEmail(){
    axios.post(`/emailSend`,{name: this.state.name, email: this.state.email, message: this.state.message})
    .then(r =>{
      console.log(r)
    })
  }

  handleChange(e){
      this.setState({
          [e.target.name]: e.target.value,
      });
  }
      render(){
      return (
        <div className="register-container">
        <form onSubmit={this.sendEmail}>
        <h2>ContactUs</h2>
        <label>Your Email</label>
        <br/>
        <input name="email" value={this.state.email} onChange={this.handleChange} type="text"/>
        <br/>
        <label>Your Name</label>
        <br/>
        <input name="name" value={this.state.name} onChange={this.handleChange} type="text"/>
        <br/>
        <label>Message</label>
        <br/>
        <textarea rows="4" cols="50" value={this.state.message} onChange={this.handleChange} name="message" type="text"/>
        <button type='submit'>Email</button>
        </form>
        </div>
    )
  }
}
export default ContactUs;