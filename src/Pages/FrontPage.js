import React from 'react';

import Login from './Login/Login';
import Header from '../components/Header';

import Anshul from '../img/anshul1.jpg';
import Abhay from '../img/abhay.png';
import Anupam from '../img/anupam.jpg';
import Tarun from '../img/tarun.jpeg';
import Vikas from '../img/DefaultUser.jpg';

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
          <div className = "footer--top">
            About Us
          </div>
          <div className = "footer--bottom">
            <div className = "developer">
              <a href = "https://www.linkedin.com/in/abhayaravinda/" target="_blank">
                <img src={Abhay} alt="Abhay" className="avatar"/>
                <p className = "dev__name">Abhay Aravinda<br/>Developer</p>
              </a>
            </div>
            <div className = "developer">
              <a href = "https://www.linkedin.com/in/anupam-shah-033718152/" target="_blank">
                <img src={Anupam} alt="Anupam" className="avatar"/>
                <p className = "dev__name">Anupam Shah<br/>Developer</p>
              </a>
            </div>
            <div className = "developer">
              <a href = "https://www.linkedin.com/in/anshul-kiyawat-06210b147/" target="_blank">
                <img src={Anshul} alt="Anshul" className="avatar"/>
                <p className = "dev__name">Anshul Kiyawat<br/>Developer</p>
              </a>
            </div>
            <div className = "developer">
              <a href = "https://www.linkedin.com/in/tarun-gupta-3956a5143/" target="_blank">
                <img src={Tarun} alt="Tarun" className="avatar"/>
                <p className = "dev__name">Tarun Gupta<br/>Developer</p>
              </a>
            </div>
            <div className = "developer">
              <a href = "https://www.linkedin.com/in/tarun-gupta-3956a5143/" target="_blank">
                <img src={Vikas} alt="Tarun" className="avatar"/>
                <p className = "dev__name">Vikas Bajpai<br/>Mentor</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}