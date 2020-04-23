import React from 'react';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
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
            <>
              <div>{/*For Main Profile*/}
                <h1>Profile Picture</h1>
                <PhotoSelector aspectRatio={1}
                               returnValue={(file)=>{
                                 this.setState({photo:file});
                               }}
                />
                <h1>Personal Details</h1>
                <TextField label='Full Name'
                           defaultValue={this.state.fullName}
                           returnValue={(text)=>{
                             this.setState({fullName:text});
                           }}
                />
                <TextField label='Email Id'
                           defaultValue={this.state.email}
                           returnValue={(text)=>{
                             this.setState({email:text});
                           }}
                />
                <TextField label='Phone Number'
                           defaultValue={this.state.phone}
                           returnValue={(text)=>{
                             this.setState({phone:text});
                           }}
                />
                <TextField multiline
                           label='Description'
                           defaultValue={this.state.description}
                           returnValue={(text)=>{
                             this.setState({emailId:text});
                           }}
                />

                <DatePicker label="Date Of Birth"
                            format="dd/MM/yyyy"
                            returnValue={(date)=>{
                              this.setState({dateOfBirth:date});
                            }}
                />
                <Dropdown label='Gender'
                          menuItems={['Male','Female']}
                          returnValue={(text)=>{
                            this.setState({gender:text});
                          }}
                />
              </div>
              <div>{/*For Adding stuff Profile*/}
                <Button text="Add Posts +"/>
                <Button text="Add Project +"/>
                <Button text="Add Hack Teams +"/>
              </div>
            </>
        )
    }
}
