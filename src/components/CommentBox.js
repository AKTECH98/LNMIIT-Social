import React from "react";

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
      title = {props.comment.author}
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
                      alert("refresh screen instead of alert")
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
          this.state.comments.map((comment,index)=>
            <div key = {index} className = "commentBox--post">
              <SingleComment comment = {comment}/>
            </div>
          )
        }
      </div>
    );
  }
}


/*
export default class CommentBox extends React.Component {
  constructor() {
    super();

    this.state = {
      liked: false,
      showComments: false,
      comments: [
        {
          id: 1,
          author: "hello",
          body: "This is my first comment on this forum.",
        },
        {
          id: 2,
          author: "olleh",
          body:
            "That's a mighty fine comment you've got there my good looking fellow...",
        },
        {
          id: 3,
          author: "rosco",
          body: "What is the meaning of all of this 'React' mumbo-jumbo?",
        },
      ],
    };
  }

  _toggleLike = () => {
    let Liked = this.state.liked;
    Liked = !Liked;
    this.setState({ liked: Liked });
  };

  _addComment(author, body) {
    const comment = {
      id: this.state.comments.length + 1,
      author,
      body,
    };
    this.setState({ comments: this.state.comments.concat([comment]) });
  }

  _handleClick() {
    this.setState({
      showComments: !this.state.showComments,
    });
  }

  _getComments() {
    return this.state.comments.map((comment) => {
      return (
        <Comment author={comment.author} body={comment.body} key={comment.id} />
      );
    });
  }

  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return "No comments yet";
    } else if (commentCount === 1) {
      return "1 comment";
    } else {
      return `${commentCount} comments`;
    }
  }

  render() {
    const comments = this._getComments();
    let commentNodes;
    let buttonText = this._getCommentsTitle(comments.length);

    return (
      <div className='comment-box'>
        <div
          className='container'
          style={{
            border: "1px solid black",
            width: "15%",
            margin: "0",
            display: "flex",
          }}
          onClick={() => this._toggleLike()}
        >
          {this.state.liked === false ? <div>Like</div> : <div>unLike</div>}

          <button id='comment-reveal' onClick={this._handleClick.bind(this)}>
            {buttonText}
          </button>
        </div>

        <div className='comments'> {commentNodes}</div>
        {this.state.showComments ? (
          ""
        ) : (
          <CommentForm addComment={this._addComment.bind(this)} />
        )}
      </div>
    );
  }
}

class CommentForm extends React.Component {
  _handleSubmit(event) {
    event.preventDefault();
    let author = this._author;
    let body = this._body;
    this.props.addComment(author.value, body.value);
  }
  render() {
    return (
      <form className='comment-form' onSubmit={this._handleSubmit.bind(this)}>
        <div className='comment-form-fields'>
          <textarea
            placeholder='Write a Comment ...'
            rows='1'
            required
            ref={(textarea) => (this._body = textarea)}
          ></textarea>
          <button className='comment-submit' type='submit'>
            Post
          </button>
        </div>
      </form>
    );
  }
}
*/