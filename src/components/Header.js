import React from 'react';
import { Link } from 'react-router-dom';

import Button from './Button'

const Header = () => (
  <div className = "header">
    <p className = "header__title">
      <Link to="/" className = "button--link">
        LNMIIT SOCIAL
      </Link>
    </p>
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
