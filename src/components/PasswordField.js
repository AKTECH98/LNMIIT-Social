import React,{useState} from 'react';
import PropTypes from "prop-types";
import MaterialUITextField from '@material-ui/core/TextField';

const PasswordField = (props) =>{

  const [value,setValue]=useState(props.defaultValue);

  const {
    label,
    disabled,
    returnValue
  } = props;

  return(
    <MaterialUITextField
      label = {label}
      disabled = {(disabled==undefined)?false:disabled}
      value={value}
      onChange = {(event)=>{
        setValue(event.target.value);
        returnValue(event.target.value)
      }}
    />
  );
}

PasswordField.propTypes = {
  //For states
  defaultValue:PropTypes.string.isRequired,

  //For rendering
  label:PropTypes.string.isRequired,
  disabled:PropTypes.bool,
  success: PropTypes.instanceOf(RegExp),
  error: PropTypes.instanceOf(RegExp),
  returnValue: PropTypes.func.isRequired
};

export default PasswordField;
