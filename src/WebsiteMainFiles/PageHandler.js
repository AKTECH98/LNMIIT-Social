import React from 'react';
import {createBrowserHistory} from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import FrontPage from '../Pages/FrontPage';
import LoginPage from '../Pages/Login/Login';

import ConfirmSignUp from '../Pages/Login/ConfirmSignUp';
import ForgotPassword from '../Pages/Login/ForgotPassword';
import TestPage from '../Pages/TestPage';
import SignUp from '../Pages/Login/SignUp';
import EditProfile from '../Pages/Profile/EditProfile';
import ProfilePage from '../Pages/Profile/ProfilePage';
import HomePage from '../Pages/HomePage';
import HackathonPage from '../Pages/Profile/HackathonPage'
import ProjectsPage from '../Pages/Profile/ProjectsPage'

export default class PageHandler extends React.Component{

  render()
  {
    const hist = createBrowserHistory();
    return(
      <Router history={hist}>
        <Switch>
          <Redirect from="/" exact={true} to="/Front" />
          <Route path="/Front" component={FrontPage} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/ConfirmSignUp" component={ConfirmSignUp} />
          <Route path="/Login" component ={LoginPage}/>
          <Route path="/ForgotPassword" component={ForgotPassword}/>
          <Route path="/EditProfile" component={EditProfile}/>
          <Route path="/ProfilePage" component={ProfilePage}/>
          <Route path="/Test" component ={TestPage}/>
          <Route path="/Home" component ={HomePage}/>
          <Route path="/Hacks" component ={HackathonPage}/>
          <Route path="/Projects" component ={ProjectsPage}/>

        </Switch>
      </Router>
    );
  };
};
