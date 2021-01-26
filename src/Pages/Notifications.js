import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {postRequest} from '../components/CallApi'
import Header from '../components/Header';
import Button from '../components/Button';
import { Card, CardContent, CardHeader, Avatar ,CardActions} from '@material-ui/core';

const url = window.location.href;
const parser = require('url-parameter-parser');
const res = parser(url);

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
  subRootRequest: {
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
                    {notify.message}
                  </CardContent>
                  <CardActions classes = {{root: classes.action}}>
                    <a href={notify.link}><Button text = "Take me there" type = "request__button"/></a>
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

  componentDidMount()
  {
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
        <NotificationPannel Notifications = {this.state.notifications} request = {true} />
        <div>
        </div>
        </div>
      </div>
    )
  }
}