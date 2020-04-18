import React,{useState,useContext} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import MaterialUITextField from '@material-ui/core/TextField';
import MaterialUIInputAdornment from '@material-ui/core/InputAdornment';

import {ColorsContext} from '../WebsiteMainFiles/GlobalVariables.js';

function TextField(props)
{

    const [value,setValue]=useState(props.defaultValue);
    const [colorValue,setColorValue]=useState(((props.error==undefined)?false:(props.defaultValue.match(props.error) !=null))?useContext(ColorsContext).textFailure:(((props.success==undefined)?false:(props.defaultValue.match(props.success) !=null))?useContext(ColorsContext).textSuccess:useContext(ColorsContext).textDefault))

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
            setColorValue(((error==undefined)?false:(event.target.value.match(error) !=null))?useContext(ColorsContext).textFailure:(((success==undefined)?false:(event.target.value.match(success) !=null))?useContext(ColorsContext).textSuccess:useContext(ColorsContext).textDefault))
            returnValue(event.target.value)
          }
        }

        InputProps={
          {
            disableUnderline:true,
            style: {
              color: colorValue,
              borderBottom:'2px solid '+ colorValue,
            }
          }
        }

        InputLabelProps={{ style: {color:colorValue} }}
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
