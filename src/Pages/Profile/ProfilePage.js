import React from 'react';
import Header from '../../components/Header';
import Personal from '../../components/Personal';
import {postRequest} from '../../components/CallApi';
import WidgetProject from '../../components/WidgetProject';
import WidgetHack from '../../components/WidgetHack';

export default class ProfilePage extends React.Component {

  constructor(props)
  {
    super(props)
    this.state={
      personal:null
    }
  }

  render(){

    postRequest('profile/getprofiledetails',
                {
                  'email':window.localStorage.getItem('email'),
                  'password':window.localStorage.getItem('password')
               },
              (res)=>{this.setState({personal:res.response})}
    )

    return(
      <div>
        <Header logout={true}/>
        <div className = "profile__page">
          <div className = "profile__image">
          IMAGE
          </div>
          <div className = "profile__info">
            <div className = "profile__detail">
              <Personal personal = {this.state.personal} veiw = "false" />
            </div>
            <div className = "profile__widget">
              <WidgetProject link = "/MyProjects" />
              <WidgetHack />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
