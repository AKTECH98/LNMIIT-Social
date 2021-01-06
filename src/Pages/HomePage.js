import React from "react";
import { Redirect } from "react-router-dom";

import Header from "../components/Header";
import FeedWidget from "../components/FeedWidget";
import PostView from "../components/PostView";
import WidgetHack from "../components/WidgetHack";
import WidgetProject from "../components/WidgetProject";

export default class HomePage extends React.Component {
  render() {
    const user = window.localStorage.getItem("email");

    return (
      <div>
        <Redirect to={"Home?email=" + user} />
        <Header logout={true} />
        <div className='home__view'>
          <div className='home__photo'>Photo</div>
          <div className='home__feed'>
            <FeedWidget />
            <PostView author="ALL"/>
          </div>
        </div>
      </div>
    );
  }
}