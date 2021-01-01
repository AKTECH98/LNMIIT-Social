import React from 'react';
import { Link,Redirect } from 'react-router-dom';

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
      redirect: false,
      btnLoad: false
    };
  }

  loginEmail = (e) => {
    this.setState({
      email : e.target.value,
      errorMessage : null
    })
  }

  loginPassword = (e) => {
    this.setState({
      password : e.target.value,
      errorMessage : null
    })
  }

  handleLogin = (event) => {

    event.preventDefault()

    this.setState({btnLoad:true});

    if(this.state.email && this.state.password)
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
          else{
            this.setState({errorMessage:res.reason})
            this.setState({btnLoad:false})
          }
        }
      )
    else
    {
      this.setState({errorMessage:"Enter All Details"})
      this.setState({btnLoad:false})
    }
  }

  render()
  {
    return(
      <div className = "login">
        <div className = "login__header">
          <p className = "login__title">LNMIIT SOCIAL</p>
          <p className = "login__subtitle">Welcome Back</p>
          <p className = "login__byline"> Login to connect to LNMIIT and Explore Skills </p>
        </div>
        
        <form onSubmit = {this.handleLogin}>        
          <div className = "login">
            
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
            onChange={this.loginEmail}
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
            type='password'
            defaultValue={this.state.password}
            onChange={this.loginPassword}
            label='Password'
            autoComplete = "current-password"
            />
            {(this.state.errorMessage)?
              <p className = "error">*{this.state.errorMessage}*</p>:""
            }
            <div className = "login__login">
              <div>
                <Button text={(this.state.btnLoad)?<i className="fa fa-spinner fa-spin"></i>:"Login"}
                        type = "login__button button"
                        onClick = {this.handleLogin}
                        disabled = {this.state.btnLoad}
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
        </form>
      </div>
    );
  }
}
