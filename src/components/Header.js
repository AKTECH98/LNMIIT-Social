import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Search from './Search'

import {IconButton} from '@material-ui/core';
import NotificationIcon from '@material-ui/icons/NotificationsNoneOutlined';
import HomeIcon from '@material-ui/icons/Home';
import ProfileIcon from '@material-ui/icons/PermIdentity';
import HackIcon from '@material-ui/icons/LayersOutlined';
import ProjectIcon from '@material-ui/icons/Code';
import LogoutIcon from '@material-ui/icons/ArrowForwardIos';
import LoginIcon from '@material-ui/icons/ArrowBackIos';
import ConnectIcon from '@material-ui/icons/VpnKey';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 0
  }
}));

export default function Header(props){

  const classes = useStyles();

  return (
    <div className = "header">
      <div>
      <p className = "header__title">
        LNMIIT SOCIAL
      </p>
      </div>
      <div className = "sub__header">
        <Search/>
        {
          (!props.logout)? // If fasle show the logout and other buttons in
          <div>
            {
            (window.localStorage.getItem('email')!=null)?
              <Redirect to ='/home'/>:''
            }
            <Link to='/Login' className = "linklink">
              <IconButton classes = {{root: classes.root}}>
                <div className = "header__button">
                  <div>
                    <LoginIcon style = {{fontSize:30,color:'white'}}/>
                  </div>
                  <div className = "header__button--title">Login</div>
                </div>
              </IconButton>
            </Link>
            <Link to='/SignUp' className = "linklink">
              <IconButton classes = {{root: classes.root}}>
                <div className = "header__button">
                  <div>
                    <ConnectIcon style = {{fontSize:30,color:'white'}}/>
                  </div>
                    <div className = "header__button--title">Connect</div>
                </div>
              </IconButton>
            </Link>
          </div>
          :
          <div className = "header__buttons">
            {
              (window.localStorage.getItem('email')==null)?
              <Redirect to ='/login'/>:''
            }
          
            <Link to='/Home' className = "linklink">
              <IconButton classes = {{root: classes.root}}>
                <div className = "header__button">
                  <div>
                    <HomeIcon style = {{fontSize:30,color:'white'}}/>
                  </div>
                  <div className = "header__button--title">Home</div>
                </div>
              </IconButton>
            </Link>
            <Link to='/Notifications' className = "linklink">
              <IconButton classes = {{root: classes.root}}>
                <div className = "header__button">
                  <div>
                    <NotificationIcon style = {{fontSize:30,color:'white'}}/>
                  </div>
                  <div className = "header__button--title">Notify</div>
                </div>
              </IconButton>
            </Link>
            <Link to='/ProfilePage' className = "linklink">
              <IconButton classes = {{root: classes.root}}>
                <div className = "header__button">
                  <div>
                    <ProfileIcon style = {{fontSize:30,color:'white'}}/>
                  </div>
                  <div className = "header__button--title">My Profile</div>
                </div>
              </IconButton>
            </Link>
            <Link to='/Projects' className = "linklink">
              <IconButton classes = {{root: classes.root}}>
                <div className = "header__button">
                  <div>
                    <ProjectIcon style = {{fontSize:30,color:'white'}}/>
                  </div>
                  <div className = "header__button--title">Projects</div>
                </div>  
              </IconButton>
            </Link>
            <Link to='/Hacks' className = "linklink">
              <IconButton classes = {{root: classes.root}}>
                <div className = "header__button">
                  <div>
                    <HackIcon style = {{fontSize:30,color:'white'}}/>
                  </div>
                  <div className = "header__button--title">Hacks</div>
                </div>
              </IconButton>
            </Link>
            <Link to='/login' className = "linklink">
              <IconButton
                onClick = {()=>{
                  window.localStorage.removeItem('email')
                  window.localStorage.removeItem('password')
                }}
                classes = {{root: classes.root}}
              >
                <div className = "header__button">
                  <div>
                    <LogoutIcon style = {{fontSize:30,color:'white'}}/>
                  </div>
                  <div className = "header__button--title">Logout</div>
                </div>
              </IconButton>
            </Link>
          </div>
        }
      </div>
    </div>
  );
}
