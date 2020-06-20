import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#20222b',
    color: 'white',
    width: 250,
    height: 250
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
  rootIcon: {
    color: 'white'
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
        subheader={"Mentor: " + props.optionText.mentor}
      />
      <CardContent classes = {
        {
          root: classes.content
        }
      }>
          {props.optionText.description}
      </CardContent>
    </Card>
  );
}
