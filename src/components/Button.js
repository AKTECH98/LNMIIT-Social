import React,{useContext} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";

function Button(props)
{
    const{
      onClick,
      text
    } = props;

    return(<button onClick={onClick}>
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
