import React from 'react';

import Header from '../components/Header';
import Personal from '../components/Personal';
import WidgetProject from '../components/WidgetProject';
import WidgetHack from '../components/WidgetHack';

export default class ProfileView extends React.Component {

  render() {

    return(
      <div>
        <Header logout={true}/>
        <div className = "profile__page">
          <div className = "profile__image">
          IMAGE
          </div>
          <div className = "profile__info">
            <div className = "profile__detail">
              <Personal veiw = "true" />
            </div>
            <div className = "profile__widget">
              <WidgetProject link = "/Projects" />
              <WidgetHack />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
