import React from 'react';
import {createBrowserHistory} from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from '../components/Header';
import FrontPage from '../Pages/FrontPage';
import LoginPage from '../Pages/Login/Login';
import ForgotPassword from '../Pages/Login/ForgotPassword';
import TestPage from '../Pages/TestPage';
import SignUp from '../Pages/Login/SignUp';

export default class PageHandler extends React.Component{

  render()
  {
    const hist = createBrowserHistory();
    return(
      <Router history={hist}>
      <Header/>
        <Switch>
          <Redirect from="/" exact={true} to="/Front" />
          <Route path="/Front" component={FrontPage} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/Test" component ={TestPage}/>
          <Route path="/Login" component ={LoginPage}/>
          <Route path="/ForgotPassword" component={ForgotPassword}/>
        </Switch>
      </Router>
    );
  };
};
