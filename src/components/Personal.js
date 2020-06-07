import React from 'react';

import Button from './Button';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
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
});

const Personal = (props) => (
  <Card className = {useStyles().root}>
    <CardHeader classes = {      
      {
        root: useStyles().rootHeader,
        title: useStyles().title,
        action: useStyles().action
      }
    }
      action = {
        <Button text="EDIT" type = "button__edit" />
      } 
      title= "Profile Name" 
    />
    <CardContent classes = {{ root: useStyles().content }}>
      
      <Card className = {useStyles().subRoot}>
        <CardHeader
          classes = {
            {
              root: useStyles().subHeader,
              title: useStyles().subTitle
            }
          }
          title= "About" 
        />
        <CardContent classes = {{ root: useStyles().subContent }}>
          <Typography variant = "body2" classes = {{body2: useStyles().body2}}>
            Something About ME
          </Typography>
        </CardContent>
      </Card>

      <Card className = {useStyles().subRoot}>
        <CardHeader
          classes = {
            {
              root: useStyles().subHeader,
              title: useStyles().subTitle
            }
          }
          title= "Contact Info." 
        />
        <CardContent classes = {{ root: useStyles().subContent }}>
          <Typography variant = "h5">
            Phone No. : ******1234
          </Typography>
          <Typography variant = "h5">
            Email-ID : example@gmail.com
          </Typography>
        </CardContent>
      </Card>

    </CardContent>
  </Card>
)

export default Personal;