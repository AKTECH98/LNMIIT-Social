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
      captchaVerified:false,
      errorMessage:'',
      redirect:false
    };
  }
  render()
  {
    return(
      <div>
      <Header/>
      <div className = "center signup">
        <p className = "signup__byline">REGISTER and Connect Your Skills</p>
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
          onChange={(e)=>{this.setState({email:e.target.value})}}
          label='Email'
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
          onChange={(e)=>{this.setState({password:e.target.value})}}
          defaultValue={this.state.password}
          label='Password'
          type="password"
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
          onChange={(e)=>{this.setState({confirmPassword:e.target.value})}}
          defaultValue={this.state.confirmPassword}
          label='Confirm Password'
          type="password"
        />
        <div>
          {this.state.errorMessage}
        </div>
        {
          this.state.redirect?<Redirect to ='/login'/>:""
        }

        <Recaptcha sitekey="6LcpMdsZAAAAAO9iK7CQZ9wpvAEYeLZvWQ0vA1qQ"
        onloadCallback={()=>{/*
          TODO: This fuction defines what happens after Captcha finished loading
          Low priority. Ignore this until most functionality is done and we are 
          using screeen loaders
        */}}

        verifyCallback = {()=>{/*On verifiction*/this.setState({captchaVerified:true})}}
        expiredCallback ={()=>{/*On expiration due to being idle*/this.setState({captchaVerified:false})}}
        />
        <div className = "signup__connect">
        <Button text='Connect'
                type = 'button signup__button'
                onClick = {()=>{
                          if (this.state.password !=this.state.confirmPassword)
                          {
                            this.setState({errorMessage:'The passwords entered do not match'})
                            return
                          }
                          postRequest('login/signup',
                                           {
                                             'email':this.state.email,
                                             'firstName': this.state.firstName,
                                             'middleName': this.state.middleName,
                                             'lastName': this.state.lastName,
                                             'password': this.state.password
                                           },
                                           (res)=>{
                                             if(res.message=="SUCCESS")
                                             {
                                               this.setState({redirect:true})
                                             }
                                             this.setState({errorMessage:res.reason})
                                           }
                )}}
        />
        </div>
      </div>
      </div>
    );
};
};
