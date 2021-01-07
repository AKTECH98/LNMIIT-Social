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
/*
const FeedWidgetView = (props) => (
  <Card className={useStyles().root}>
    <CardContent classes={{ root: useStyles().rootContent }}>
      <Button text="+ Write a Post" type="post__button" onClick={props.newPost} />
      {
        (props.openModal)?
        <PostModal
          openModal={props.openModal}
          discardPost={props.discardPost}
          addPost={props.addPost}
        />
        :""
      }
    </CardContent>
  </Card>
);*/

export default class FeedWidget extends React.Component {
  state = {
    openModal: false,
    openImageUploadModal: false,
    post: " ",
    file: "",
    imagePreviewUrl: "",
  };

  newPost = () => {
    this.setState(() => ({
      openModal: true,
    }));
  };

  discardPost = () => {
    this.setState(() => ({
      openModal: false,
    }));
  };

  addPost = (post) => {
    this.setState(() => ({
      post,
      openModal: false,
    }));
  };
  imageChange = (e) => {
    e.preventDefaule();
    let reader = new FileReader();
    e.targer.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };
  imageUpload = () => {
    this.setState(() => ({
      openImageUploadModal: true,
    }));
  };

  onDrop = (files) => {
    const reader = new FileReader();
    let file = files[0];

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onloadend = () => {
      //console.log("reader result", reader.result);
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });

      // console.log(binaryStr)
    };
    reader.readAsDataURL(file);

    // console.log(files);
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
