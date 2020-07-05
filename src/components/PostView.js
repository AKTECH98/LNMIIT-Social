import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {postRequest} from './CallApi';
import {Redirect} from 'react-router-dom';
/*const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#20222b',
    height: 'fit-content',
    textDecoration: 'none',
    marginBottom: 20,
    color: 'white'
  },
  title: {
    fontSize : 20
  },
  subheader: {
    color: 'gray',
    fontSize : 15
  },
  content: {
    fontSize: 15
  },
  avatar:{
    backgroundColor: 'purple'
  },
  rootIcon: {
    color: 'white'
  },
}));*/

export default class PostView extends React.Component{
  constructor(props)
  {
    super(props)
    this.state = {
      posts:[{email:'default@lnmiit.ac.in', content:'Dummy Post for debugging', date_of_post:'Default Date'}]
    }
  }

  render(){
    postRequest('posts/fetchposts',
                               {
                                 'email':window.localStorage.getItem('email'),
                                 'password':window.localStorage.getItem('password')
                               },
                               (res)=>{this.setState({posts:res.results})}
                )
  return (
    <div>
    {this.state.posts==undefined?'':this.state.posts.map(item=>
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            {item.initials}
          </Avatar>
        }
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={"Posted By: "+ item.email}
        subheader={"Date On: "+item.date_of_post}
      />
      <CardContent>
        {item.content}
      </CardContent>
    </Card>
  )}
    </div>
  )}
}
