import React from 'react';

import Login from './Login/Login';
import Header from '../components/Header';
import { Card, CardContent} from '@material-ui/core';

export default class FrontPage extends React.Component {
  render(){
    return(
      <div>
        <Header />
        <div className = "front__page">
          <div className = "description">
            <h1>UNDER CONSTRUCTION</h1>
          </div>
          <div className = "login__form">  
            <Login/>    
          </div>
        </div>
        <div className = "footer">
          <div className =  "footer--1">
            first
          </div>
          <div className = "footer--2">
            Developers
            <ul>
              <li><a href = "https://www.linkedin.com/in/abhayaravinda/" target="_blank">Abhay Aravinda</a></li>
              <li><a href = "https://www.linkedin.com/in/anshul-kiyawat-06210b147/" target="_blank">Anshul Kiyawat</a></li>
              <li><a href = "https://www.linkedin.com/in/anupam-shah-033718152/" target="_blank">Anupam Shah</a></li>
              <li><a href = "https://www.linkedin.com/in/tarun-gupta-3956a5143/" target="_blank">Tarun Gupta</a></li>
            </ul>
          </div>
          <div className = "footer--3">
            third
          </div>
        </div>
      </div>
    )
  }
}
