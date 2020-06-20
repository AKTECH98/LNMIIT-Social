import React from 'react';

import Header from '../components/Header';
import ProjectWidget from '../components/ProjectWidget';
import HackWidget from '../components/HackWidget';
import FeedWidget from '../components/FeedWidget';
import PostView from '../components/PostView';

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
            <ProjectWidget />
            <HackWidget />
          </div>
        </div>
      </div>
    );
  }
}