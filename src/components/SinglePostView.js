import React from "react";

import { fade, withStyles, makeStyles } from "@material-ui/core/styles";

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
                      alert("replace this alert with screen refresh and add confirm dialogue")
                    }
                  )
                }
              }
            />
          :""
        }

        title = {props.item.author}
        subheader={"Posted On: " + props.item.date_time_of_post}
      />
      <CardContent
        classes={{ root: classes.content }}
        className={imageStyles.image}
      >
        {parsedPost}
      </CardContent>
      
      <CardActions disableSpacing>
        {expanded? "Hide comments":"Show comments"}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon style = {{color: 'black', fontSize: 30}}/>
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <CommentBox postId={props.item.post_id}/>
        </CardContent>
      </Collapse>

      <CardActions classes = {{root: classes.actions}}>
        <div className = "post--like__dislike post--active">
          <LikeIcon onClick = {(event) => console.log(event.style)} style = {{fontSize: 30}}/>
        </div>
        <div className = "post--count">100</div>
        <div className = "post--like__dislike">
          <DislikeIcon style = {{fontSize: 30}}/>
        </div>
        <div className = "post--count">100</div>
          <Comment postId={props.item.post_id}/>
      </CardActions>
    </Card>
  );
}
