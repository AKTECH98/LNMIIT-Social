import React from 'react';
import PropTypes from "prop-types";

const Button = (props) => {
  const{
    onClick,
    type,
    text
  } = props;

  return(
    <button className = {type} onClick={onClick}>
      {text}
    </button>
  );
}

Button.propTypes = {
  //For states

  //For rendering
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default Button;