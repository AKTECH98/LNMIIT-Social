import React from "react";
import {Link} from 'react-router-dom'
import { fade, withStyles, makeStyles } from "@material-ui/core/styles";
import {frontendServerUrl} from '../WebsiteMainFiles/config'
import ReactHtmlParser from "react-html-parser";
import { postRequest } from "./CallApi";
import imageStyles from "./css/SinglePostView.module.css";
import InputBase from '@material-ui/core/InputBase';
import CommentBox from "./CommentBox.js";
import Button from "./Button";
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DislikeIcon from '@material-ui/icons/ThumbDown';
import LikeIcon from '@material-ui/icons/ThumbUp';
import ShareIcon from '@material-ui/icons/Share'
import { Card, CardHeader, CardContent, Avatar, CardActions, Collapse } from "@material-ui/core";


const CommentInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '2px solid #ced4da',
    borderRadius: 50,
    fontSize: 15,
    width: 300,
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: 'blue'
    },
  },
}))(InputBase);

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
    console.log(props)
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
        <CommentInput placeholder = "Add a comment ..." id="bootstrap-input" 
        onChange={(e)=>{this.setState({content:e.target.value})}}
        autoComplete = "off"
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
          <Avatar>
            {props.item.post_id}
          </Avatar>
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

        title = <Link to={"ProfilePage?email="+props.item.author}>{props.item.name}</Link>
        subheader={"Posted On: " + props.item.date_time_of_post}
      />
      <CardContent
        classes={{ root: classes.content }}
        className={imageStyles.image}
      >
        {parsedPost}
      </CardContent>
      { (props.fullPostView==true)
        ?
          <div>
          <CommentBox postId={props.item.post_id}/>
          </div>
        :
          <Link to={"Post?post_id="+props.item.post_id}>
            {props.item.number_of_comments}
            {(props.item.number_of_comments==1)?" Comment ":" Comments "}...
          </Link>
      }

      <CardActions classes = {{root: classes.actions}}>

      {props.item.vote==1?
        <><div className = "post--like__dislike post--active">
          <LikeIcon onClick={()=>{vote(-1)}} style = {{fontSize: 30}}/>
        </div>
        <div className = "post--count">{props.item.likes}</div>
        <div className = "post--like__dislike">
          <DislikeIcon onClick={()=>{vote(-1)}} style = {{fontSize: 30}}/>
        </div>
        <div className = "post--count">{props.item.dislikes}</div></>:

        props.item.vote==-1?
        <><div className = "post--like__dislike">
          <LikeIcon onClick={()=>{vote(+1)}} style = {{fontSize: 30}}/>
        </div>
        <div className = "post--count">{props.item.likes}</div>
        <div className = "post--like__dislike post--active">
          <DislikeIcon onClick={()=>{vote(+1)}} style = {{fontSize: 30}}/>
        </div>
        <div className = "post--count">{props.item.dislikes}</div></>:

        <><div className = "post--like__dislike">
          <LikeIcon onClick={()=>{vote(+1)}} style = {{fontSize: 30}}/>
        </div>
        <div className = "post--count">{props.item.likes}</div>
        <div className = "post--like__dislike">
          <DislikeIcon onClick={()=>{vote(-1)}} style = {{fontSize: 30}}/>
        </div>
        <div className = "post--count">{props.item.dislikes}</div></>

      }
       
        { (props.fullPostView==true)
          ?
            <div>
              <Comment postId={props.item.post_id}/>
            </div>
          :
            <Link to={"Post?post_id="+props.item.post_id}>
              View Full Post
            </Link>
        }
        
            <ShareIcon 
                style = {{fontSize: 20}}
                onClick = {()=>{
                  const el = document.createElement('textarea');
                  el.value = frontendServerUrl+"Post?post_id="+props.item.post_id;
                  document.body.appendChild(el);
                  el.select();
                  document.execCommand('copy');
                  document.body.removeChild(el);

                  var x = document.getElementById("snackbar");
                  x.className = "show";
                  setTimeout(function(){ x.className = x.className.replace("show", ""); },2000);
                }}
            />
            <div id="snackbar">Copied To Clipboard..</div>
      </CardActions>
    </Card>
  );
}
