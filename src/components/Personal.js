import React from 'react';

import Button from './Button';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import {postRequest} from './CallApi';

/*const useStyles = makeStyles({
  root: {
    backgroundColor: '#20222b',
    height: 'fit-content'
  },
  rootHeader: {
    borderBottom: '0.3rem solid #333745',
    height: 'fit-content'
  },
  subRoot: {
    backgroundColor: '#20222b',
    minHeight: 200,
    maxHeight: 200
  },
  subHeader: {
    borderBottom: '0.1rem solid #333745'
  },
  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: 300
  },
  subTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 300
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  subContent: {
    color: 'white',
  },
  body2: {
    fontSize: 12,
    width: 500
  }
});*/

class Personal extends React.Component{
  constructor(props)
  {
    super(props)
    this.state={
      details:null
    }
  }
  render()
  {
    postRequest('profile/getprofiledetails',
                               {
                                 'email':window.localStorage.getItem('email'),
                                 'password':window.localStorage.getItem('password')
                               },
                               (res)=>{this.setState({details:res.response})}
                )
  return(
  <Card>
    <CardHeader
      action = {
        <Button text="EDIT" type = "button__edit" />
      }
      title= {this.state.details==null?'Default Name':this.state.details.first_name + ' ' + this.state.details.middle_name + ' ' + this.state.details.last_name}
    />
    <CardContent>

      <Card>
        <CardHeader
          title= "About"
        />
        <CardContent>
          <Typography variant = "body2">
            {this.state.details==null?'Default Description':this.state.details.profile_description}
          </Typography>
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          title= "Contact Info."
        />
        <CardContent>
          <Typography variant = "h5">
            Phone No. : ******1234
          </Typography>
          <Typography variant = "h5">
            Email-ID : {this.state.details==null?'Default Email':this.state.details.email}
          </Typography>
        </CardContent>
      </Card>

    </CardContent>
  </Card>
)}
}

export default Personal;
