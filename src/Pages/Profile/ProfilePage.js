import React from 'react';
import Header from '../../components/Header';
import Personal from '../../components/Personal';
import Skills from '../../components/Skills';
import Contact from '../../components/Contact';
import {postRequest} from '../../components/CallApi';
import WidgetProject from '../../components/WidgetProject';
import {Redirect} from 'react-router-dom';
import PostView from '../../components/PostView'
import FeedWidget from '../../components/FeedWidget'

export default class ProfilePage extends React.Component {
  constructor(props)
  {
    super(props)
    this.state={
      personal:null,
      year: "4th Year",
      batch: "Y17 Batch"
    }
  }

  componentDidMount()
  {
    const url = window.location.href;
    const parser = require('url-parameter-parser');
    const res = parser(url);
    const query = res.email
    postRequest('profile/getprofiledetails',
            {
              'email':query.split('#')[0],
            },
            (res)=>{this.setState({personal:res.response})}
          )
  }
  render(){

    const url = window.location.href;
    const parser = require('url-parameter-parser');
    const res = parser(url);
    const query = res.email

    return(
      <div className = "profile__page">
        {
          (query==undefined)?
          <Redirect to={"ProfilePage?email="+window.localStorage.getItem('email')}/>
          : ""
        }
        <Header logout={true}/>
        <div className = "profile">
          <div className = "profile-1">
            <div className = "profile__detail">
              <Personal year = {this.state.year} batch = {this.state.batch} personal = {this.state.personal} view={query.split('#')[0]!=window.localStorage.getItem('email')}/>   
            </div>
            <div className = "profile__skills">
              <Skills view={query.split('#')[0]!=window.localStorage.getItem('email')}/>
            </div>
            <div className = "post--header">
              <h3>My Posts</h3>
            {  
              (query.split('#')[0]==undefined||query.split('#')[0]==window.localStorage.email)?
              /*While viewing own profile*/
                <div>
                  <FeedWidget />
                  <PostView author={window.localStorage.getItem('email')}/>
                </div>
              : /*While viewing others' profile*/
                <div>
                  <PostView author={query.split('#')[0]}/>
                </div>
            }
            </div>
          </div>
          <div className = "profile-2">
            <div className = "profile__contact">
              <Contact personal = {this.state.personal} view={query.split('#')[0]!=window.localStorage.getItem('email')}/>   
            </div>
            <div className = "profile__widget">
              <WidgetProject user = {(query.split('#')[0]==undefined)?window.localStorage.getItem('email'):query.split('#')[0]}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}