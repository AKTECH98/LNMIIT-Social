import React from "react";
import { Redirect } from "react-router-dom";

import Header from "../components/Header";
import FeedWidget from "../components/FeedWidget";
import PostView from "../components/PostView";
import {postRequest} from '../components/CallApi';
import ProfileWidget from "../components/ProfileWidget";

export default class HomePage extends React.Component {

  constructor(props)
  {
    super(props)
    this.state={
      personal:null,
    }
  }

  componentDidMount()
  {
    const url = window.location.href;
    const parser = require('url-parameter-parser');
    const res = parser(url);
    const query = res.email
    postRequest('profile/getprofiledetails',
      {
        'email':query,
      },
      (res)=>{this.setState({personal:res.response})}
    )
  }

  render() {

    return (
      <div>
        <Redirect to={"Home?email=" + window.localStorage.getItem("email")} />
        <Header logout={true} />
        <div className='home__view'>
          <div className='home__photo'>
            <ProfileWidget personal = {this.state.personal}/>
          </div>
          <div className='home__feed'>
            <FeedWidget author = "ALL" />
            <PostView author="ALL"/>
          </div>
        </div>
      </div>
    );
  }
}