import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";

import Header from '../../components/Header'
import TextField from '../../components/TextField';
import Card from '../../components/Strip';
import PasswordField from '../../components/PasswordField';
import Grid from '../../components/Grid';
import GridItem from '../../components/GridItem';
import Button from '../../components/Button';

export default class ForgotPassword extends React.Component
{
  constructor(props){
    super(props);
    this.state={
      password:'',
      confirmPassword:''
    };
  }
  render()
  {
    return(
            <Grid>
                <GridItem small={12} medium={12} large={12}>
                    <PasswordField
                        defaultValue=''
                        label='Password'
                        returnValue={(text)=>{
                                      this.setState({password:text});
                                    }}
                    />
                </GridItem>
                <GridItem small={12} medium={12} large={12}>
                    <PasswordField
                        defaultValue=''
                        label='Confirm Password'
                        returnValue={(text)=>{
                                      this.setState({confirmPassword:text});
                                    }}
                    />
                </GridItem>
                <GridItem small={7} medium={7} large={7}>
                </GridItem>
                <GridItem small={5} medium={5} large={5}>
                  <div style={{textAlign:'right'}}>
                    <Button text='Submit'/>
                  </div>
                </GridItem>
            </Grid>

    );
  }
}
