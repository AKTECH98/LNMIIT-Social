import React from "react";
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { CardHeader,CardContent,Card, Avatar} from "@material-ui/core";
import { postRequest } from "./CallApi";

import Button from "./Button";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root:{
    borderTop: '1px grey solid',
    backgroundColor: 'white',
    Height: 'fit-content',
    Width: 636
  },
  title: {
    fontSize: 15,
    color: '#4574bf',
    fontColor: 'black'
  },
  subHeader: {
    borderBottom: '0.1rem solid grey',
    fontSize: 10,
    fontColor: 'black'
  },
  content: {
    Width: 636
  }
});

function SingleComment(props) {

  const classes = useStyles();

  return (
    <Card className = {classes.root}>
      <CardHeader
      classes = {{
        title: classes.title,
        subheader: classes.subHeader
      }}
      avatar = {
        <Avatar>
          Pending
        </Avatar>
      }
      title = {<Link to={"ProfilePage?email="+props.comment.author}>{props.comment.name}</Link>}
      subheader = {props.comment.date_time_of_comment}

      action = {
        (props.comment.author==window.localStorage.getItem("email"))?
          <Button
            text = "Delete"
            type = "comment--delete"
            onClick = {
              ()=>{
                postRequest(
                  "posts/deletecomment",
                  {
                    email: window.localStorage.getItem("email"),
                    password: window.localStorage.getItem("password"),
                    comment_id: props.comment.comment_id
                  },
                  (res) => {
                    if(res.message=='SUCCESS')
                    {
                      location.reload()
                    }
                  }
                )
              }
            }
          />
          :""
        } 
      />
      <CardContent classes = {{root:classes.content}}>
        {props.comment.content}
      </CardContent>
    </Card>
  )
}

export default class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      postId:props.postId,
      comments:[]
    };
  }
  componentDidMount(){
    postRequest(
      "posts/viewallcomments",
      {
        email: window.localStorage.getItem("email"),
        password: window.localStorage.getItem("password"),
        post_id: this.state.postId
      },
      (res) => {
        if(res.message=='SUCCESS')
        {
          this.setState({comments:res.results})
        }
      }
    )
  }
  render() {
    return (
      <div className = "commentBox">
        {
          (this.state.comments.length==0)?
          "No comments Be the first one to comment"
          :""
        }

        {
          this.state.comments.map((comment,index)=>(
            <div key = {index} className = "commentBox--post">
              <SingleComment comment = {comment}/>
            </div>
          ))
        }

        {
          (this.state.comments.length!=0 && !this.props.allComments)?
          <Link to = {"Post?post_id="+this.props.postId} className = "linklink post--showAll">
            SEE ALL
          </Link>:""
        }

      </div>
    );
  }
}

