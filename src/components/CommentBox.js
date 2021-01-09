import React from "react";
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { postRequest } from "./CallApi";

import DefaultUser from '../img/DefaultUser.png';
import TimeAgo from './TimeAgo';
import Button from "./Button";

export default class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      postId:props.postId,
      comments:[],
      load: true
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
          this.setState({load:false})
        }
      }
    )
  }
  render() {
    return (
      <div className = "commentBox">
      {
        (this.state.load)?
        <p><i className="fa fa-spinner fa-spin"></i>Loading Comments</p>
        :
        (this.state.comments.length==0)?
          "No comments Be the first one to comment"
          :""
      }
        

        {
          this.state.comments.map((comment,index)=>(
            <div key = {index} className = "comment">
              <Link to={"ProfilePage?email="+comment.author}>
                <img 
                    src={comment.profile_image?comment.profile_image:DefaultUser} 
                    alt="Avatar" 
                    className = "comment--avatar"
                />
              </Link>
              <div className = "comment__content">
                <div className = "comment--header">
                  <Link to={"ProfilePage?email="+comment.author}>
                    <p className = "comment--author">
                    {comment.name}
                    </p>
                  </Link>
                  <p className = "comment--date">{TimeAgo(Date.parse(comment.date_time_of_comment))}</p>
                </div>
                <div className = "comment--content">
                  {comment.content}
                </div>
                {
                (comment.author==window.localStorage.getItem("email"))?
                  <Button
                    text = "Delete Comment"
                    type = "comment--delete"
                    onClick = {
                      ()=>{
                        postRequest(
                          "posts/deletecomment",
                          {
                            email: window.localStorage.getItem("email"),
                            password: window.localStorage.getItem("password"),
                            comment_id: comment.comment_id
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
              </div>
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

