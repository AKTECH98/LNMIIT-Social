import React from 'react';

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
  };

  render()
  {
    return(
      <div>
        <PasswordField
          defaultValue=''
          label='Password'
          returnValue={(text)=>{
            this.setState({password:text});
          }}
        />                
                    
        <PasswordField 
          defaultValue=''
          label='Confirm Password'
          returnValue={(text)=>{
            this.setState({confirmPassword:text});
          }}
        />
                  
        <div>
          <Button text='Submit'/>
        </div>
      </div>
    );
  }
}
