import React from 'react';

const OptionList = (props) => (
  <div className = "option">
    <p className = "option__text">{props.count}. {props.optionText}</p>
    <button
      className = "button button--link"
      onClick={(e) => {
        props.deleteProject(props.optionText);
      }}
    >
      remove
    </button>
  </div>
);

export default OptionList;