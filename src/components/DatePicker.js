import React, { useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const BasicDateTimePicker = (props) => {
  const [selectedDate, handleDateChange] = useState(props.default==undefined?null:props.default);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        disabled = {props.disabled}
        variant = "filled"
        style={props.FeildStyle}
        InputProps = {props.inputprops}
        InputLabelProps = {props.LabelStyle}
        onChange={(date)=>{
          handleDateChange(date);
          props.Change(date);
        }}
        label={props.label}
        clearable
        format={props.format}
        value={selectedDate}

      />
    </MuiPickersUtilsProvider>
  );
}

export default BasicDateTimePicker;
