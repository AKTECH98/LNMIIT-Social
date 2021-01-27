import React from "react";
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { postRequest } from "./CallApi";

import DefaultUser from '../img/DefaultUser.jpg';
import TimeAgo from './TimeAgo';
import Button from "./Button";


class Comment extends React.Component {
  constructor(props)
  {
    super(props);
    this.state= {
      comment: props.comment,
      isDeleted:false
    }
  }

  render()
  {
    return(
      <div className = "comment">
              <Link className="linklink" to={"ProfilePage?email="+this.state.comment.author}>
                <img 
                    src={this.state.comment.profile_image?this.state.comment.profile_image:DefaultUser} 
                    alt="Avatar" 
                    className = "comment--avatar"
                />
              </Link>
              <div className = "comment__content">
                <div className = "comment--header">
                  <Link className="linklink" to={"ProfilePage?email="+this.state.comment.author}>
                    <p className = "comment--author">
                    {this.state.comment.name}
                    </p>
                  </Link>
                  <p className = "comment--date">{TimeAgo(Date.parse(this.state.comment.date_time_of_comment))}</p>
                </div>
                <div className = "comment--content">
                  {this.state.comment.content}
                </div>
                {
                  (this.state.comment.author==window.localStorage.getItem("email") && (this.props.showDelete))?
                    (this.state.isDeleted)?
                      <center><p><i className="fa fa-spinner fa-spin"></i>Deleting...</p></center>
                    :
                      <Button
                        text = "Delete Comment"
                        type = "comment--delete"
                        onClick = {
                          ()=>{
                            this.setState({isDeleted:true})
                            postRequest(
                              "posts/deletecomment",
                              {
                                email: window.localStorage.getItem("email"),
                                password: window.localStorage.getItem("password"),
                                comment_id: this.state.comment.comment_id
                              },
                              (res) => {
                                if(res.message=='SUCCESS')
                                {
                                  location.reload();
                                }
                                else
                                {
                                  this.setState({isDeleted:false})
                                }
                              }
                            )
                          }
                        }
                      />
                    :""
                }
              </div>
      </div>
    )
  }
}


export default class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      postId:props.postId,
      comments:[],
      load: true
    };
  }
  componentDidMount(){
    if(this.props.allComments)
    {
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
              this.setState({load:false})
            }
          }
        )
    }
    else
    {
        postRequest(
          "posts/viewtopcomments",
          {
            email: window.localStorage.getItem("email"),
            password: window.localStorage.getItem("password"),
            post_id: this.state.postId
          },
          (res) => {
            if(res.message=='SUCCESS')
            {
              this.setState({comments:res.results})
              this.setState({load:false})
            }
          }
        )
    }  
  }
  render() {
    return (
      <div className = "commentBox">
      {
        (this.state.load)?
        <p><div className = "loader--component"><div/><div/><div/><div/></div>Loading Comments</p>
        :
        (this.state.comments.length==0)?
          "No comments. Be the first one to comment"
        :(this.props.allComments)?
          "Showing all " + this.state.comments.length + " comments"
        : "Comments" 
      }
        

        {
          this.state.comments.map((comment,index)=>(
            <Comment key = {index} comment = {comment} showDelete = {this.props.allComments}/>
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

