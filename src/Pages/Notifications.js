import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {postRequest} from '../components/CallApi'
import Header from '../components/Header';
import Button from '../components/Button';
import { Card, CardContent, CardHeader, Avatar ,CardActions} from '@material-ui/core';

import LoginContext from '../contexts/LoginContext';

const url = window.location.href;
const parser = require('url-parameter-parser');
const res = parser(url);const search_term = (res.search==undefined)?"":res.search

const useStyles = makeStyles({
  root: {
    backgroundColor: '#f5aa0a',
    minWidth: '50%',
    height: 'fit-content',
  },
  subRoot: {
    backgroundColor: '#f5f5f5',
    marginBottom: 5
  },
  pageTitle: {
    fontSize: 30,
    fontFamily: 'cursive'
  },
  title: {
    fontSize : 18,
    fontFamily: 'cursive'
  },
  subheader: {
    color: 'gray',
    fontSize : 12,
    fontFamily: 'cursive',
    borderBottom: '0.1rem solid grey'
  },
  content: {
    fontSize: 15
  },
  action: {
    borderTopStyle: 'solid',
    borderTopColor: '#4574bf',
    display: 'flex',
    justifyContent: 'space-between'
  }
});

function NotificationPannel(props){

  const classes = useStyles();
  return(
    <Card className = {classes.root}>
      <CardHeader
        classes = {
          {
            title : classes.pageTitle
          }
        }
        title = "Notificatons"
      />
      <CardContent>
      { 
        props.Notifications.map((notify,index)=>
            <div key = {index}>
              {//I have passed it as an prop but make it a type taken from notifications itself
                (props.request==true)?
                <Card className = {classes.subRootRequest}>
                <CardHeader
                  classes = {
                  {
                    title : classes.title,
                    subheader : classes.subheader
                  }}
                  title = "Colaboration Request"
                  subheader = "Date when the Request is Generated"
                  />
                  <CardContent classes = {{root: classes.content}}>
                    You have recieved a request from this user to collaborate of your Project Title/
                    This user wants to join your team for this hackathon
                  </CardContent>
                  <CardActions classes = {{root: classes.action}}>
                    <Button text = "Accept" type = "request__button"/>
                    <Button text = "Reject" type = "request__button"/>
                  </CardActions>
                </Card>
                :
                <Card className = {classes.subRoot}>
                  <CardHeader
                    classes = {
                    {
                      title : classes.title,
                      subheader : classes.subheader
                    }}
                    avatar={
                      <Avatar>
                      </Avatar>
                    }
                    title = "Project Added/Hack Added"
                    subheader = "Date When It was Posted"
                  />
                  <CardContent classes = {{root: classes.content}}>
                    {notify}{/*Description of The Project*/}
                  </CardContent>
                </Card>
              }
            </div>
        )
      }
      </CardContent>
    </Card>
  )
}

export default class NotificationsPage extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      notifications: []
    }

  }

  render(){
    return (
    <LoginContext.Consumer>
      {(loginData)=>{return (
      <div>
      {
        postRequest('profile/getnotifications',
            {
              'email':loginData.email,
              'password': loginData.password,
            },
            (res)=>{
              if(res.message=="SUCCESS")
              {
                this.setState({notifications: res.notifications})
              }
            }
          )
        }
      }
        <Header logout = {true} />
        <div className = "notify">
        <div>
        </div>
        <NotificationPannel Notifications = {this.state.notifications} request = {true} />
        <div>
        </div>
        </div>
      </div> )}}
    </LoginContext.Consumer>
    )
  }
}