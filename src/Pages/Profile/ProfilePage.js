import React from 'react';
import Header from '../../components/Header';
import Personal from '../../components/Personal';
import {postRequest} from '../../components/CallApi';
import WidgetProject from '../../components/WidgetProject';
import WidgetHack from '../../components/WidgetHack';
import {Redirect} from 'react-router-dom';

export default class ProfilePage extends React.Component {
  constructor(props)
  {
    super(props)
    this.state={
      personal:null
    }
  }

  render(){

    const url = window.location.href;
    const parser = require('url-parameter-parser');
    const res = parser(url);
    const user = res.email

    return(
      <div>
        {
          (user==undefined)?
          <Redirect to={"ProfilePage?email="+window.localStorage.getItem('email')}/>
          : 
          postRequest('profile/getprofiledetails',
            {
              'email':user,
            },
            (res)=>{this.setState({personal:res.response})}
          )
        }
        <Header logout={true}/>
        <div className = "profile__page">
          <div></div>
          <div className = "profile__info">
            IMAGE
            <div className = "profile__detail">
              <Personal personal = {this.state.personal} view={user!=window.localStorage.getItem('email')}/>
              <div className = "profile__widget">
                <WidgetProject user = {(user==undefined)?window.localStorage.getItem('email'):user}/>
                <WidgetHack user = {(user==undefined)?window.localStorage.getItem('email'):user}/>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    )
  }
}
