import React from 'react';
import Anshul from '../img/anshul1.jpg';

export default class TestPage extends React.Component{
  render(){
    return(
      <div>
        <div className = "try--comment">
          <img src={Anshul} alt="Avatar" className = "try--comment-avatar"/>
          <div className = "try--comment-content">
            <div className = "comment--header">
              <p className = "comment--author">Anshul Kiyawat</p>
              <p className = "comment--date">Date of Post</p>
            </div>
            <div className = "comment--content">
              This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment
              This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment
              This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment
              This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment
              This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment
              This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment
            </div>
          </div>
        </div>
        <div className = "try--comment">
          <img src={Anshul} alt="Avatar" className = "try--comment-avatar"/>
          <div className = "try--comment-content">
            <div className = "comment--header">
              <p className = "comment--author">Anshul Kiyawat</p>
              <p className = "comment--date">Date of Post</p>
            </div>
            <div className = "comment--content">
              This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment
              This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment
              This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment
              This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment
              This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment
              This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment This is my Comment
            </div>
          </div>
        </div>
      </div>
    )
  }
}