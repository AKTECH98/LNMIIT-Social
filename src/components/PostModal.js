import React from 'react';
import Modal from 'react-modal';
import {Redirect} from 'react-router-dom';
import Button from './Button'
import TextField from './TextField';
import {postRequest} from './CallApi'

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
      var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;
      postRequest('posts/submitpost',
                                 {
                                   'email':window.localStorage.getItem('email'),
                                   'password':window.localStorage.getItem('password'),
                                   'content':this.state.post,
                                   'dateOfPost':[year, month, day].join('-')
                                 },
                                 (res)=>{
                                   if(res.message=="SUCCESS")
                                   {

                                    <Redirect to='/home'/>
                                   }
                                   else {
                                    {
                                        window.alert(res)
                                        console.log(res)
                                    }
                                   }
                                 }
                  )
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
          default = ""
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
              Please Enter some details. Post cannot be blank
            </div>
          :
          ''
        }
        <Button text = "Post" type = "button modal__button" onClick = {this.PostPost}/>
      </Modal>
    )
  }
};
