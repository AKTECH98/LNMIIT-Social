import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import HamburgerMenu from "react-hamburger-menu";

import Search from "./Search";

import { IconButton } from "@material-ui/core";
import NotificationIcon from "@material-ui/icons/NotificationsNoneOutlined";
import HomeIcon from "@material-ui/icons/Home";
import ProfileIcon from "@material-ui/icons/PermIdentity";
import HackIcon from "@material-ui/icons/LayersOutlined";
import ProjectIcon from "@material-ui/icons/Code";
import LogoutIcon from "@material-ui/icons/ArrowForwardIos";
import LoginIcon from "@material-ui/icons/ArrowBackIos";
import ConnectIcon from "@material-ui/icons/VpnKey";
import zIndex from "@material-ui/core/styles/zIndex";
import { LinearScale } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 0,
    "&:hover": {
      backgroundColor: '#333745',
      transform: 'scale(1.2)'
    }
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className='header'>
      <p className='header__title'>LNMIIT SOCIAL</p>

      <div className='sub__header'>
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
          {(!isMenuOpen) ?
            ""
            :
            <div className='mobile__menu'>
              {
                (!props.logout)?
                <div>
                  {
                    (window.localStorage.getItem("email") != null) ?
                    <Redirect to='/home' />:""
                  }
                  <ul>
                    <div className='search'>
                      <Search />
                    </div>
                    <div>
                      {" "}
                      <Link to='/Login' className='linklink'>
                        <IconButton classes={{ root: classes.root }}>
                          <div className='header__button'>
                            <div>
                              <LoginIcon
                                style={{ fontSize: 20, color: "white" }}
                              />
                            </div>
                            <div className='header__button--title'>Login</div>
                          </div>
                        </IconButton>
                      </Link>
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
                : 
                <div className='header__buttons'>
                  {
                    (window.localStorage.getItem('email')==null)?
                    <Redirect to ='/login'/>:''
                  }
                  <ul>
                    <div>
                      {" "}
                      <Link to='/Home' className='linklink'>
                        <IconButton classes={{ root: classes.root }}>
                          <div className='header__button'>
                            <div>
                              <HomeIcon style={{ fontSize: 20, color: "white" }}/>
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
                              <NotificationIcon style={{ fontSize: 20, color: "white" }}/>
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
                              <ProfileIcon style={{ fontSize: 20, color: "white" }}/>
                            </div>
                            <div className='header__button--title'>My Profile</div>
                          </div>
                        </IconButton>
                      </Link>
                    </div>
                    <div>
                      <Link to='/Projects' className='linklink'>
                        <IconButton classes={{ root: classes.root }}>
                          <div className='header__button'>
                            <div>
                              <ProjectIcon style={{ fontSize: 20, color: "white" }}/>
                            </div>
                            <div className='header__button--title'>Projects</div>
                          </div>
                        </IconButton>
                      </Link>
                    </div>
                    <div>
                      <Link to='/Hacks' className='linklink'>
                        <IconButton classes={{ root: classes.root }}>
                          <div className='header__button'>
                            <div>
                              <HackIcon style={{ fontSize: 20, color: "white" }}/>
                            </div>
                            <div className='header__button--title'>Hacks</div>
                          </div>
                        </IconButton>
                      </Link>
                    </div>
                    <div>
                      {" "}
                      <Link to='/login' className='linklink'>
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
                      <Search />
                    </div>
                  </ul>
                </div>
              }
            </div>
          }
        </div>

        <div className='header__hide'>
          <div className='search'>
            <Search />
          </div>

          {
            (!props.logout)?
            <div>
            {
            //(window.localStorage.getItem('email')!=null)?
              //<Redirect to ='/home'/>:''
            }
            <Link to='/Login' className = "linklink">
              <IconButton classes = {{root: classes.root}}>
                <div className = "header__button">
                  <div>
                    <LoginIcon style = {{fontSize:20,color:'white'}}/>
                  </div>
                  <div className = "header__button--title">Login</div>
                </div>
              </IconButton>
            </Link>
            <Link to='/SignUp' className = "linklink">
              <IconButton classes = {{root: classes.root}}>
                <div className = "header__button">
                  <div>
                    <ConnectIcon style = {{fontSize:20,color:'white'}}/>
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
          
            <Link to='/Home' className = "linklink" onClick = {()=>{console.log(Hello)}}>
              <IconButton classes = {{root: classes.root}}>
                <div className = "header__button">
                  <div>
                    <HomeIcon style = {{fontSize:20,color:'white'}}/>
                  </div>
                  <div className = "header__button--title">Home</div>
                </div>
              </IconButton>
            </Link>
            <Link to='/Notifications' className = "linklink">
              <IconButton classes = {{root: classes.root}}>
                <div className = "header__button">
                  <div>
                    <NotificationIcon style = {{fontSize:20,color:'white'}}/>
                  </div>
                  <div className = "header__button--title">Notify</div>
                </div>
              </IconButton>
            </Link>
            <Link to={'/ProfilePage?email='+window.localStorage.getItem('email')} className = "linklink">
              <IconButton classes = {{root: classes.root}}>
                <div className = "header__button">
                  <div>
                    <ProfileIcon style = {{fontSize:20,color:'white'}}/>
                  </div>
                  <div className = "header__button--title">My Profile</div>
                </div>
              </IconButton>
            </Link>
            <Link to='/Projects' className = "linklink">
              <IconButton classes = {{root: classes.root}}>
                <div className = "header__button">
                  <div>
                    <ProjectIcon style = {{fontSize:20,color:'white'}}/>
                  </div>
                  <div className = "header__button--title">Projects</div>
                </div>  
              </IconButton>
            </Link>
            <Link to='/Hacks' className = "linklink">
              <IconButton classes = {{root: classes.root}}>
                <div className = "header__button">
                  <div>
                    <HackIcon style = {{fontSize:20,color:'white'}}/>
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
                    <LogoutIcon style = {{fontSize:20,color:'white'}}/>
                  </div>
                  <div className = "header__button--title">Logout</div>
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
