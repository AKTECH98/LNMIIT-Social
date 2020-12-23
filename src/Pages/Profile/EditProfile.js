import React from 'react';

import TextField from '@material-ui/core/TextField';
import Header from '../../components/Header';

import PhotoSelector from '../../components/PhotoSelector';
import Button from '../../components/Button';
import {postRequest} from '../../components/CallApi'
import LoginContext from '../../contexts/LoginContext';

export default class EditPage extends React.Component {
  constructor(props){
    super(props);
    this.state={
      photo:null,
      firstName:'',
      lastName:'',
      phone:'',
      altEmail: '',
      about:'',
      headline: '',
      linkedin: '',
      github: '',
      codeforces: '',
      codechef: '',
      error: false,
      errorMessage: "Enter All Fields Marked *"
    }

    
  }

  render(){
    return(
    <LoginContext.Consumer>
      {(loginData)=>{return (
      <div>
      {postRequest('profile/getprofiledetails',
          {
            'email':localStorage.email,
            'password':localStorage.password
          },
          (res)=>{
                this.setState({
                  firstName:res.response.first_name,
                  lastName:res.response.last_name,
                  altEmail: res.response.email,
                  phone:res.response.phone,
                  about:res.response.profile_description,
                  headline: res.response.headline,
                  linkedin: res.response.linkedin,
                  github: res.response.github,
                  codeforces: res.response.codeforces,
                  codechef: res.response.codechef
                })
          }
        )}
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
            <div className = "profile__name">
              <TextField
                label='First Name*'
                value={this.state.firstName}
                onChange={(e)=>this.setState({firstName:e.target.value})}
                variant = "filled"
                style={{
                  width: 175,
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
              />
              <TextField
                label='Last Name*'
                value={this.state.lastName}
                onChange={(e)=>this.setState({lastName:e.target.value})}
                variant = "filled"
                style={{
                  width: 175,
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
              />
            </div>
            <TextField
              label='Headline*'
              value={this.state.headline}
              onChange={(e)=>this.setState({headline:e.target.value})}
              variant = "filled"
              style={{
                width: 360,
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
            />
            <TextField
              label='About YourSelf*'
              value={this.state.about}
              onChange={(e)=>this.setState({about:e.target.value})}
              multiline
              variant = "filled"
              style={{
                width: 360,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 30
                
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
            />
          </div>
          <div className = "profile__contact">
            <h1 className = "profile__detail">Profile Contacts</h1>
            <div className = "contact__details">
              <TextField
                label='Phone Number*'
                value={this.state.phone}
                onChange={(e)=>this.setState({phone:e.target.value})}
                variant = "filled"
                style={{
                  width: 250,
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
              />
              <TextField
                label='E-Mail*'
                value={this.state.altEmail}
                onChange={(e)=>this.setState({altEmail:e.target.value})}
                variant = "filled"
                style={{
                  width: 250,
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
              />
            </div>
            <div className = "profile__links">
              <h2 className = "profile__detail">Links</h2>
              <div className = "profile__profess">
                <TextField
                  label='Github'
                  value={this.state.github}
                  onChange={(e)=>this.setState({github:e.target.value})}
                  variant = "filled"
                  style={{
                    width: 250,
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
                />
                <TextField
                  label='Linkedin*'
                  value={this.state.linkedin}
                  onChange={(e)=>this.setState({linkedin:e.target.value})}
                  variant = "filled"
                  style={{
                    width: 250,
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
                />
              </div>
              <div className = "profile__coding">
                <TextField
                  label='Codeforces'
                  value={this.state.codeforces}
                  onChange={(e)=>this.setState({codeforces:e.target.value})}
                  variant = "filled"
                  style={{
                    width: 250,
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
                />
                <TextField
                  label='CodeChef'
                  value={this.state.codechef}
                  onChange={(e)=>this.setState({codechef:e.target.value})}
                  variant = "filled"
                  style={{
                    width: 250,
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
                />
              </div>
            </div>
          </div>
        </div>

        <Button
          text = "Submit Changes"
          type = "button editProfile__button"
          onClick = {()=>{
            if(!this.state.firstName || !this.state.lastName || !this.state.phone)
              this.setState({error:true})
            else if(!this.state.about || !this.state.headline || !this.state.altEmail || !this.state.linkedin)
              this.setState({error:true})
            else
            {
              this.setState({error:false})

              postRequest('profile/editprofiledetails',
                {
                  'email':loginData.email,
                  'password':loginData.password,
                  'first_name':this.state.firstName,
                  'last_name':this.state.lastName,
                  'phone':this.state.phone,
                  'about':this.state.about,
                  'headline':this.state.headline,
                  'altEmail':this.state.altEmail,
                  'github':this.state.github,
                  'linkedin':this.state.linkedin,
                  'codeforces':this.state.codeforces,
                  'codechef':this.state.codechef
                },
                (res)=>{
                  if(res.message=="SUCCESS")
                  {
                    var x = document.getElementById("snackbar");
                    x.className = "show";
                    setTimeout(function(){ x.className = x.className.replace("show", ""); },1000);
                  }

                  this.setState({errorMessage:res.reason})
                }
              )
            }
          }}
        />
        { (this.state.error)?
          <p className = "error">{this.state.errorMessage}</p>
          :""
        }
        <div id="snackbar">SAVED</div>
        </div>
      </div>)}}
    </LoginContext.Consumer>
    )
  }
}
