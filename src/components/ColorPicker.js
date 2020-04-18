//TODO: Create a proper styling for this
import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import {ChromePicker} from 'react-color'
import Button from './Button';

function ColorPicker(props)
{
    const{
      label,
      defaultValue,
      returnValue
    } = props;

    const [color,setColor]=useState((defaultValue==undefined)?"#FFFFFF":defaultValue);

    return(
      <div>
      <center>
      {label}
      <ChromePicker
        color={color}
        disableAlpha
        onChange={(e)=>{
                      setColor(e.hex);
                 }}

      />
      <Button text="Submit" onClick={()=>{
                                            returnValue(color);
                                         }}
      />
      </center>
      </div>
    );
}


ColorPicker.propTypes = {
  defaultValue:PropTypes.string,
  returnValue:PropTypes.func
};

export default ColorPicker;
