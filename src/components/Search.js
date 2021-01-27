import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';

export default class Search extends React.Component {

  render(){
    return (
      <div>
        <form onSubmit = {(e)=>{
            e.preventDefault();
            const search = e.target.search.value; 
            window.open(`/Search?search=${search}`, "_self");
            e.target.search.value = '';
          }}
        >
          <TextField
            id = "search"
            style={{
              width: '100%',
              height: 'fitContent',
            }}
            InputProps = {{
              style: {
                color: 'black',
                fontSize: 16
              }
            }}
            variant = "outlined"
            placeholder = "Search...."
            autoComplete = "off"
          />
        </form>
      </div>
    )
  }
}
