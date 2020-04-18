import React,{useState,useContext} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import MaterialUITextField from '@material-ui/core/TextField';
import MaterialUIInputAdornment from '@material-ui/core/InputAdornment';


function TextField(props)
{

    const [value,setValue]=useState(props.defaultValue);

    const {
      label,
      disabled,
      error,
      success,
      returnValue,
      multiline
    } = props;

    return(
      <MaterialUITextField
        fullWidth
        label={label}
        disabled={(disabled==undefined)?false:disabled}
        multiline={(multiline==undefined)?false:multiline}
        value={value}
        onChange={(event)=>{
            setValue(event.target.value)
            returnValue(event.target.value)
          }
        }

      />
    );
}

TextField.propTypes = {
  //For states
  defaultValue:PropTypes.string.isRequired,

  //For rendering
  label:PropTypes.string.isRequired,
  disabled:PropTypes.bool,
  success: PropTypes.instanceOf(RegExp),
  error: PropTypes.instanceOf(RegExp),
  returnValue: PropTypes.func.isRequired
};

export default TextField;
