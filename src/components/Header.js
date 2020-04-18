import React from 'react';
import { Link } from 'react-router-dom';

import Button from './Button'

export default class Header extends React.Component {
    
  render() {
    return (
      <div>
        <Link to='/Front'>
        <p>LNMIIT SOCIAL</p>
        </Link>
        <Link to='/SignUp'>
          <Button text='SignUp'/>
        </Link>
        <Link to='/Login'>
          <Button text='Login'/>
        </Link>   
      </div>
      
    )
  }
}
