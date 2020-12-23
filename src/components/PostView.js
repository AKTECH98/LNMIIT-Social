import React from "react";

import { postRequest } from "./CallApi";
import SinglePostView from "./SinglePostView";

import LoginContext from '../contexts/LoginContext';

export default class PostView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {
          user_name: "default name",
          content: "Dummy Post for debugging",
          date_of_post: "Default Date",
        },
      ],
    };
  }

  render() {
    
    return (
      <LoginContext.Consumer>
      {(loginData)=>{return (
      <div>
      {
        postRequest(
          "posts/fetchposts",
          {
            email: loginData.email,
            password: loginData.password,
          },
          (res) => {
            this.setState({ posts: res.results });
          }
        )
      }
        {this.state.posts == undefined
          ? ""
          : this.state.posts.map((item, index) => (
              <div key={index}>
                <SinglePostView item={item} />
              </div>
            ))}
      
      </div>)}}
    </LoginContext.Consumer>
    );
  }
}
