import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  Avatar,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    height: "fit-content",
    textAlign: 'center',
    marginTop: '1.5rem'
  },
  rootHeader: {
    height: "fit-content",
    display: 'flex',
    flexDirection:'column'
  },
  subInfo: {
    borderBottom: "0.1rem solid grey",
    fontSize: 12,
    fontColor: "black",
  },
  title: {
    fontSize: 20,
    color: "#4574bf",
    fontWeight: 700,
    fontFamily: "cursive",
  },
  media: {
    height: 100,
    backgroundColor: '#DC143C'
  },
  avatar: {
    margin: "-65px auto 0",
    width: 90,
    height: 90,
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
    position: "relative",
  },
}));

export default function ProfileWidget(props) {
  const classes = useStyles();

  return(
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
      />
      <CardHeader
        classes={{
          root: classes.rootHeader,
          title: classes.title,
          subheader: classes.subInfo,
        }}
        avatar={
          <Avatar
            alt='Profile Picture'
            src='https://material-ui.com/static/images/cards/contemplative-reptile.jpg'
            className={classes.avatar}
          />
        }
        title={props.personal == null ? "Default Name" : props.personal.name}
        subheader={props.personal == null ? "Member of LNMIIT" : props.personal.headline}
      />
    </Card>
  )
}