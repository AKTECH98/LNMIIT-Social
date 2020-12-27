import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ReactHtmlParser from "react-html-parser";
import { postRequest } from "./CallApi";
import imageStyles from "./css/SinglePostView.module.css";

import CommentBox from "./CommentBox.js";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    border: 0.5,
    borderStyle: "solid",
    borderColor: "grey",
    height: "fit-content",
    textDecoration: "none",
    marginBottom: 10,
    color: "black",
  },
  title: {
    fontSize: 20,
  },
  subheader: {
    color: "gray",
    fontSize: 15,
  },
  content: {
    fontSize: 15,
  },
  avatar: {
    backgroundColor: "purple",
  },
  rootIcon: {
    color: "blue",
  },
}));

export default function SinglePostView(props) {
  const classes = useStyles();
  const content = props.item.content;
//  console.log(content, "content");
  var indexOfLocalhost = content.indexOf("localhost");
  //console.log(indexOfLocalhost);
  var post = "";

  if (indexOfLocalhost === -1) {
    post = content;
  } else {
    post = content.replace("localhost", "http://localhost");
  }

  const parsedPost = ReactHtmlParser(post);
 // console.log("parsedPost", parsedPost);

  return (
    <Card className={classes.root}>
      <CardHeader
        classes={{
          title: classes.title,
          subheader: classes.subheader,
        }}
        avatar={<Avatar>{props.item.initials}</Avatar>}
        title={props.item.user_name}
        subheader={"Date On: " + props.item.date_of_post}
      />
      <CardContent
        classes={{ root: classes.content }}
        className={imageStyles.image}
      >
        {parsedPost}
      </CardContent>
      <CommentBox />
    </Card>
  );
}
