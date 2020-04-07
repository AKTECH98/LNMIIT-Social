import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";

import GlobalVariables from 'WebsiteMainFiles/GlobalVariables.js';

class Button extends React.Component
{
  constructor(props){
    super(props);
    this.state={
    };
  }


  render()
  {
    const {
      text,
      onClick
    } = this.props;

    const buttonStyle={
      background: GlobalVariables.colors.neutral,
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
}


Button.propTypes = {
  //For states

  //For rendering
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Button;
