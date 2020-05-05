import React from 'react';
import { Link } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Header from '../../components/Header';
import Dropdown from '../../components/Dropdown';
import PhotoSelector from '../../components/PhotoSelector';
import DatePicker from '../../components/DatePicker';
import Button from '../../components/Button';

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
        <div className = "editProfile__changes">
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
              returnValue={(date) => {
                this.setState({dateOfBirth:date});
              }}
            />
            <Dropdown
              label='Gender'
              menuItems={['Male','Female']}
              returnValue={(option) => {
                this.setState({gender:option});
              }}
            />
          </div>
        </div>
        <Link to = {"/ProfilePage"} >
          <Button text = "Submit Changes" type = "button editProfile__button" />
          <Button text = "Discard Changes" type = "button editProfile__button" />
        </Link>
        </div>
      </div>
    )
  }
}
