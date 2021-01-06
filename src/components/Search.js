import React, { useState } from "react";

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
          <input type="text" className = "search__bar" name = "search" placeholder="Search...."/>
        </form>
      </div>
    )
  }
}
