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
      <div>
      {
        (this.state.otpValid)?
        <div style={{color:'green'}}> OTP was verified succesfully</div>
        : <div style={{color:'red'}}> OTP is invalid or has expired</div>
      }
      <Link to="/"><button style={{backgroundColor:'blue',color:'white'}}><h2>Click here to go back to site</h2></button></Link>
      </div>

    );
  }
}
