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

import TextField from '@material-ui/core/TextField';
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

class Comment extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      content:[],
      postId: props.postId
    };
  }
  render() {
    return (
      <div>
        <TextField
            defaultValue={this.state.content}
            onChange={(e)=>{this.setState({content:e.target.value})}}
            label='Comment'
        />
        <button onClick={()=>{
          postRequest(
            "posts/createcomment",
            {
              email: window.localStorage.getItem("email"),
              password: window.localStorage.getItem("password"),
              content: this.state.content,
              post_id: this.state.postId
            },
            (res) => {
              if(res.message=='SUCCESS')
              {
                alert("REfresh screen instead of alert")
              }
            }
          )
        }}
        >Comment</button>
      </div>
    )
  }
}

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
        avatar={<Avatar>{props.item.post_id}</Avatar>}
        title=<span>{props.item.author}
              {(props.item.author==window.localStorage.getItem("email"))? /*Show delete only if author ==user*/
                <button 
                  style={{float:'right'}}
                  onClick={()=>{
                    postRequest(
                      "posts/deletepost",
                      {
                        email: window.localStorage.getItem("email"),
                        password: window.localStorage.getItem("password"),
                        post_id: props.item.post_id
                      },
                      (res) => {
                        alert("replace this alert with screen refresh and add confirm dialogue")
                      }
                    )
                  }}
                >
                    Delete
                </button>
              :""
              }
              </span>
        subheader={"Posted On: " + props.item.date_time_of_post}
      />
      <CardContent
        classes={{ root: classes.content }}
        className={imageStyles.image}
      >
        {parsedPost}
      </CardContent>
      <Comment postId={props.item.post_id}/>
      <CommentBox postId={props.item.post_id}/>
    </Card>
  );
}
