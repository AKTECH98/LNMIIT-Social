import React from 'react';
import PropTypes from "prop-types";

const Button = (props) => {
  const{
    onClick,
    type,
    text,
    disabled
  } = props;

  return(
    <button className = {type} onClick={onClick} disabled = {disabled}>
      {text}
    </button>
  );
}

Button.propTypes = {
  //For states

  //For rendering
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

export default Button;