import React, { useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const BasicDateTimePicker = (props) => {

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        disabled = {props.disabled}
        variant = "filled"
        style={props.FeildStyle}
        InputProps = {props.inputprops}
        InputLabelProps = {props.LabelStyle}
        onChange={(date)=>{
          props.onChange(date);
        }}
        label={props.label}
        clearable
        format={props.format}
        value={props.value}

      />
    </MuiPickersUtilsProvider>
  );
}

export default BasicDateTimePicker;
