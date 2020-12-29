import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Search from "../components/Search";

import NotificationIcon from "@material-ui/icons/NotificationsNoneOutlined";
import HomeIcon from "@material-ui/icons/Home";
import ProfileIcon from "@material-ui/icons/PermIdentity";
import HackIcon from "@material-ui/icons/LayersOutlined";
import ProjectIcon from "@material-ui/icons/Code";
import LogoutIcon from "@material-ui/icons/ArrowForwardIos";
import ConnectIcon from "@material-ui/icons/VpnKey";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 0,
    "&:hover": {
      backgroundColor: "#333745"
    },
  },
}));

export default function TestPage(props) {
  const classes = useStyles();
  return (
    <div className='try'>
      <div className = "try--left">
        <div className = "try--logo">
          LNMIIT-SOCIAL
        </div>
        <div className = "search">
          <Search/>
        </div>
      </div>
      <div className = "try--buttons">
        <Link to='/Home' className='linklink'>
          <div className='try--header__button'>
            <div>
              <HomeIcon className = "try--icon" style={{ fontSize: 30}} />
            </div>
            <div className='try--header__button--title'>Home</div>
          </div>
        </Link>
        <Link to='/Notifications' className='linklink'>
            <div className='try--header__button'>
              <div>
                <NotificationIcon className = "try--icon" style={{ fontSize: 30}}/>
              </div>
              <div className='try--header__button--title'>Notify</div>
            </div>
        </Link>
        <Link
          to={
            "/ProfilePage?email=" + window.localStorage.getItem("email")
          }
          className='linklink'
        >
          <div className='try--header__button'>
            <div>
              <ProfileIcon className = "try--icon" style={{ fontSize: 30}} />
            </div>
            <div className='try--header__button--title'>My Profile</div>
          </div>
        </Link>
        <Link to='/Projects' className='linklink'>
          <div className='try--header__button'>
            <div>
              <ProjectIcon className = "try--icon" style={{ fontSize: 30}} />
            </div>
            <div className='try--header__button--title'>Projects</div>
          </div>
        </Link>
        <Link to='/Hacks' className='linklink'>
            <div className='try--header__button'>
              <div>
                <HackIcon className = "try--icon" style={{ fontSize: 30}} />
              </div>
              <div className='try--header__button--title'>Hacks</div>
            </div>
        </Link>
        <Link to='/Front' className='linklink'>
          <div 
            onClick={() => {
              window.localStorage.removeItem("email");
              window.localStorage.removeItem("password");
            }}
            className='try--header__button'
          >
            <div>
              <LogoutIcon className = "try--icon" style={{ fontSize: 30}} />
            </div>
            <div className='try--header__button--title'>Logout</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
