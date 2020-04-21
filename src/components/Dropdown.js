import React,{useState} from 'react';
import PropTypes from "prop-types";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const Dropdown = (props) => {

  const [value,setValue]=useState('');
  const items = []

  const{
    menuItems,
    label,
    returnValue
  } = props;

  return(
    <>
    {
      menuItems.forEach((item,i) => {
        items.push(<MenuItem key={i} value={item}>{item}</MenuItem>)
      })

    }
    <div>{label}</div>
          <Select
            value={menuItems.includes(value)?value:''}
            onChange={(event)=>{
              setValue(event.target.value)
              returnValue(event.target.value)
            }}
          >
            <MenuItem value=""><em>No Option Selected</em></MenuItem>
            {
              items
            }
          </Select>

    </>
  );
}

Dropdown.propTypes = {
  menuItems: PropTypes.array.isRequired,
  label: PropTypes.string,
  returnValue: PropTypes.func
};

export default Dropdown;
