import React from 'react';
import { Link } from 'react-router-dom';

import TextField from '../../components/TextField';
import PasswordField from '../../components/PasswordField';
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
            <div>
              <TextField
                defaultValue=''
                label='Email Id'
                returnValue={(text)=>{
                  this.setState({emailId:text});
                }}
              />
              <PasswordField
                defaultValue=''
                label='Password'
                returnValue={(text)=>{
                  this.setState({password:text});
                }}
              />
              <Link to={'/ForgotPassword'}>
                Forgot password?
              </Link>
                  
              <div>
                <Button text='Login'/>
              </div>
            </div>
    );
  }
}
