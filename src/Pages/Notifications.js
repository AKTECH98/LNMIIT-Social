import React,{useState} from 'react';
import { Link,Redirect } from 'react-router-dom';


import Button from '../components/Button';
import TextField from '@material-ui/core/TextField';
import {postRequest} from '../components/CallApi'

export default function NotificationsPage(props)
{

  	const url = window.location.href;
    const parser = require('url-parameter-parser');
    const res = parser(url);
    const search_term = (res.search==undefined)?"":res.search
    const [notifications,set_notifications] = useState([])
    return(
      <div>
      TODO: Add Header
      <ul>
      
      {
        notifications.map((e,i)=>
          <li>{e}</li>
        )
      }
      {
        (notifications.length==0)?<li>"No notification. TRy creating a project to make it display something"</li>:""
      }
      </ul>
    	{
          postRequest('profile/getnotifications',
                              {
                                'email':window.localStorage.getItem('email'),
                                'password': window.localStorage.getItem('password'),
                              },
                              (res)=>{
                                if(res.message=="SUCCESS")
                                {
                                  console.log(res)
                                  set_notifications(res.notifications)
                                }

                              }
               )
      }
       
      </div>

    );
}
