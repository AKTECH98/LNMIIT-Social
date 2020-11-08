import React from 'react';
import { Link,Redirect } from 'react-router-dom';
import Recaptcha from "react-recaptcha";


import Button from '../../components/Button';
import TextField from '@material-ui/core/TextField';
import {postRequest} from '../../components/CallApi'

export default class ConfirmSignUp extends React.Component
{
  render()
  {
  	const url = window.location.href;
    const parser = require('url-parameter-parser');
    const res = parser(url);

      console.log(res)
    return(
      <div>
      Negative cases not yet handled
        {
          postRequest('login/confirmsignup',
          {
            'otp':res.otp,                                 
          },
          (res)=>{
            if(res.message=="SUCCESS")
            {
              window.alert("Email Verified Successfully")
            }
            }
        )
        }
      </div>

    );
  }
}
