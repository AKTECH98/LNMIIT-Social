import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '../../components/Button';

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
    };
  }

  handlePassword = (event) => {

    event.preventDefault()

    if(this.state.password==this.state.confirmPassword)
    {
      postRequest('login/forgotpassword',
        {
          'email':this.state.email,
          'password': this.state.password,
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
      this.setState({errorMessage:"Passwords Not Match"})
  }

  forgetEmail = (e) => {
    this.setState({
      email : e.target.value,
      errorMessage : null
    })
  }

  forgetPassword = (e) => {
    this.setState({
      password : e.target.value,
      errorMessage : null
    })
  }

  forgetConfirm = (e) => {
    this.setState({
      confirmPassword: e.target.value,
      errorMessage: null
    })
  }

  render()
  {
    return(
      <div className = "center fpwd">
        <div className = "login__header">
          <p className = "login__title">LNMIIT SOCIAL</p>
        </div>
        <p className = "login__byline"> Reset Your Password </p>
        <form onSubmit = {this.handlePassword}>
          <div className = "fpwd">
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
              onChange={this.forgetEmail}
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
              defaultValue=''
              onChange={this.forgetPassword}
              label='New Password'
              type="password"
              autoComplete = "password"
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
              onChange={this.forgetConfirm}
              defaultValue=''
              label='Confirm Password'
              type="password"
              autoComplete = "confirmPassword"
            />
            {(this.state.errorMessage)?
              <p className = "error">*{this.state.errorMessage}*</p>:""
            }
            <div className = "login__login">
              <div>
              <Button text="Submit"
                type = "button fpwd__button"
                onClick = {this.handlePassword}
              />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
