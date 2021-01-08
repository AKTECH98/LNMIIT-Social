import React from "react";

import Button from "./Button";
import PostModal from "./PostModal";

import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";
import { isThisHour } from "date-fns";

const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    textDecoration: "none",
    height: "fitContent",
    padding: 0,
    marginBottom: 20,
    borderRadius: '50px',
    border: 'grey',
    borderStyle: 'solid',
    "&:hover":{
      
    }
  },
  rootContent: {
  },
});

export default class FeedWidget extends React.Component {
  
  constructor(props){
    super(props)
    
    this.state = {
      openModal: false,
      post: " "
    };
  }

  newPost = () => {
    this.setState({openModal: true});
  };

  discardPost = () => {
    location.reload()
  }

  addPost = (post) => {
    this.setState(() => ({
      post
    }));
  };

  render() {
    return (
      <div className = "post--add" onClick={this.newPost}>
        + Add a Post
        {
          (this.state.openModal)?
          <PostModal
            openModal={this.state.openModal}
            discardPost={this.discardPost}
            addPost={this.addPost}
          />
          :""
        }
      </div>
    );
  }
}
