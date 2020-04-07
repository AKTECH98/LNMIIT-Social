import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import MaterialUITextField from '@material-ui/core/TextField';
import MaterialUIInputAdornment from '@material-ui/core/InputAdornment';

import GlobalVariables from 'WebsiteMainFiles/GlobalVariables.js';

export default class TextField extends React.Component
{
  constructor(props){
    super(props);
    this.state={
      value:props.defaultValue,
      colorValue: (((props.error==undefined)?false:(props.defaultValue.match(props.error) !=null))?GlobalVariables.colors.failure:(((props.success==undefined)?false:(props.defaultValue.match(props.success) !=null))?GlobalVariables.colors.success:GlobalVariables.colors.default))
    };

  }
  render()
  {
    const {
      label,
      disabled,
      error,
      success,
      returnValue
    } = this.props;

    return(
      <MaterialUITextField
        fullWidth
        label={label}
        disabled={(disabled==undefined)?false:disabled}
        value={this.state.value}
        onChange={(event)=>{
            this.setState({value:event.target.value})
            this.setState({colorValue: (((error==undefined)?false:(event.target.value.match(error) !=null))?GlobalVariables.colors.failure:(((success==undefined)?false:(event.target.value.match(success) !=null))?GlobalVariables.colors.success:GlobalVariables.colors.default))})
            returnValue(event.target.value)
          }
        }

        InputProps={
          {
            disableUnderline:true,
            style: {
              color: this.state.colorValue,
              borderBottom:'2px solid '+ this.state.colorValue,
            }
          }
        }

        InputLabelProps={{ style: {color:this.state.colorValue} }}
      />
    );
  }
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
