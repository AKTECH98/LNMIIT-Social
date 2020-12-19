import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList'

import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  menuroot: {
    color: 'black',
    fontSize: 12
  },
  root: {
    backgroundColor: 'white',
    height: 'fit-content',
    minWidth: 850
  },
  rootHeader: {
    height: 'fit-content'
  },
  subHeader: {
    fontSize: 15,
    fontColor: 'black'
  },
  subRootA: {
    backgroundColor: 'white',
    minWidth: 400,
    Height: 'fit-content',
    marginRight: 10
  },
  subRootB:{
    backgroundColor: 'white',
    Height: 'fit-content',
    minWidth: 200,
    marginLeft: 10
  },
  subInfo: {
    borderBottom: '0.1rem solid grey',
    fontSize: 12,
    fontColor: 'black'
  },
  title: {
    fontSize: 40,
    color: '#4574bf',
    fontWeight: 700,
    fontFamily: 'cursive'
  },
  subTitle: {
    fontSize: 25,
    color: '#4574bf',
    fontWeight: 400
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  subContent: {
    color: '#4574bf',
    fontSize: 15,
    marginBottom: 5
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
          subheader: classes.subInfo
        }
      }

      action={
        (props.view)?
        ""
        :
        <div>
          <Link to={'EditProfile'} className = "linklink">
            <IconButton disabled = {props.view}>
              <EditTwoToneIcon style = {{ fontSize: 25, color: "blue" }} />
            </IconButton>
          </Link>
        </div>
      }  
      
      title= {props.personal==null?'Default Name': props.personal.first_name + ' ' + props.personal.middle_name + ' ' + props.personal.last_name}
      subheader = "Competitive Coder/Designer/Machine Learning"
    />
    <CardContent classes = {{root:classes.content}}>

      <Card className = {classes.subRootA}>
        <CardHeader
          classes = {{
            root: classes.subHeader,
            title: classes.subTitle,
            subheader: classes.subInfo
          }}
          title= "About"
          subheader = "1st/2nd/3rd/4th Year/Alumni (Y16 Batch)"
        />
        <CardContent classes = {{root:classes.subContent}}>
          {props.personal==null?'Default Description':props.personal.profile_description}
        </CardContent>
      </Card>

      <Card className = {classes.subRootB}>
        <CardHeader
          classes = {{
            root: classes.subHeader,
            title: classes.subTitle,
            subheader: classes.subInfo
          }}
          title= "Contact Info. & Links"
          subheader = "."
        />
        <CardContent classes = {{root:classes.subContent}}>
          <Typography variant = "h5">
            Phone No.  : {props.personal==null?'Default Phone':props.personal.phone}
          </Typography>
          <Typography variant = "h5">
            Email-ID   : {props.personal==null?'Default Email':props.personal.email}
          </Typography>
          <Typography variant = "h5">
            Linkdin    : none
          </Typography>
          <Typography variant = "h5">
            Github     : none
          </Typography>
          <Typography variant = "h5">
            Codechef   : none
          </Typography>
          <Typography variant = "h5">
            Codeforces : none
          </Typography>
          <Typography variant = "h5">
            Other      : none
          </Typography>
        </CardContent>
      </Card>

    </CardContent>
  </Card>
)}
