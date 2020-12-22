import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Avatar,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import Button from "./Button";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    height: "fit-content",
    minWidth: 425,
  },
  rootHeader: {
    height: "fit-content",
  },
  subInfo: {
    borderBottom: "0.1rem solid grey",
    fontSize: 12,
    fontColor: "black",
  },
  title: {
    fontSize: 40,
    color: "#4574bf",
    fontWeight: 700,
    fontFamily: "cursive",
  },
  content: {
    color: "#4574bf",
    fontSize: 15,
    height: "fit-content",
  },
  contenDistinguish: {
    textAlign: "center",
    backgroundColor: "#009999",
    fontSize: 15,
    color: "white",
    height: "fit-content",
    paddingTop: 25,
    opacity: 0.9,
  },
  rootIcon: {
    color: "blue",
  },
  media: {
    height: 250,
  },
  avatar: {
    margin: "-100px auto 0",
    width: 125,
    height: 125,
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
    position: "relative",
    zIndex: 5,
  },
  "@media (max-width: 768px)": {
    root: { minWidth: "70vw" },
    content: { flexDirection: "column", width: "90vw", padding: "6px" },
    subRootB: { marginLeft: 0, marginTop: 10, minWidth: "10vw" },
    subRootA: { minWidth: "10vw" },
  },
}));

export default function Personal(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image='https://material-ui.com/static/images/cards/contemplative-reptile.jpg'
        title='Profile Picture'
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
        action={
          props.view ? (
            ""
          ) : (
            <div className='tooltip'>
              <Link to={"EditProfile"} className='linklink'>
                <IconButton disabled={props.view}>
                  <EditTwoToneIcon style={{ fontSize: 25, color: "blue" }} />
                </IconButton>
              </Link>
              <span className='tooltiptext edit'>EDIT</span>
            </div>
          )
        }
        title={
          props.personal == null
            ? "Default Name"
            : props.personal.first_name + " " + props.personal.last_name
        }
        subheader={props.personal == null ? "" : props.personal.headline}
      />
      <CardContent classes={{ root: classes.content }}>
        {props.personal == null
          ? "Default Description"
          : props.personal.profile_description}
      </CardContent>
      <CardContent classes={{ root: classes.contenDistinguish }}>
        {props.personal == null ? "" : props.year + "  (" + props.batch + ")"}
      </CardContent>
    </Card>
  );
}
