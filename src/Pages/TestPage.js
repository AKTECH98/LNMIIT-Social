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
  }
}));

export default function RecipeReviewCard() {
  const classes = useStyles();

  return (
    <div className = "Widget__View">
    <Card className={classes.root}>
      <CardHeader classes={
        {
          title : classes.title,
          subheader : classes.subheader
        }
      }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="LNMIIT Social"
        subheader="Mentor: Mr Vikas Bajpai"
      />
      <CardContent classes = {
        {
          root: classes.content
        }
      }>
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
      </CardContent>
    </Card>
    <Card className={classes.root}>
      <CardHeader classes={
        {
          title : classes.title,
          subheader : classes.subheader
        }
      }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="LNMIIT Social"
        subheader="Mentor: Mr Vikas Bajpai"
      />
      <CardContent classes = {
        {
          root: classes.content
        }
      }>
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
      </CardContent>
    </Card>
    <Card className={classes.root}>
      <CardHeader classes={
        {
          title : classes.title,
          subheader : classes.subheader
        }
      }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="LNMIIT Social"
        subheader="Mentor: Mr Vikas Bajpai"
      />
      <CardContent classes = {
        {
          root: classes.content
        }
      }>
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
      </CardContent>
    </Card>
    <Card className={classes.root}>
      <CardHeader classes={
        {
          title : classes.title,
          subheader : classes.subheader
        }
      }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="LNMIIT Social"
        subheader="Mentor: Mr Vikas Bajpai"
      />
      <CardContent classes = {
        {
          root: classes.content
        }
      }>
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
      </CardContent>
    </Card>
    <Card className={classes.root}>
      <CardHeader classes={
        {
          title : classes.title,
          subheader : classes.subheader
        }
      }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="LNMIIT Social"
        subheader="Mentor: Mr Vikas Bajpai"
      />
      <CardContent classes = {
        {
          root: classes.content
        }
      }>
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
      </CardContent>
    </Card>
    <Card className={classes.root}>
      <CardHeader classes={
        {
          title : classes.title,
          subheader : classes.subheader
        }
      }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="LNMIIT Social"
        subheader="Mentor: Mr Vikas Bajpai"
      />
      <CardContent classes = {
        {
          root: classes.content
        }
      }>
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
      </CardContent>
    </Card>
    <Card className={classes.root}>
      <CardHeader classes={
        {
          title : classes.title,
          subheader : classes.subheader
        }
      }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="LNMIIT Social"
        subheader="Mentor: Mr Vikas Bajpai"
      />
      <CardContent classes = {
        {
          root: classes.content
        }
      }>
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
      </CardContent>
    </Card>
    <Card className={classes.root}>
      <CardHeader classes={
        {
          title : classes.title,
          subheader : classes.subheader
        }
      }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="LNMIIT Social"
        subheader="Mentor: Mr Vikas Bajpai"
      />
      <CardContent classes = {
        {
          root: classes.content
        }
      }>
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
      </CardContent>
    </Card>
    </div>
  );
}
