import React from 'react';
import { Link } from 'react-router-dom';

import Button from './Button'

const Header = () => (
  <div className = "header">
    <p className = "button--link header__title">LNMIIT SOCIAL</p>
    <div>
      <Link to='/Login'>
        <Button text='Login' type = 'button__header'/>
      </Link>
      <Link to='/SignUp'>
        <Button text='Connect' type = 'button__header'/>
      </Link>
    </div>   
  </div>
);

export default Header;
