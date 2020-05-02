import React from 'react';

import Button from './Button';

const OptionList = (props) => (
  <div className = "option">
    <p className = "option__text">{props.count}. {props.optionText}</p>
    <Button
      type = "button button--link"
      onClick={props.ShowDetails}
      text = "More"
    />
  </div>
);

export default OptionList;
