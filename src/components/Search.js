import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import {postRequest} from './CallApi'

export default function Header(props){
  return (
      <div>
        <TextField placeholder="Search results logged in console"/>
        <button onClick={()=>{
            postRequest('search/searchuser',
                                               {
                                                 'name': "Test"
                                               },
                                               (res)=>{
                                                 console.log(res)
                                               }
                                              )
        }}>
            Search User
        </button>
      </div>
  );
}
