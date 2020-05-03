import React from 'react';
import Header from '../components/Header';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';



let post=[],c=0 ;
export default class HomePage extends React.Component
{
   

    AddPost(){
        alert('Post added');
    }
    render()
    {
        return (
            <div>
            <Header />
          
            
            <Link to={'/ProfilePage'} className = "button--link ProfilePage__link">
            Profile Page
           </Link>
           

            <div>
            <TextField
            className = "login__input"
            variant = "filled"
            style={{
              width: 400,
              marginTop: 5,
              marginBottom: 5
            }}
            InputProps = {
              {
                style: {
                  fontWeight: 300,
                  color: 'white',
                  fontSize: 20
                }
              }
            }
            InputLabelProps = {
              {
                style: {
                  fontWeight: 500,
                  color: 'white',
                  fontSize: 15
                }
              }
            }
            defaultValue=''
            label='Postt'
          />
            <button onClick={this.AddPost}>Add Post</button>
            </div>
            
           

           
           
        </div>
        
        );
    }
}

