import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import HamburgerMenu from "react-hamburger-menu";

import Search from "./Search";

import { IconButton } from "@material-ui/core";
import NotificationIcon from "@material-ui/icons/NotificationsNoneOutlined";
import HomeIcon from "@material-ui/icons/Home";
import ProfileIcon from "@material-ui/icons/PermIdentity";
import ColaborationIcon from '@material-ui/icons/Group';
import LogoutIcon from "@material-ui/icons/ArrowForwardIos";
import ConnectIcon from "@material-ui/icons/VpnKey";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 0,
    "&:hover": {
      backgroundColor: "#DC143C",
      transform: "scale(1.2)",
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className='header'>
      <div className='header__show'>
        <HamburgerMenu
          isOpen={isMenuOpen}
          menuClicked={() => setIsMenuOpen(!isMenuOpen)}
          width={18}
          height={15}
          strokeWidth={1}
          rotate={0}
          color='black'
          borderRadius={0}
          animationDuration={0.5}
          className='hamburger__menu'
        />
        {!isMenuOpen ? (
          ""
        ) : (
          <div className='mobile__menu'>
            {!props.logout ? (
              <div>
                {window.localStorage.getItem("email") != null ? (
                  <Redirect to='/home' />
                ) : (
                  ""
                )}
                <ul>
                  <div className='search'>
                  {(!props.logout)?'':
                    <Search />
                  }
                  </div>
                  <div>
                    {" "}
                    <Link to='/SignUp' className='linklink'>
                      <IconButton classes={{ root: classes.root }}>
                        <div className='header__button'>
                          <div>
                            <ConnectIcon
                              style={{ fontSize: 20, color: "white" }}
                            />
                          </div>
                          <div className='header__button--title'>Connect</div>
                        </div>
                      </IconButton>
                    </Link>
                  </div>
                </ul>
              </div>
            ) : (
              <div className='header__buttons'>
                {window.localStorage.getItem("email") == null ? (
                  <Redirect to='/Front' />
                ) : (
                  ""
                )}
                <ul>
                  <div>
                    {" "}
                    <Link to='/Home' className='linklink'>
                      <IconButton classes={{ root: classes.root }}>
                        <div className='header__button'>
                          <div>
                            <HomeIcon
                              style={{ fontSize: 20, color: "white" }}
                            />
                          </div>
                          <div className='header__button--title'>Home</div>
                        </div>
                      </IconButton>
                    </Link>
                  </div>
                  <div>
                    {" "}
                    <Link to='/Notifications' className='linklink'>
                      <IconButton classes={{ root: classes.root }}>
                        <div className='header__button'>
                          <div>
                            <NotificationIcon
                              style={{ fontSize: 20, color: "white" }}
                            />
                          </div>
                          <div className='header__button--title'>Notify</div>
                        </div>
                      </IconButton>
                    </Link>
                  </div>
                  <div>
                    <Link to='/ProfilePage' className='linklink'>
                      <IconButton classes={{ root: classes.root }}>
                        <div className='header__button'>
                          <div>
                            <ProfileIcon
                              style={{ fontSize: 20, color: "white" }}
                            />
                          </div>
                          <div className='header__button--title'>
                            My Profile
                          </div>
                        </div>
                      </IconButton>
                    </Link>
                  </div>
                  <div>
                    <Link to='/Collaborations' className='linklink'>
                      <IconButton classes={{ root: classes.root }}>
                        <div className='header__button'>
                          <div>
                            <ColaborationIcon
                              style={{ fontSize: 20, color: "white" }}
                            />
                          </div>
                          <div className='header__button--title'>
                            Collaborations
                          </div>
                        </div>
                      </IconButton>
                    </Link>
                  </div>
                  <div>
                    {" "}
                    <Link to='/Front' className='linklink'>
                      <IconButton
                        onClick={() => {
                          window.localStorage.removeItem("email");
                          window.localStorage.removeItem("password");
                        }}
                        classes={{ root: classes.root }}
                      >
                        <div className='header__button'>
                          <div>
                            <LogoutIcon
                              style={{ fontSize: 20, color: "white" }}
                            />
                          </div>
                          <div className='header__button--title'>Logout</div>
                        </div>
                      </IconButton>
                    </Link>
                  </div>
                  <div className='search'>
                  {
                    (!props.logout)?'':
                    <Search />
                  }
                  </div>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <div className='header__hide'>
        <Link to = {(!props.logout)?"/home":"/Front"} className = "linklink">
        <p className='header__title'>LNMIIT SOCIAL</p>
        </Link>
        <div className='search'>
        {
          (!props.logout)?'':
          <Search />
        }
        </div>
        <div className = "header__buttons">
          {!props.logout ?
            <div className = "sub__header">
              {
                (window.localStorage.getItem('email')!=null)?
                <Redirect to ='/home'/>:''
              }
              <Link to='/SignUp' className='linklink'>
                <IconButton classes={{ root: classes.root }}>
                  <div className='header__button'>
                    <div>
                      <ConnectIcon style={{ fontSize: 20, color: "white" }} />
                    </div>
                    <div className='header__button--title'>Connect</div>
                  </div>
                </IconButton>
              </Link>
            </div>
          : 
            <div className='sub__header'>
              
              {
                (window.localStorage.getItem("email")==null)?
                <Redirect to='/Front' />
                :""
              }

              <Link to='/Home' className='linklink'>
                <IconButton classes={{ root: classes.root }}>
                  <div className='header__button'>
                    <div>
                      <HomeIcon style={{ fontSize: 20, color: "white" }} />
                    </div>
                    <div className='header__button--title'>Home</div>
                  </div>
                </IconButton>
              </Link>
              <Link to='/Notifications' className='linklink'>
                <IconButton classes={{ root: classes.root }}>
                  <div className='header__button'>
                    <div>
                      <NotificationIcon
                        style={{ fontSize: 20, color: "white" }}
                      />
                    </div>
                    <div className='header__button--title'>Notify</div>
                  </div>
                </IconButton>
              </Link>
              <Link
                to={
                  "/ProfilePage?email=" + window.localStorage.getItem("email")
                }
                className='linklink'
              >
                <IconButton classes={{ root: classes.root }}>
                  <div className='header__button'>
                    <div>
                      <ProfileIcon style={{ fontSize: 20, color: "white" }} />
                    </div>
                    <div className='header__button--title'>My Profile</div>
                  </div>
                </IconButton>
              </Link>
              <Link to='/Collaborations' className='linklink'>
                <IconButton classes={{ root: classes.root }}>
                  <div className='header__button'>
                    <div>
                      <ColaborationIcon style={{ fontSize: 20, color: "white" }} />
                    </div>
                    <div className='header__button--title'>Collaborations</div>
                  </div>
                </IconButton>
              </Link>
              <Link to='/Front' className='linklink'>
                <IconButton
                  onClick={() => {
                    window.localStorage.removeItem("email");
                    window.localStorage.removeItem("password");
                  }}
                  classes={{ root: classes.root }}
                >
                  <div className='header__button'>
                    <div>
                      <LogoutIcon style={{ fontSize: 20, color: "white" }} />
                    </div>
                    <div className='header__button--title'>Logout</div>
                  </div>
                </IconButton>
              </Link>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
