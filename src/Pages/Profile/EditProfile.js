import React from 'react';
import { Link,Redirect } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Header from '../../components/Header';
import Dropdown from '../../components/Dropdown';
import PhotoSelector from '../../components/PhotoSelector';
import DatePicker from '../../components/DatePicker';
import Button from '../../components/Button';
import {postRequest} from '../../components/CallApi'

export default class EditProfilePage extends React.Component {
  constructor(props){
    super(props);
    let temp = null
    this.state={
      photo:null,
      firstName:'',
      middleName:'',
      lastName:'',
      phone:'',
      description:'',
      gender:'',
      dateOfBirth:null
    }
    postRequest('profile/getprofiledetails',
                               {
                                 'email':window.localStorage.getItem('email'),
                                 'password':window.localStorage.getItem('password')
                               },
                               (res)=>{
                                      this.setState({firstName:res.response.first_name})
                                      this.setState({middleName:res.response.middle_name})
                                      this.setState({lastName:res.response.last_name})
                                      this.setState({phone:res.response.phone})
                                      this.setState({description:res.response.profile_description})
                                      this.setState({gender:res.response.gender})
                                      this.setState({dateOfBirth:(res.response.date_of_birth==null)?null:new Date(Date.parse(res.response.date_of_birth,'yyyy-mm-dd'))})

                                }
                )
  }

  render(){

    return(
      <div>
        <Header logout={true}/>
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
              label='First Name'
              value={this.state.firstName}
              onChange={(e)=>this.setState({firstName:e.target.value})}
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
              label='Middle Name'
              value={this.state.middleName}
              onChange={(e)=>this.setState({middleName:e.target.value})}
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
              label='Last Name'
              value={this.state.lastName}
              onChange={(e)=>this.setState({lastName:e.target.value})}
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
              value={this.state.phone}
              onChange={(e)=>this.setState({phone:e.target.value})}
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
              label='Profile Description'
              value={this.state.description}
              onChange={(e)=>this.setState({description:e.target.value})}
              multiline
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
              value={this.state.dateOfBirth}
              label="Date Of Birth"
              format="yyyy-MM-dd"
              onChange={(date)=>{
                this.setState({dateOfBirth:date})}
              }
            />
            <Dropdown
              value ={this.state.gender}
              label = 'Gender'
              menuItems = {['Male','Female']}
              returnValue = {(value)=>{this.setState({gender:value})}}
            />
          </div>
        </div>

      <Link to = {"/ProfilePage"} >
          <Button
            text = "Submit Changes"
            type = "button editProfile__button"
            onClick = {()=>{
              let date_to_post=null
              if (this.state.dateOfBirth!=null){

                var d = new Date(this.state.dateOfBirth),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

                if (month.length < 2)
                    month = '0' + month;
                if (day.length < 2)
                    day = '0' + day;
              date_to_post =[year, month, day].join('-')

            }

              postRequest('profile/editprofiledetails',
                                       {
                                         'email':window.localStorage.getItem('email'),
                                         'password':window.localStorage.getItem('password'),
                                         'first_name':this.state.firstName,
                                         'middle_name':this.state.middleName,
                                         'last_name':this.state.lastName,
                                         'phone':this.state.phone,
                                         'description':this.state.description,
                                         'gender':this.state.gender,
                                         'date_of_birth':date_to_post,
                                       },
                                       (res)=>{
                                         if(res.message=="SUCCESS")
                                         {
                                           console.log('SUCCESS')
                                         }

                                         this.setState({errorMessage:res.reason})
                                       }
                        )}}
          />
          <Button text = "Discard Changes" type = "button editProfile__button" />
        </Link>
        </div>
      </div>
    )
  }
}
