import React from 'react';
import { Link,Redirect } from 'react-router-dom';
import Recaptcha from "react-recaptcha";


import Button from '../../components/Button';
import TextField from '@material-ui/core/TextField';
import {postRequest} from '../../components/CallApi'

export default class Login extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state={
      email:'',
      password:'',
      errorMessage:'',
      redirect:false,
      captchaVerified:false
    };

  }

  render()
  {
    return(

      <div className = "center login">
        <div className = "login__header">
          <p className = "login__title">LNMIIT SOCIAL</p>
          <p className = "login__subtitle">Welcome Back</p>
          <p className = "login__byline"> Login to connect to LNMIIT and Explore Skills </p>
        </div>

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
          type='password'
          defaultValue={this.state.email}
          onChange={(e)=>{this.setState({password:e.target.value})}}
          label='Password'
        />
        {this.state.errorMessage}

        <Recaptcha sitekey="6LcpMdsZAAAAAO9iK7CQZ9wpvAEYeLZvWQ0vA1qQ"
        onloadCallback={()=>{/*
          TODO: This fuction defines what happens after Captcha finished loading
          Low priority. Ignore this until most functionality is done and we are 
          using screeen loaders
        */}}

        verifyCallback = {()=>{/*On verifiction*/this.setState({captchaVerified:true})}}
        expiredCallback ={()=>{/*On expiration due to being idle*/this.setState({captchaVerified:false})}}
        />

        <div className = "login__login">
          <div>
            <Button text="Login"
                    type = "login__button button"
                    onClick = {()=>{
                      if(this.state.captchaVerified)
                      postRequest('login/login',
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
          {
            this.state.redirect?<Redirect to='/home'/>:""
          }
          <Link to={'/ForgotPassword'} className = "button--link login__forgot">
            Forgot password?
          </Link>

          <div className = "login__new">
            <p>New User?
            <Link to = {'/SignUp'} className = "button--link login__link">Connect</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
