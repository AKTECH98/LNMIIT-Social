import React from 'react';
import { Link,Redirect } from 'react-router-dom';
import Recaptcha from "react-recaptcha";


import Button from '../../components/Button';
import TextField from '@material-ui/core/TextField';
import {postRequest} from '../../components/CallApi'
import Header from '../../components/Header'

export default class ConfirmOTP extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state={
      otpValid: false
    }
  }
   componentDidMount(){
      {
          const url = window.location.href;
          const parser = require('url-parameter-parser');
          const res = parser(url);
          postRequest('login/confirmotp',
          {
            'otp':res.otp,                                 
          },
          (res)=>{
            if(res.message=="SUCCESS")
            {
              this.setState({otpValid:true})
            }
          }
        )
        }
    }
  render()
  {    
    return(
      <div className = "center">
      {
        (this.state.otpValid)?
        <p className = "otp--message otp--success"> OTP Verification Succesfully </p>
        :
        <p className = "otp--message otp--failed"> OTP INVALID /has been EXPIRED </p>
      }
      <Link to="/" className = "linklink opt--redirect">
        Click Here To Login.....
      </Link>
      </div>

    );
  }
}
