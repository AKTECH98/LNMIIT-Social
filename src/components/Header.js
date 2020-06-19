import React from 'react';
import { Link } from 'react-router-dom';

import Button from './Button'

export default function Header(props){
  return (
    <div className = "header">
      <p className = "header__title">
        <Link to="/" className = "button--link">
        LNMIIT SOCIAL
        </Link>
      </p>
      {
        (!props.logout)? // If fasle show the logout and other buttons in
        <div>
          <Link to='/Login'>
            <Button text='Login' type = 'button__header'/>
          </Link>
          <Link to='/SignUp'>
            <Button text='Connect' type = 'button__header'/>
          </Link>
        </div>
        :
        <div>
          <Link to='/Home'>
            <Button text='Home' type = 'button__header'/>
          </Link>
          <Link to='/ProfilePage'>
            <Button text='My Profile' type = 'button__header'/>
          </Link>
          <Link to='/Projects'>
            <Button text='Projects' type = 'button__header'/>
          </Link>
          <Button text='Hacks' type = 'button__header'/>
          <Button text='Logout' type = 'button__header'/>
        </div>
      }   
    </div>
  );
}
