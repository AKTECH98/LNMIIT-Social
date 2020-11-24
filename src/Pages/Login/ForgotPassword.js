import React from 'react';

import TextField from '@material-ui/core/TextField';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Recaptcha from "react-recaptcha";
import {postRequest} from '../../components/CallApi'

export default class ForgotPassword extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state={
      email:'',
      password:'',
      confirmPassword:'',
      errorMessage:'',
      redirect:false,
      captchaVerified:false
    };

  }
  render()
  {
    return(
      <div>
        <Header />
        <div className = "center fpwd">
          <TextField
            variant = "filled"
            style={{
              width: 400,
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
            defaultValue=''
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
            defaultValue=''
            onChange={(e)=>{this.setState({password:e.target.value})}}
            label='New Password'
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
            defaultValue=''
            label='Confirm Password'
            type="password"
          />
          <Recaptcha sitekey="6LcpMdsZAAAAAO9iK7CQZ9wpvAEYeLZvWQ0vA1qQ"
        onloadCallback={()=>{/*
          TODO: This fuction defines what happens after Captcha finished loading
          Low priority. Ignore this until most functionality is done and we are 
          using screeen loaders
        */}}

        verifyCallback = {()=>{/*On verifiction*/this.setState({captchaVerified:true})}}
        expiredCallback ={()=>{/*On expiration due to being idle*/this.setState({captchaVerified:false})}}
        />
          <Button text="Submit"
                    type = "button fpwd__button"
                    onClick = {()=>{
                      if (this.state.password !=this.state.confirmPassword)
                          {
                            this.setState({errorMessage:'The passwords entered do not match'})
                            return
                          }
                      if(this.state.captchaVerified)
                      postRequest('login/forgotpassword',
                                               {
                                                 'email':this.state.email,
                                                 'password': this.state.password,
                                               },
                                               (res)=>{
                                                 if(res.message=="SUCCESS")
                                                 {
                                                   window.localStorage.setItem('email',this.state.email)
                                                   window.localStorage.setItem('password',this.state.password)
                                                   this.setState({redirect:true})
                                                 }

                                                 this.setState({errorMessage:res.reason})
                                               }
                                              )
                    else
                    {
                      this.setState({errorMessage:"Verify Captcha first"})
                    }
                    }
                  }
            />

        </div>
      </div>
    );
  }
}
