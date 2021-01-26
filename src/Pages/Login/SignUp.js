import React from 'react';
import { Redirect } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '../../components/Button';
import Header from '../../components/Header';
import MenuItem from '@material-ui/core/MenuItem';

import {postRequest} from '../../components/CallApi'

export default class SignUp extends React.Component
{
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      confirmPassword:'',
      name: '',
      batch: null,
      batches: [],
      btnLoad: false,
      errorMessage:'',
      redirect:false
    };
  }

  componentDidMount(){
    let date = new Date()
    const year = date.getFullYear()

    let options = []
    for(var i=2000;i<=year;i++)
    {
      options.push(i);
    }

    options.push("Faculty")
    this.setState({batches:options})
  }

  handleSignup = (event) => {

    event.preventDefault()
    this.setState({btnLoad:true});

    if (this.state.password ==this.state.confirmPassword)
    {
      this.setState({errorMessage:'Passwords Do Not Match'})
      this.setState({btnLoad:false})
    }
    else if(this.state.batch==null)
    {
      this.setState({errorMessage:'Select a batch'})
      this.setState({btnLoad:false})
    }
    else
    {
      postRequest('login/signup',
        {
          'email':this.state.email,
          'name': this.state.name,
          'password': this.state.password,
          'batch': this.state.batch,
          'phone': this.state.phone
        },
        (res)=>{
          if(res.message=="SUCCESS")
          {
            this.setState({redirect:true})
          }
          this.setState({errorMessage:res.reason})
          this.setState({btnLoad:false})
        }
      )
    }
  }

  signUpEmail = (e) => {
    this.setState({
      email : e.target.value,
      errorMessage : null
    })
  }

  signUpPassword = (e) => {
    this.setState({
      password : e.target.value,
      errorMessage : null
    })
  }

  signUpConfirm = (e) => {
    this.setState({
      confirmPassword: e.target.value,
      errorMessage: null
    })
  }

  render()
  {
    return(
      <div>
      <Header/>
      <div className = "signup--page">
        <p className = "signup__byline">REGISTER and Connect Your Skills</p>
        <form onSubmit = {this.handleSignup}>
          <div className = "signup">
            <div className = "signup--details">
              <TextField
                variant = "filled"
                style={{
                  width: '75%',
                  margin: 5,
                }}
                InputProps = {{
                  style: {
                    fontWeight: 300,
                    color: 'black',
                    fontSize: 20
                  }
                }}
                InputLabelProps = {{
                  style: {
                    fontWeight: 500,
                    color: 'purple',
                    fontSize: 15
                  }
                }}
                defaultValue={this.state.email}
                onChange={this.signUpEmail}
                label='Email'
                autoComplete = "username"
              />
              <TextField
                variant = "filled"
                style={{
                  width: '50%',
                  margin: 5
                }}
                InputProps = {{
                  style: {
                    fontWeight: 300,
                    color: 'black',
                    fontSize: 20
                  }
                }}
                InputLabelProps = {{
                  style: {
                    fontWeight: 500,
                    color: 'purple',
                    fontSize: 15
                  }
                }}
                defaultValue={this.state.email}
                onChange={(e)=>{this.setState({name:e.target.value})}}
                label='Full Name'
              />
              <TextField
                select
                style={{
                  width: '25%',
                  margin: 5
                }}
                InputProps = {{
                  style: {
                    fontWeight: 300,
                    color: 'black',
                    fontSize: 20
                  }
                }}
                InputLabelProps = {{
                  style: {
                    fontWeight: 500,
                    color: 'purple',
                    fontSize: 15
                  }
                }}
                label="Batch/Faculty"
                onChange={(e)=>this.setState({batch:e.target.value})}
                variant="filled"
              >
                {this.state.batches.map((batch) => (
                  <MenuItem key={batch} value={batch}>
                    {batch}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                variant = "filled"
                style={{
                  width: '60%',
                  margin: 5
                }}
                InputProps = {{
                  style: {
                    fontWeight: 300,
                    color: 'black',
                    fontSize: 20
                  }
                }}
                InputLabelProps = {{
                  style: {
                    fontWeight: 500,
                    color: 'purple',
                    fontSize: 15
                  }
                }}
                onChange={(e)=>{this.setState({phone:e.target.value})}}
                label='Phone No.'
              />
              <div className = "signup__connect">
              {
                (this.state.btnLoad)?<p><i className="fa fa-spinner fa-spin"></i>Connecting</p>:
                <Button text='Connect'
                        type = 'button signup__button'
                        onClick = {this.handleSignup}
                />
              }
              </div>
            </div>
            <div className = "signup--password">
            <TextField
              variant = "filled"
              style={{
                width: '70%',
                marginTop: 5,
                marginBottom: 5
              }}
              InputProps = {{
                style: {
                  fontWeight: 300,
                  color: 'black',
                  fontSize: 20
                }
              }}
              InputLabelProps = {{
                style: {
                  fontWeight: 500,
                  color: 'purple',
                  fontSize: 15
                }
              }}
              onChange={this.signUpPassword}
              defaultValue={this.state.password}
              label='Password'
              type="password"
              autoComplete = "current-password"
            />
            <TextField
              variant = "filled"
              style={{
                width: '70%',
                marginTop: 5,
                marginBottom: 5
              }}
              InputProps = {{
                style: {
                  fontWeight: 300,
                  color: 'black',
                  fontSize: 20
                }
              }}
              InputLabelProps = {{
                style: {
                  fontWeight: 500,
                  color: 'purple',
                  fontSize: 15
                }
              }}
              onChange={this.signUpConfirm}
              defaultValue={this.state.confirmPassword}
              label='Confirm Password'
              type="password"
              autoComplete = "password"
            />
            <div className = "signup--password-hints">
              <h2>Hints :</h2>
              <ul>
                <li>E-mail id should be of "@lnmiit.ac.in" domain</li>
                <li>Password should be 8-30 characters long</li>
                <li>Should have atleast one <b>UPPER</b> and one <b>lower</b> case letter a-z</li>
                <li>Should contain atleast one digit 0-9</li>
                <li>Should contain atleast onr special symbol !,@,#,,$,%,^,&,(,),* </li>
              </ul>
            </div>
            </div>
          </div>

          {(this.state.errorMessage)?<p className = "error">*{this.state.errorMessage}*</p>:""}
            
          {this.state.redirect?<Redirect to ='/Front'/>:""}

        </form>
      </div>
      </div>
    );
};
};
