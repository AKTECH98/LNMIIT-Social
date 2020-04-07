import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

import Header from '../../components/Header'
import TextField from '../../components/TextField';
import Card from '../../components/Strip';
import PasswordField from '../../components/PasswordField';
import Grid from '../../components/Grid';
import GridItem from '../../components/GridItem';
import Button from '../../components/Button';

import LoginTemplate from '../../templates/LoginTemplate/LoginTemplate';

export default class Login extends React.Component
{
  constructor(props){
    super(props);
    this.state={
      emailId:'',
      password:''
    };
  }
  render()
  {
    return(
        <LoginTemplate>
            <Grid>
                <GridItem small={12} medium={12} large={12}>
                    <TextField
                        defaultValue=''
                        label='Email Id'
                        returnValue={(text)=>{
                                      this.setState({emailId:text});
                                    }}
                    />
                </GridItem>
                <GridItem small={12} medium={12} large={12}>
                    <PasswordField
                        defaultValue=''
                        label='Password'
                        returnValue={(text)=>{
                                      this.setState({password:text});
                                    }}
                    />
                </GridItem>
                <GridItem small={7} medium={7} large={7}>
                  <Link
                    to={'/ForgotPassword'}
                  >
                      Forgot password?
                  </Link>
                </GridItem>
                <GridItem small={5} medium={5} large={5}>
                  <div style={{textAlign:'right'}}>
                    <Button text='Login'/>
                  </div>
                </GridItem>
            </Grid>
        </LoginTemplate>

    );
  }
}
