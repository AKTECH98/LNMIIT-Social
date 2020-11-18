import React from "react";

import { postRequest } from "./CallApi";
import SinglePostView from "./SinglePostView";

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
    postRequest(
      "posts/fetchposts",
      {
        email: window.localStorage.getItem("email"),
        password: window.localStorage.getItem("password"),
      },
      (res) => {
        this.setState({ posts: res.results });
      }
    );
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
