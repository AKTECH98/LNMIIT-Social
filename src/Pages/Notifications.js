import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {postRequest} from '../components/CallApi'
import Header from '../components/Header';
import { Card, CardContent, CardHeader, Avatar } from '@material-ui/core';

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

    postRequest('profile/getnotifications',
      {
        'email':window.localStorage.getItem('email'),
        'password': window.localStorage.getItem('password'),
      },
      (res)=>{
        if(res.message=="SUCCESS")
        {
          this.setState({notifications: res.notifications})
        }
      }
    )
  }

  render(){
    return (
      <div>
        <Header logout = {true} />
        <div className = "notify">
        <div>
        </div>
        <NotificationPannel Notifications = {this.state.notifications}/>
        <div>
        </div>
        </div>
      </div>
    )
  }
}