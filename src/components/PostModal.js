import React from 'react';
import Modal from 'react-modal';

import Button from './Button'
import TextField from './TextField';

export default class PostModal extends React.Component {

  state = {
    post: "",
    error: false
  }

  Post = (e) => {
    const post = e.target.value;
    this.setState(() => ({post}));
  }

  PostPost = () => {
    if(this.state.post)
    {
      let myPost = this.state.post;
      this.props.addPost(myPost);
    }
    else
    {
      this.setState(()=>({error:true}));
    }
  }

  render() {
    return (
      <Modal
        isOpen={!!this.props.openModal}
        onRequestClose={this.props.discardPost}
        contentLabel="Project Details"
        className = "modal"
        ariaHideApp={false}
      >
        <div>
          Post Feed
          <Button text = "X" type = "close__button" onClick = {this.props.discardPost} />
        </div>
        <TextField
          default = "Write a Post"
          label = "Post"
          multiline
          FeildStyle = {{
            width: 275,
            marginTop: 5,
            marginBottom: 5
          }}
          inputprops = {{
            style: {
              fontWeight: 300,
              color: 'white',
              fontSize: 20
            }
          }}
          LabelStyle = {{
            style: {
              fontWeight: 500,
              color: 'white',
              fontSize: 15
            }
          }}
          Change = {this.Post}
        />
        {
          (this.state.error)?
            <div>
              Please Enter a Valid Details
            </div>
          :
          ''
        }
        <Button text = "Post" type = "button modal__button" onClick = {this.PostPost}/>
      </Modal>
    )
  }
};
