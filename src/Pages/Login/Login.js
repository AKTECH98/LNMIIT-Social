import React from 'react';
import { Link } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '../../components/Button';

export default class Login extends React.Component
{
  constructor(props){
    super(props);
    this.state={
      emailId:'',
      password:''
    };
  };

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
            width: 400,
            marginTop: 5,
            marginBottom: 5
          }}
          InputProps = {
            {
              style: {
                fontWeight: 300,
                color: 'white',
                fontSize: 20
              }
            }
          }
          InputLabelProps = {
            {
              style: {
                fontWeight: 500,
                color: 'white',
                fontSize: 15
              }
            }
          }
          defaultValue=''
          label='Email'
        />
        <form>
        <TextField
          type = 'Password'
          variant = "filled"
          style={{
            marginTop: 3,
            width: 400
          }}
          InputProps = {
            {
              style: {
                fontWeight: 300,
                color: 'white',
                fontSize: 20
              }
            }
          }
          InputLabelProps = {
            {
              style: {
                fontWeight: 500,
                color: 'white',
                fontSize: 15
              }
            }
          }
          defaultValue=''
          label='Password'
        />
        </form>
        <Button text='Login' type = 'button login__button'/>

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
