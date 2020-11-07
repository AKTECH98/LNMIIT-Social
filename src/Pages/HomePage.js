import React from 'react';
import {Redirect } from 'react-router-dom';


import Header from '../components/Header';
import FeedWidget from '../components/FeedWidget';
import PostView from '../components/PostView';
import WidgetHack from '../components/WidgetHack';
import WidgetProject from '../components/WidgetProject';

export default class HomePage extends React.Component{
  render() {
    return(
      <div>
        <Header logout = {true}/>
        <div className = "home__view">
          <div className = "home__photo">
            Photo
          </div>
          <div className = "home__feed">
            <FeedWidget />
            <PostView />
          </div>
          <div>
            <WidgetProject link = "/Projects" />
            <WidgetHack />
          </div>
        </div>
      </div>
    );
  }
}
