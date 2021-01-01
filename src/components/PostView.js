import React from "react";

import { postRequest } from "./CallApi";
import SinglePostView from "./SinglePostView";

export default class PostView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
      ],
    };
  }
  componentDidMount()
  {
    postRequest(
      "posts/viewallposts",
      {
        email: window.localStorage.getItem("email"),
        password: window.localStorage.getItem("password"),
      },
      (res) => {
        this.setState({ posts: res.results });
      }
    )
  }
  render() {
    
    return (
      <div>
        {this.state.posts == undefined
          ? ""
          : this.state.posts.map((item, index) => (
              <div key={index}>
                <SinglePostView item={item} />
              </div>
            ))}
      </div>
    );
  }
}
