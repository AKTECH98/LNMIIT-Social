import React from 'react';
import { Link } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '../../components/Button';
import Header from '../../components/Header';

export default class SignUp extends React.Component
{
  constructor(props){
    super(props);
    this.state={
      emailId:'',
      password:'',
      confirmPassword:''
    };
  }
  render()
  {
    return(
      <div>
      <Header/>
      <div className = "center signup">
      
        <p className = "signup__byline">REGISTER and Connect Your Skills</p>

        <TextField
          variant = "filled"
          style={{
            marginTop: 5,
            marginBottom: 5
          }}
          InputProps = {{
            style: {
              fontWeight: 300,
              color: 'white',
              fontSize: 20
            }
          }}
          InputLabelProps = {{
            style: {
              fontWeight: 500,
              color: 'white',
              fontSize: 15
            }
          }}
          defaultValue=''
          label='Email'
        />                
        
        <div className = "signup__details">
          <TextField
            variant = "filled"
            style={{
              marginRight: 5,
              marginTop: 5,
              marginBottom: 5
            }}
            InputProps = {{
              style: {
                fontWeight: 300,
                color: 'white',
                fontSize: 20
              }
            }}
            InputLabelProps = {{
              style: {
                fontWeight: 500,
                color: 'white',
                fontSize: 15
              }
            }}
            defaultValue=''
            label='First Name'
          />

          <TextField
            variant = "filled"
            style={{
              marginLeft: 5,
              marginTop: 5,
              marginBottom: 5
            }}
            InputProps = {{
              style: {
                fontWeight: 300,
                color: 'white',
                fontSize: 20
              }
            }}
            InputLabelProps = {{
              style: {
                fontWeight: 500,
                color: 'white',
                fontSize: 15
              }
            }}
            defaultValue=''
            label='Last Name'
          />
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
              color: 'white',
              fontSize: 20
            }
          }}
          InputLabelProps = {{
            style: {
              fontWeight: 500,
              color: 'white',
              fontSize: 15
            }
          }}
          defaultValue=''
          label='Password'
        />

        <Button text='Connect' type = 'button signup__button'/>  
      </div>
      </div>      
    );
};
};
