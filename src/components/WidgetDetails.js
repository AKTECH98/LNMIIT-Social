import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    color: '#4574bf',
    width: 250,
    height: 250
  },
  title: {
    color: '#4574bf',
    fontSize : 20
  },
  subheader: {
    color: '#4574bf',
    color: 'gray',
    fontSize : 15
  },
  content: {
    fontSize: 15
  },
  rootIcon: {
    color: 'blue'
	},
}));

export default function Details(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader classes={
        {
          title : classes.title,
          subheader : classes.subheader
        }
      }
        action={
          <IconButton classes = {{root: classes.rootIcon}}>
            <MoreVertIcon />
          </IconButton>
        }
        title={props.optionText.title}
        subheader={<div>
          <em>{'Total Members: ' + props.optionText.member}</em>
        </div>}
      />
      <CardContent classes = {
        {
          root: classes.content
        }
      }>
          {"Mentor: " + props.optionText.mentor}
          <hr/>
          {"Skills needed: " + props.optionText.requirements}
          <hr/>
          {props.optionText.description}
      </CardContent>
    </Card>
  );
}
