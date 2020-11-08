import React,{useState} from 'react';
import { Link,Redirect } from 'react-router-dom';
import Recaptcha from "react-recaptcha";


import Button from '../components/Button';
import TextField from '@material-ui/core/TextField';
import {postRequest} from '../components/CallApi'

export default function SearchPage(props)
{

  	const url = window.location.href;
    const parser = require('url-parameter-parser');
    const res = parser(url);
    const search_term = (res.search==undefined)?"":res.search
    const [results,set_results] = useState([])
    return(
      <div>
      <table>
      <tr>
      <th>First name</th>
      <th>Middle name</th>
      <th>Last name</th>
      <th>Email Id</th>
      
      </tr>
      {
        results.map((e,i)=>
          <tr>
            <td>
              {e.first_name}
            </td>
            <td>
              {e.middle_name}
            </td>
            <td>
              {e.last_name}
            </td>
            <td>
              {e.email}
            </td>
            
          </tr>
        )
      }</table>
    	{
          postRequest('search/searchuser',
          {
            'name':search_term                 
          },
          (res)=>{
              set_results(res.users)
            }
        )
      }
       
      </div>

    );
}
