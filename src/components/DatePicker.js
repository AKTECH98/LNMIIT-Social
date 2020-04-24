import React, { useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const BasicDateTimePicker = (props) => {
  const [selectedDate, handleDateChange] = useState(props.defaultValue==undefined?null:props.defaultValue);

  const{
    label,
    format,
    returnValue
  }=props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        label={label}
        clearable
        format={format}
        value={selectedDate}
        onChange={(date)=>{
          handleDateChange(date);
          returnValue(date);
        }}
      />
    </MuiPickersUtilsProvider>
  );
}

export default BasicDateTimePicker;
