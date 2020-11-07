import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'white',
    height: 'fit-content'
  },
  rootHeader: {
    borderBottom: '0.3rem solid grey',
    height: 'fit-content'
  },
  subRootA: {
    backgroundColor: 'white',
    minWidth: 500,
    minHeight: 200,
    maxHeight: 200
  },
  subRootB:{
    backgroundColor: 'white',
    minHeight: 200,
    maxHeight: 200
  },
  subHeader: {
    borderBottom: '0.1rem solid grey'
  },
  title: {
    fontSize: 30,
    color: '#4574bf',
    fontWeight: 700,
    fontFamily: 'cursive'
  },
  subTitle: {
    fontSize: 20,
    color: '#4574bf',
    fontWeight: 500
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  subContent: {
    color: '#4574bf',
    fontSize: 15
  },
  rootIcon: {
    color: 'blue'
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
        <IconButton classes = {{root: classes.rootIcon}}>
        {
          (props.veiw)?"":<MoreVertIcon />
        }
        </IconButton>
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