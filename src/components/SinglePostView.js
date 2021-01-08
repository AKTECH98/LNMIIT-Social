import React from "react";
import {Link} from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import {frontendServerUrl} from '../WebsiteMainFiles/config'
import ReactHtmlParser from "react-html-parser";
import { postRequest } from "./CallApi";
import imageStyles from "./css/SinglePostView.module.css";
import CommentBox from "./CommentBox.js";
import Button from "./Button";

import DislikeIcon from '@material-ui/icons/ThumbDown';
import LikeIcon from '@material-ui/icons/ThumbUp';
import ShareIcon from '@material-ui/icons/Share';

import DefaultUser from "../img/DefaultUser.png";
import TextField from '@material-ui/core/TextField';
import { Card, CardHeader, CardContent, Avatar, CardActions } from "@material-ui/core";
import { Collapse } from "@material-ui/core";

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
  actions: {
    backgroundColor : 'white'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  }
}));

class Comment extends React.Component {
  constructor(props) {
    super(props);
    //console.log(props)
    this.state = {
      content:[],
      postId: props.postId
    };
  }

  render() {
    return (
      <div className = "post--comment">
        <form onSubmit = {
          (e)=>{
            e.preventDefault();
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
                  location.reload()
                }
              }
            )
          }
        }>
        <TextField
          style={{
            width: '100%',
            height: 'fitContent'
          }}
          InputProps = {{
            style: {
              color: 'black',
              fontSize: 15
            }
          }}
          variant = "outlined"
          placeholder = "Add a Comment ...."
          onChange={(e)=>{this.setState({content:e.target.value})}}
        />
        </form>
      </div>
    )
  }
}

export default function SinglePostView(props) {
  
  const classes = useStyles();
  const content = props.item.content;

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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

  const vote =(vote)=>{

    var like = document.getElementById("like")
    var dislike = document.getElementById("dislike")

    if(vote==1)
    {
      if(dislike.classList.contains("post--active"))
        dislike.classList.remove("post--active")
      
      like.classList.add("post--active")
    }
    else
    {
      if(dislike.classList.contains("post--active"))
        dislike.classList.remove("post--active")
      
      like.classList.add("post--active")
    }

    postRequest('posts/votepost',
        {
          'email':window.localStorage.getItem('email'),
          'password': window.localStorage.getItem('password'),
          'post_id': props.item.post_id,
          'vote':vote
        },
        (res)=>{
          if(res.message=="SUCCESS")
          {
            window.location.reload()
          }
        }
      )
  }
  return (
    <Card className={classes.root}>
      <CardHeader
        classes={{
          title: classes.title,
          subheader: classes.subheader,
        }}
        avatar = {
          <Avatar
          src={(props.item==null)?DefaultUser:props.item.profile_image?props.item.profile_image:DefaultUser}
          />
        }

        action = {
          (props.item.author==window.localStorage.getItem("email"))? /*Show delete only if author ==user*/
            <Button 
              text = "Delete Post"
              type = "post--delete"
              onClick = {()=>{
                  postRequest(
                    "posts/deletepost",
                    {
                      email: window.localStorage.getItem("email"),
                      password: window.localStorage.getItem("password"),
                      post_id: props.item.post_id
                    },
                    (res) => {
                      location.reload()
                    }
                  )
                }
              }
            />
          :""
        }

        title = {<Link to={"ProfilePage?email="+props.item.author}>{props.item.name}</Link>}
        subheader={"Posted On: " + props.item.date_time_of_post}
      />
      <CardContent
        classes={{ root: classes.content }}
        className={imageStyles.image}
      >
        {parsedPost}
      </CardContent>

      <CardActions classes = {{root: classes.actions}}>
        <div className = "linklink post--comment-count" 
          onClick = {handleExpandClick}
        >
          {props.item.number_of_comments}
          {(props.item.number_of_comments<=1)?" Comment ":" Comments "}
        </div>
      </CardActions>

      <Collapse in={expanded || props.fullPostView} timeout="auto" unmountOnExit>
        <CardContent>
          <CommentBox postId={props.item.post_id} allComments = {props.fullPostView}/>
        </CardContent>
      </Collapse>

      <CardActions>
        <Comment postId={props.item.post_id}/>
        <div className = "post--like__dislike">
        <LikeIcon id = "like" onClick={()=>{vote(+1)}} style = {{fontSize: 25}}/>
      </div>
      <div className = "post--count">{props.item.likes}</div>
      <div className = "post--like__dislike">
        <DislikeIcon id = "dislike" onClick={()=>{vote(-1)}} style = {{fontSize: 25}}/>
      </div>
      <div className = "post--count">{props.item.dislikes}</div>
        
      <ShareIcon 
          style = {{color: 'blue',fontSize: 25}}
          onClick = {()=>{
            const el = document.createElement('textarea');
            el.value = frontendServerUrl+"Post?post_id="+props.item.post_id;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);

            var x = document.getElementById("share--snackbar");
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); },2000);
          }}
      />
      <div id="share--snackbar">Share Link Copied</div>
      </CardActions>

    </Card>
  );
}