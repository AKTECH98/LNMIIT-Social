import React from "react";

import { postRequest } from "./CallApi";
import SinglePostView from "./SinglePostView";

export default class PostView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: props.author, 
      posts: [],
      load: true
    };
  }
  componentDidMount()
  {
    while(this.state.author === undefined);
    if(this.state.author == "ALL")
    {postRequest(
      "posts/viewallposts",
      {
        email: window.localStorage.getItem("email"),
        password: window.localStorage.getItem("password"),
      },
      (res) => {
        this.setState({ posts: res.results });
        this.setState({load:false})
      }
    )}
    else
    {postRequest(
      "posts/viewallpostsofauser",
      {
        email: window.localStorage.getItem("email"),
        password: window.localStorage.getItem("password"),
        author: this.state.author,
      },
      (res) => {
        this.setState({ posts: res.results });
        this.setState({load:false})
      }
    )}
    //console.log("STATE:",this.state)
  }
  render() {
    
    return (
      <div>
        {
          (this.state.posts == undefined)? ""
          :
            (this.state.load)?
              <center><div className = "center loader"></div></center>
            :
              (this.state.posts.length==0)?
                <div>
                  <center>
                  {this.state.author=="ALL"?<i>Nobody has posted anything yet. Be the first one to post</i>:
                  (this.state.author==window.localStorage.email)?<i>You have not yet posted</i>:
                  <i>This user has not yet posted</i>
                  }
                  </center>
                </div> 
              :  
                this.state.posts.map((item, index) => (
                  <div key={index}>
                    <SinglePostView item={item} fullPostView = {false} />
                  </div>
                ))
        }
      </div>
    );
  }
}
