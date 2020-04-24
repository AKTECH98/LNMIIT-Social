import React from 'react';

import TextField from '@material-ui/core/TextField';
import Header from '../../components/Header';
import Dropdown from '../../components/Dropdown';
import PhotoSelector from '../../components/PhotoSelector';
import DatePicker from '../../components/DatePicker';

export default class EditProfilePage extends React.Component {
  constructor(props){
    super(props);
    this.state={
      photo:null,
      fullName:'Default Name',
      email:'Default Email',
      phone:'Default Phone',
      description:'Enter description about yourself',
      gender:'',
      dateOfBirth:null
    }
  }
    
  render(){
    return(
      <div>
        <Header />
        <div className = "editProfile">
          <div className = "profilePicture">
            <h1 className = "profile__detail">Profile Picture</h1>
            <PhotoSelector 
              aspectRatio={1}
              returnValue={(file) => {                     
                this.setState({photo:file});
              }}
            />
          </div>
          <div className = "personal">
            <h1 className = "profile__detail">Personal Details</h1>
            <TextField 
              label='Full Name'
              defaultValue=''
              variant = "filled"
              style={{
                width: 400,
                marginTop: 5,
                marginBottom: 5
              }}
              InputProps = {{
                style: {
                  fontWeight: 300,
                  color: 'white',
                  fontSize: 20
                }}
              }
              InputLabelProps = {{
                style: {
                  fontWeight: 500,
                  color: 'white',
                  fontSize: 15
                }
              }}
            />
            <TextField 
              label='Email Id'
              defaultValue=''
              variant = "filled"
              style={{
                width: 400,
                marginTop: 5,
                marginBottom: 5
              }}
              InputProps = {{
                style: {
                  fontWeight: 300,
                  color: 'white',
                  fontSize: 20
                }}
              }
              InputLabelProps = {{
                style: {
                  fontWeight: 500,
                  color: 'white',
                  fontSize: 15
                }
              }}
            />
            <TextField 
              label='Phone Number'
              defaultValue=''
              variant = "filled"
              style={{
                width: 400,
                marginTop: 5,
                marginBottom: 5
              }}
              InputProps = {{
                style: {
                  fontWeight: 300,
                  color: 'white',
                  fontSize: 20
                }}
              }
              InputLabelProps = {{
                style: {
                  fontWeight: 500,
                  color: 'white',
                  fontSize: 15
                }
              }}
            />
            <TextField 
              label='College'
              defaultValue=''
              variant = "filled"
              style={{
                width: 400,
                marginTop: 5,
                marginBottom: 5
              }}
              InputProps = {{
                style: {
                  fontWeight: 300,
                  color: 'white',
                  fontSize: 20
                }}
              }
              InputLabelProps = {{
                style: {
                  fontWeight: 500,
                  color: 'white',
                  fontSize: 15
                }
              }}
            />
            <DatePicker 
              label="Date Of Birth"
              format="dd/MM/yyyy"
            />
            <Dropdown 
              label='Gender'
              menuItems={['Male','Female']}
            />
          </div>
        </div>
      </div>
    )
  }
}
