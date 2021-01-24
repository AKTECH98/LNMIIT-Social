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
import TimeAgo from './TimeAgo';
import DefaultUser from "../img/DefaultUser.jpg";
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
      content:"",
      postId: props.postId
    };
  }

  render() {
    return (
      <div className = "post--comment">
        <form onSubmit = {
          (e)=>{
            e.preventDefault();
            if(this.state.content!="")
            {
                this.setState({content:""})
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
                      this.props.onAddComment()
                    }
                  }
                )
            }
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
          value = {this.state.content}
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
  const [vote, setVote] = React.useState(props.item.vote);
  const [likes, setLikes] = React.useState(props.item.likes)
  const [dislikes, setDislikes] = React.useState(props.item.dislikes)
  const [isDeleted, setIsDeleted] = React.useState(false)
  const [refreshCommentBoxCount, setRefreshCommentBoxCount] = React.useState(0)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onAddComment = ()=>{
    setRefreshCommentBoxCount(refreshCommentBoxCount+1)
  }
  
  //  console.log(content, "content");
  var indexOfLocalhost = content.indexOf("lnmiitsocial-backend.herokuapp.com");
  //console.log(indexOfLocalhost);
  var post = "";

  if (indexOfLocalhost === -1) {
    post = content;
  } else {
    post = content.replace("lnmiitsocial-backend.herokuapp.com", "https://lnmiitsocial-backend.herokuapp.com");
  }

  const parsedPost = ReactHtmlParser(post);
 // console.log("parsedPost", parsedPost);

  const make_vote =(v,l,d)=>{

    postRequest('posts/votepost',
        {
          'email':window.localStorage.getItem('email'),
          'password': window.localStorage.getItem('password'),
          'post_id': props.item.post_id,
          'vote':v
        },
        (res)=>{
          if(res.message=="SUCCESS")
          {
            console.log(v,l,d)
            setVote(v)
            setLikes(likes+l)
            setDislikes(dislikes+d)
          }
        }
      )
  }
  if(isDeleted) return ""
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
          (props.item.author==window.localStorage.getItem("email") && (props.fullPostView))? /*Show delete only if author ==user*/
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
                      setIsDeleted(true)
                    }
                  )
                }
              }
            />
          :""
        }

        title = {<Link className="linklink" to={"ProfilePage?email="+props.item.author}>{props.item.name}</Link>}
        subheader={TimeAgo(Date.parse(props.item.date_time_of_post))}
      />
      {
        !(props.fullPostView)
        ?<Link to = {"Post?post_id="+props.item.post_id} className="linklink">
          <CardContent
            classes={{ root: classes.content }}
            className={imageStyles.image}
          >
            {parsedPost}
          </CardContent>
        </Link>
        :<CardContent
            classes={{ root: classes.content }}
            className={imageStyles.image}
          >
            {parsedPost}
          </CardContent>
      }


      <CardActions>
        <Comment postId={props.item.post_id} onAddComment={onAddComment}/>
        {
          (vote==1)
          ?<div className = "post--like__dislike post--active">
              <LikeIcon onClick={()=>{make_vote(0,-1,0)}} style = {{fontSize: 25}}/>
           </div>
          :(vote==-1)
          ?<div className = "post--like__dislike">
              <LikeIcon onClick={()=>{make_vote(+1,1,-1)}} style = {{fontSize: 25}}/>
           </div>
          :<div className = "post--like__dislike">
              <LikeIcon onClick={()=>{make_vote(+1,1,0)}} style = {{fontSize: 25}}/>
           </div>
        }
      <div className = "post--count">{likes}</div>
      {
          (vote==-1)
          ?<div className = "post--like__dislike post--active">
              <DislikeIcon onClick={()=>{make_vote(0,0,-1)}} style = {{fontSize: 25}}/>
           </div>
          :(vote==1)
          ?<div className = "post--like__dislike">
              <DislikeIcon onClick={()=>{make_vote(-1,-1,1)}} style = {{fontSize: 25}}/>
           </div>
          :<div className = "post--like__dislike">
              <DislikeIcon onClick={()=>{make_vote(-1,0,1)}} style = {{fontSize: 25}}/>
           </div>
      }
      <div className = "post--count">{dislikes}</div>
        
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
      
      <hr/>
        <CardContent>
          <CommentBox key={refreshCommentBoxCount} postId={props.item.post_id} allComments = {props.fullPostView}/>
        </CardContent>
    </Card>
  );
}