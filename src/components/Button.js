import React,{useContext} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";

import {ColorsContext} from '../WebsiteMainFiles/GlobalVariables.js';

function Button(props)
{
    const{
      onClick,
      text
    } = props;

    const buttonStyle={
      background: useContext(ColorsContext).objectDefault,
      borderRadius: '4px',
      padding: '6px 16px',
      display: 'inline-block',
      cursor: 'pointer'
    }

    return(<button onClick={onClick} style={buttonStyle}>
        {text}
      </button>
    );
}


Button.propTypes = {
  //For states

  //For rendering
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default Button;
