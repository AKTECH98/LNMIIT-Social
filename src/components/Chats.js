import React from "react";
import {postRequest} from '../components/CallApi'
import TextField from '@material-ui/core/TextField';
//TODO: Add loader

class ViewChats extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      chats:[],
    }
  }

  componentDidMount(){
    postRequest('project/viewchatmessages',
        {
          'email':window.localStorage.getItem('email'),
          'password': window.localStorage.getItem('password'),
          'project_id': this.props.colab_id
        },
        (res)=>{
            this.setState({chats:res.results})
        }
      )
  }

  render(){
    return(
      <div>
        {
          this.state.chats.map((chat,index)=>(
            <div key={index}>
              content: {chat.content}<br/>
              author: {chat.email}<br/>
              time: {chat.date_time_of_chat_message}

            </div>
          ))
        }
      </div>
    )
  }
}


export default class Chats extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      message:"",
      chat_refresh_count:0,
    }
  }

  onSendChat=()=>{
    postRequest('project/addchatmessage',
        {
          'email':window.localStorage.getItem('email'),
          'password': window.localStorage.getItem('password'),
          'content': this.state.message,
          'project_id': this.props.colab_id
        },
        (res)=>{
            this.setState({message:"",chat_refresh_count:this.state.chat_refresh_count+1})
        }
    )
  }

  render(){
    return(
      <>
      <h1>CHATS</h1>
      
      <ViewChats key={this.state.chat_refresh_count} colab_id={this.props.colab_id}/>
      <TextField
        value = {this.state.message}
        onChange={(e)=>this.setState({message:e.target.value})}
      />
      <button onClick={this.onSendChat}>Send</button>
      

      </>
    )
  }
}