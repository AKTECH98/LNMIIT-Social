import React from 'react';

import Header from '../../components/Header';
import HackWidget from '../../components/HackWidget';


export default class HackathonPage extends React.Component {

  render(){
    return(
      <div>
        <Header />
        <HackWidget />
      </div>
    )
  }
}
