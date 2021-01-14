import React from 'react';
import {createBrowserHistory} from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import FrontPage from '../Pages/FrontPage';
import SearchPage from '../Pages/SearchPage';
import NotificationsPage from '../Pages/Notifications';
import ConfirmOTP from '../Pages/Login/ConfirmOTP';
import ForgotPassword from '../Pages/Login/ForgotPassword';
import TestPage from '../Pages/TestPage';
import SignUp from '../Pages/Login/SignUp';
import EditProfile from '../Pages/Profile/EditProfile';
import ProfilePage from '../Pages/Profile/ProfilePage';
import HomePage from '../Pages/HomePage';
import CollaborationsPage from '../Pages/CollaborationsPage';
import FullPostView from '../Pages/FullPostView';
import FullCollaboration from '../Pages/FullColab';

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
          <Route path="/ConfirmOTP" component={ConfirmOTP} />
          <Route path="/Search" component={SearchPage} /> 
          <Route path="/Notifications" component={NotificationsPage} /> 
          <Route path="/ForgotPassword" component={ForgotPassword}/>
          <Route path="/EditProfile" component={EditProfile}/>
          <Route path="/ProfilePage" component={ProfilePage}/>
          <Route path="/TestPage" component ={TestPage}/>
          <Route path="/Home" component ={HomePage}/>
          <Route path="/Collaborations" component = {CollaborationsPage}/>
          <Route path='/Post' component = {FullPostView}/>
          <Route path='/CollaborationDetails' component = {FullCollaboration}/>
        </Switch>
      </Router>
    );
  };
};
