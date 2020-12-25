import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { postRequest } from "./CallApi";

export default function Header(props) {
  const [searchTerm, setSearchTerm] = useState("Test");

  return (
    <div>
      <TextField
        placeholder='Search'
        className='search__input'
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            window.open(`/Search?search=${searchTerm}`, "_self");
          }
        }}
      />
      {/* <Link to={"/Search?search=" + searchTerm} className='search__button'>
        <button>Search</button>
      </Link> */}
    </div>
  );
}
