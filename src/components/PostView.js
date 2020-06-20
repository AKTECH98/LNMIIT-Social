import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
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
}));

export default function PostView() {
  return (
    <Card className = {useStyles().root}>
      <CardHeader
        classes = {{
            title: useStyles().title,
            subheader: useStyles().subheader
        }}
        avatar={
          <Avatar className = {useStyles().avatar}>
            Initials
          </Avatar>
        }
        action={
          <IconButton classes = {{root:useStyles().rootIcon}}>
            <MoreVertIcon />
          </IconButton>
        }
        title="Posted By"
        subheader="Date of Post"
      />
      <CardContent classes = {{root: useStyles().content}}>
        Post Content
      </CardContent>
    </Card>
  );
}