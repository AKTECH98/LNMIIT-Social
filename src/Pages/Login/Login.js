import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/Button';
import TextField from '../../components/TextField';


export default class Login extends React.Component
{
  state={
    emailId:'',
    password:''
  };

  styleProp = {
    width: 400,
    marginTop: 5,
    marginBottom: 5
  }

  inputPropStyle = {
    style: {
      fontWeight: 300,
      color: 'white',
      fontSize: 20
    }
  }

  labelPropStyle = {
    style: {
      fontWeight: 500,
      color: 'white',
      fontSize: 15
    }
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
          FeildStyle = {this.styleProp}
          inputprops = {this.inputPropStyle}
          LabelStyle = {this.labelPropStyle}
          defaultValue=''
          label='Email'
        />
        <TextField
          type = 'Password'
          variant = "filled"
          FeildStyle = {this.styleProp}
          inputprops = {this.inputPropStyle}
          LabelStyle = {this.labelPropStyle}
          defaultValue=''
          label='Password'
        />
        <Link to={'/Home'} className="button login__button">
          Login
        </Link>

        <Link to={'/ForgotPassword'} className = "button--link login__link">
          Forgot password?
        </Link>

        <div className = "login__new">
          New User?
          <Link to = {'/SignUp'} className = "button--link login__link">Connect</Link>
        </div>
      </div>
    );
  }
}
