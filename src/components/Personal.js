import React from 'react';
import {Link} from 'react-router-dom';
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
  subRootA: {
    backgroundColor: '#20222b',
    minWidth: 500,
    minHeight: 200,
    maxHeight: 200
  },
  subRootB:{
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
    justifyContent: 'space-around'
  },
  subContent: {
    color: 'white',
    fontSize: 15
  }
});

export default function Personal(props){

  const classes = useStyles();

  return(
  <Card className = {classes.root}>
    <CardHeader 
      classes = {
        {
          root: classes.rootHeader,
          title : classes.title,
          subheader: classes.subHeader
        }
      }
      action = {
        <Link to='editProfile'>
        <Button text="EDIT" type = "button__edit" />
        </Link>
      }
      title= {props.personal==null?'Default Name': props.personal.first_name + ' ' + props.personal.middle_name + ' ' + props.personal.last_name}
    />
    <CardContent classes = {{root:classes.content}}>

      <Card className = {classes.subRootA}>
        <CardHeader
          classes = {{
            root: classes.subHeader,
            title: classes.subTitle
          }}
          title= "About"
        />
        <CardContent classes = {{root:classes.subContent}}>
          {props.personal==null?'Default Description':props.personal.profile_description}
        </CardContent>
      </Card>

      <Card className = {classes.subRootB}>
        <CardHeader
          classes = {{
            root: classes.subHeader,
            title: classes.subTitle
          }}
          title= "Contact Info."
        />
        <CardContent classes = {{root:classes.subContent}}>
          <Typography variant = "h5">
            Phone No. : {props.personal==null?'Default Phone':props.personal.phone}
          </Typography>
          <Typography variant = "h5">
            Email-ID : {props.personal==null?'Default Email':props.personal.email}
          </Typography>
        </CardContent>
      </Card>

    </CardContent>
  </Card>
)}