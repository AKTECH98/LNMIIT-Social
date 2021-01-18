import React from 'react';
import { Link} from 'react-router-dom';
import {postRequest} from '../../components/CallApi'

export default class ConfirmOTP extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state={
      otpValid: false,
      loading: false
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
        (this.state.loading)?
          <center><div className = "loader--sqaure"><div/><div/></div></center>
        :
          (this.state.otpValid)?
            <p className = "otp--message otp--success"> OTP Verification Succesfully </p>
          :
            <p className = "otp--message otp--failed"> OTP INVALID /has been EXPIRED </p>
      }
      {
        (this.state.loading)?
        ""
        :
          <Link to="/" className = "linklink opt--redirect">
            Click Here To Login.....
          </Link>
      }
      </div>

    );
  }
}
