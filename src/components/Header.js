import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import Button from './Button'

export default function Header(props){
  return (
    <div className = "header">
      <div>
      <p className = "header__title">
        LNMIIT SOCIAL
      </p>
      </div>
      <div className = "sub__header">
        <div>
          SEARCH
        </div>
      {
        (!props.logout)? // If fasle show the logout and other buttons in
        <div>
        {
          (window.localStorage.getItem('email')!=null)?
          <Redirect to ='/home'/>:''

        }
          <Link to='/Login'>
            <Button text='Login' type = 'button__header'/>
          </Link>
          <Link to='/SignUp'>
            <Button text='Connect' type = 'button__header'/>
          </Link>
        </div>
        :
        <div>
          {
            (window.localStorage.getItem('email')==null)?
            <Redirect to ='/login'/>:''
          }
          <Link to='/Home'>
            <Button text='Home' type = 'button__header'/>
          </Link>
          <Link to='/ProfilePage'>
            <Button text='My Profile' type = 'button__header'/>
          </Link>
          <Link to='/Projects'>
            <Button text='Projects' type = 'button__header'/>
          </Link>
          <Link to='/Hacks'>
            <Button text='Hacks' type = 'button__header'/>
          </Link>
          <Link to='/login'>
          <Button text='Logout'
                  type = 'button__header'
                  onClick={()=>{
                    window.localStorage.removeItem('email')
                    window.localStorage.removeItem('password')
                  }}
          />
        </Link>
        </div>
      }
      </div>
    </div>
  );
}
