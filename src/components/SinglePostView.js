import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
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

export default function SinglePostView(props){
	const classes = useStyles();

	return(
		<Card className={classes.root}>
		<CardHeader 
			classes = {
			{
				title : classes.title,
				subheader : classes.subheader
			}}
      avatar={
        <Avatar>
          {props.item.initials}
        </Avatar>
      }
      action={
				<IconButton classes = {{root:classes.rootIcon}}>
          <MoreVertIcon />
        </IconButton>
      }
      title={"Posted By: " + props.item.email}
      subheader={"Date On: " + props.item.date_of_post}
    />
    <CardContent classes = {{root: classes.content}}>
      {props.item.content}
    </CardContent>
  	</Card>
	)
}