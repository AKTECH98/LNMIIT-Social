import React from 'react';
import { Redirect } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '../../components/Button';
import Header from '../../components/Header';

import Recaptcha from "react-recaptcha";

import {postRequest} from '../../components/CallApi'

export default class SignUp extends React.Component
{
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      confirmPassword:'',
      errorMessage:'',
      redirect:false
    };
  }

  handleSignup = (event) => {

    event.preventDefault()

    if (this.state.password ==this.state.confirmPassword)
    {
      postRequest('login/signup',
        {
          'email':this.state.email,
          'name': this.state.name,
          'password': this.state.password
        },
        (res)=>{
          if(res.message=="SUCCESS")
          {
            this.setState({redirect:true})
          }
          this.setState({errorMessage:res.reason})
        }
      )
    }
    else
    {
      this.setState({errorMessage:'Passwords Do Not Match'})
    }
  }

  signUpEmail = (e) => {
    this.setState({
      email : e.target.value,
      errorMessage : null
    })
  }

  signUpPassword = (e) => {
    this.setState({
      password : e.target.value,
      errorMessage : null
    })
  }

  signUpConfirm = (e) => {
    this.setState({
      confirmPassword: e.target.value,
      errorMessage: null
    })
  }

  render()
  {
    return(
      <div>
      <Header/>
      <div className = "center signup">
        <p className = "signup__byline">REGISTER and Connect Your Skills</p>
        <form onSubmit = {this.handleSignup}>
          <div className = "signup">
            <TextField
              variant = "filled"
              style={{
                marginTop: 5,
                marginBottom: 5
              }}
              InputProps = {{
                style: {
                  fontWeight: 300,
                  color: 'black',
                  fontSize: 20
                }
              }}
              InputLabelProps = {{
                style: {
                  fontWeight: 500,
                  color: 'purple',
                  fontSize: 15
                }
              }}
              defaultValue={this.state.email}
              onChange={this.signUpEmail}
              label='Email'
              autoComplete = "username"
            />
            <TextField
              variant = "filled"
              style={{
                marginTop: 5,
                marginBottom: 5
              }}
              InputProps = {{
                style: {
                  fontWeight: 300,
                  color: 'black',
                  fontSize: 20
                }
              }}
              InputLabelProps = {{
                style: {
                  fontWeight: 500,
                  color: 'purple',
                  fontSize: 15
                }
              }}
              defaultValue={this.state.email}
              onChange={(e)=>{this.setState({name:e.target.value})}}
              label='Full Name'
            />
            <TextField
              variant = "filled"
              style={{
                marginTop: 5,
                marginBottom: 5
              }}
              InputProps = {{
                style: {
                  fontWeight: 300,
                  color: 'black',
                  fontSize: 20
                }
              }}
              InputLabelProps = {{
                style: {
                  fontWeight: 500,
                  color: 'purple',
                  fontSize: 15
                }
              }}
              onChange={this.signUpPassword}
              defaultValue={this.state.password}
              label='Password'
              type="password"
              autoComplete = "current-password"
            />
            <TextField
              variant = "filled"
              style={{
                marginTop: 5,
                marginBottom: 5
              }}
              InputProps = {{
                style: {
                  fontWeight: 300,
                  color: 'black',
                  fontSize: 20
                }
              }}
              InputLabelProps = {{
                style: {
                  fontWeight: 500,
                  color: 'purple',
                  fontSize: 15
                }
              }}
              onChange={this.signUpConfirm}
              defaultValue={this.state.confirmPassword}
              label='Confirm Password'
              type="password"
              autoComplete = "password"
            />

            {(this.state.errorMessage)?<p className = "error">*{this.state.errorMessage}*</p>:""}
            
            {this.state.redirect?<Redirect to ='/Front'/>:""}

            <div className = "signup__connect">
            <Button text='Connect'
              type = 'button signup__button'
              onClick = {this.handleSignup}
            />
            </div>
          </div>
        </form>
      </div>
      </div>
    );
};
};
