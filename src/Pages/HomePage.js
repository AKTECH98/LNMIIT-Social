import React from "react";
import { Redirect } from "react-router-dom";

import Header from "../components/Header";
import FeedWidget from "../components/FeedWidget";
import PostView from "../components/PostView";
import WidgetHack from "../components/WidgetHack";
import WidgetProject from "../components/WidgetProject";

import LoginContext from '../contexts/LoginContext';

export default class HomePage extends React.Component {
  render() {
    return (
      <LoginContext.Consumer>
      {(loginData)=>{return (
      <div>
        <Redirect to={"Home?email=" + loginData.email} />
        <Header logout={true} />
        <div className='home__view'>
          <div className='home__photo'>Photo</div>
          <div className='home__feed'>
            <FeedWidget />
            <PostView />
          </div>
        </div>
      </div>)}}
    </LoginContext.Consumer>
    );
  }
}
