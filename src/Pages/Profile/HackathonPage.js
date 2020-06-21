import React from 'react';
import {Redirect } from 'react-router-dom';
import Header from '../../components/Header';
import HackWidget from '../../components/HackWidget';


export default class HackathonPage extends React.Component {

  render(){
    return(
      <div>
        <Header logout = {true} />
        <HackWidget />
      </div>
    )
  }
}
