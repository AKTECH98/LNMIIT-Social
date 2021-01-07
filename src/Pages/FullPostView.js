import React from "react";

import { postRequest } from "../components/CallApi";
import SinglePostView from "../components/SinglePostView";
import {Redirect} from 'react-router-dom'
import Header from '../components/Header';

export default class FullPostView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
    };
  }
  componentDidMount()
  {
    const url = window.location.href;
    const parser = require('url-parameter-parser');
    const res = parser(url);
    const post_id = res.post_id

    postRequest(
      "posts/viewpost",
      {
        email: window.localStorage.getItem("email"),
        password: window.localStorage.getItem("password"),
        post_id: post_id
      },
      (res) => {
        if(res.message == "SUCCESS") this.setState({post:res.result,loading:false});
        else if(res.message == "FAILURE" && res.reason=="Post Does Not Exist") this.setState({error:true, errorMessage:"Post has been removed or does not exist",loading:false})
        else this.setState({error:true, errorMessage:"Error fetching the post",loading:false})
         
      }
    )
  }
  render() {
    const url = window.location.href;
    const parser = require('url-parameter-parser');
    const res = parser(url);
    const post_id = res.post_id
    
    if(post_id==undefined) return <Redirect to ="/"/>
    return (
      <div>
        <Header logout = {true}/>
        {(this.state.loading)?
          "Loading Post..."
          :
          (this.state.error)?
            <div>{this.state.errorMessage}</div>
            :
            <center>
            <div className = "post--share">
            <SinglePostView item={this.state.post} fullPostView={true}/>
            </div>
            </center>
        }
      </div>
    );
  }
}
