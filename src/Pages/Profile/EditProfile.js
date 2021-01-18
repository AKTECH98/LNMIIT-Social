import React from "react";

import TextField from "@material-ui/core/TextField";
import Header from "../../components/Header";
import DefaultUser from "../../img/DefaultUser.jpg";
import PhotoSelector from "../../components/PhotoSelector";
import Button from "../../components/Button";
import { postRequest } from "../../components/CallApi";

import IconButton from "@material-ui/core/IconButton";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";

import Avatar from "react-avatar-edit";

import ImageUploader from "react-images-upload";

export default class EditPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loader: true,
      photo: null,
      name: "",
      phone: "",
      email: "",
      altEmail: "",
      about: "",
      headline: "",
      linkedin: "",
      github: "",
      codeforces: "",
      codechef: "",
      error: false,
      errorMessage: "Enter All Fields Marked *",
      bacth: "",
      editImage: false,
      old_avatar:"",
      avatar:"",
      new_avatar:"",
      backgroundImage:"",/*Replace with URL of loading icon*/
      editImageBackground: false,
      pictures: null,
    };
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this);
  }
  componentDidMount() {
    postRequest(
      "profile/getprofiledetails",
      {
        email: window.localStorage.getItem("email"),
        password: window.localStorage.getItem("password"),
      },
      (res) => {
        this.setState({
          name: res.response.name,
          altEmail: res.response.email,
          phone: res.response.phone,
          about: res.response.profile_description,
          headline: res.response.headline,
          linkedin: res.response.linkedin,
          github: res.response.github,
          codeforces: res.response.codeforces,
          codechef: res.response.codechef,
          backgroundImage: res.response.background_image,
          old_avatar: res.response.profile_image,
          avatar: res.response.profile_image,
          new_avatar: res.response.profile_image,
          loader: false
        });
      }
    );
  }

  onClose() {
      this.setState({ editImage: false, avatar:this.state.old_avatar });
  }

  onCrop(preview) {
    this.setState({ avatar:preview });
  }

  onBeforeFileLoad(elem) {
    if (elem.target.files[0].size > 71680) {
      alert("File is too big!");
      elem.target.value = "";
    }
  }


  render() {
    return (
      <div>
        <Header logout={true} />
        <div className = "edit__detail">
        {
          (this.state.loader)?
          <center><div className = "loader--square"><div/><div/></div></center>
          :
          <>
          <div className='edit__detail--top'>
            <div className='edit__detail--picture'>
              <div className = "profile--image">
                <h1>
                  Profile Picture
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({old_avatar:this.state.avatar})
                      this.setState({ editImage: true,avatar:""});
                    }}
                  >
                    <EditTwoToneIcon style={{ fontSize: 25, color: "blue" }} />
                  </IconButton>
                </h1>
                <center>
                {this.state.editImage ?
                  <div>
                  <button onClick={()=>{this.setState({new_avatar:this.state.avatar,old_avatar:this.state.avatar,editImage: false})}}>{this.state.avatar?"Save":"Default profile picture"}</button>
                  <Avatar
                    width={300}
                    height={170}
                    onCrop={this.onCrop}
                    onClose={this.onClose}
                    src={this.state.avatar}
                    img={this.state.avatar}
                  />
                  </div>
                 :
                  <img src={this.state.avatar?this.state.avatar:DefaultUser} alt='Avatar' height = {170} />
                }
                </center>
              </div>
              <div className = "background--image">
                <h1>
                  Background Picture
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({ editImageBackground: true });
                    }}
                  >
                    <EditTwoToneIcon style={{ fontSize: 25, color: "blue" }} />
                  </IconButton>
                </h1>
                <div>
                  {!this.state.editImageBackground ? (
                    <div>
                      <img
                        src={this.state.backgroundImage}
                        style={{
                          width: "300px",
                          height: "170px",
                          margin: "auto",
                          display: "flex",
                          position: "relative",
                          justifyContent: "center",
                        }}
                        alt=''
                      />
                    </div>
                  ) : (
                    <>
                    <div><button onClick={()=>{this.setState({editImageBackground:false})}}>Cancel</button></div>
                    <ImageUploader
                      withIcon={true}
                      buttonText="Choose Background Image"
                      onChange={(file)=>{
                        if (file.length==1)
                        {
                          let fileReader = new FileReader();
                          fileReader.addEventListener("load", (e)=>{
                            this.setState({
                              backgroundImage:e.target.result,
                              editImageBackground: false
                            })
                          }); 
                          fileReader.readAsDataURL(file[0]);
                      
                        }
                        
                        
                      }}
                      imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                      singleImage =  {true} 
                      maxFileSize={5242880}
                      withPreview={true}
                    />
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className='edit__detail--personal'>
              <h1>Personal Details</h1>
              <TextField
                label='Full Name*'
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
                variant='filled'
                style={{
                  width: "40%",
                  marginLeft: 10,
                  marginRight: 5,
                  marginBottom: 5,
                }}
                InputProps={{
                  style: {
                    fontWeight: 300,
                    color: "black",
                    fontSize: 20,
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontWeight: 500,
                    color: "purple",
                    fontSize: 15,
                  },
                }}
                disabled
              />
              <TextField
                label='Batch'
                value={this.state.batch}
                onChange={(e) => this.setState({ batch: e.target.value })}
                variant='filled'
                style={{
                  width: "20%",
                  marginLeft: 5,
                  marginRight: 10,
                  marginBottom: 5,
                }}
                InputProps={{
                  style: {
                    fontWeight: 300,
                    color: "black",
                    fontSize: 20,
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontWeight: 500,
                    color: "purple",
                    fontSize: 15,
                  },
                }}
                disabled
              />
              <TextField
                label='Headline*'
                value={this.state.headline}
                onChange={(e) => this.setState({ headline: e.target.value })}
                variant='filled'
                style={{
                  width: "60%",
                  margin: 10,
                }}
                InputProps={{
                  style: {
                    fontWeight: 300,
                    color: "black",
                    fontSize: 20,
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontWeight: 500,
                    color: "purple",
                    fontSize: 15,
                  },
                }}
              />
              <TextField
                label='Description About Yourself'
                value={this.state.about}
                onChange={(e) => this.setState({ about: e.target.value })}
                multiline
                variant='filled'
                style={{

                  width: '60%',
                  margin: 10

                }}
                InputProps={{
                  style: {
                    fontWeight: 300,
                    color: "black",
                    fontSize: 20,
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontWeight: 500,
                    color: "purple",
                    fontSize: 15,
                  },
                }}
              />
            </div>
          </div>

          <div className='edit__detail--bottom'>
            <div className='edit__detail--contact'>
              <h1>Contact Details</h1>
              <div>
                <TextField
                  label='Phone Number'
                  value={this.state.phone}
                  onChange={(e) => this.setState({ phone: e.target.value })}
                  variant='filled'
                  style={{
                    width: 400,
                    margin: 10,
                  }}
                  InputProps={{
                    style: {
                      fontWeight: 300,
                      color: "black",
                      fontSize: 20,
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontWeight: 500,
                      color: "purple",
                      fontSize: 15,
                    },
                  }}
                />
                <TextField
                  label='E-Mail'
                  value={this.state.email}
                  variant='filled'
                  style={{
                    width: 400,
                    margin: 10,
                  }}
                  InputProps={{
                    style: {
                      fontWeight: 300,
                      color: "black",
                      fontSize: 20,
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontWeight: 500,
                      color: "purple",
                      fontSize: 15,
                    },
                  }}
                  disabled
                />
                <TextField
                  label='Alternate E-Mail'
                  value={this.state.altEmail}
                  onChange={(e) => this.setState({ altEmail: e.target.value })}
                  variant='filled'
                  style={{
                    width: 400,
                    margin: 10,
                  }}
                  InputProps={{
                    style: {
                      fontWeight: 300,
                      color: "black",
                      fontSize: 20,
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontWeight: 500,
                      color: "purple",
                      fontSize: 15,
                    },
                  }}
                />
              </div>
            </div>
            <div className='edit__detail--links'>
              <h2>Links</h2>
              <TextField
                label='Linkedin'
                value={this.state.linkedin}
                onChange={(e) => this.setState({ linkedin: e.target.value })}
                variant='filled'
                style={{
                  width: 400,
                  margin: 10,
                }}
                InputProps={{
                  style: {
                    fontWeight: 300,
                    color: "black",
                    fontSize: 20,
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontWeight: 500,
                    color: "purple",
                    fontSize: 15,
                  },
                }}
              />
              <TextField
                label='Github'
                value={this.state.github}
                onChange={(e) => this.setState({ github: e.target.value })}
                variant='filled'
                style={{
                  width: 400,
                  margin: 10,
                }}
                InputProps={{
                  style: {
                    fontWeight: 300,
                    color: "black",
                    fontSize: 20,
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontWeight: 500,
                    color: "purple",
                    fontSize: 15,
                  },
                }}
              />
              <TextField
                label='Codeforces'
                value={this.state.codeforces}
                onChange={(e) => this.setState({ codeforces: e.target.value })}
                variant='filled'
                style={{
                  width: 400,
                  margin: 10,
                }}
                InputProps={{
                  style: {
                    fontWeight: 300,
                    color: "black",
                    fontSize: 20,
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontWeight: 500,
                    color: "purple",
                    fontSize: 15,
                  },
                }}
              />
              <TextField
                label='CodeChef'
                value={this.state.codechef}
                onChange={(e) => this.setState({ codechef: e.target.value })}
                variant='filled'
                style={{
                  width: 400,
                  margin: 10,
                }}
                InputProps={{
                  style: {
                    fontWeight: 300,
                    color: "black",
                    fontSize: 20,
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontWeight: 500,
                    color: "purple",
                    fontSize: 15,
                  },
                }}
              />
            </div>
          </div>

          {this.state.error ? (
            <p className='error'>{this.state.errorMessage}</p>
          ) : (
            ""
          )}
          <Button
            text='Save Changes'
            type='button edit__detail--button'
            onClick={() => {
              if (!this.state.name) this.setState({ error: true });
              else if (!this.state.headline) this.setState({ error: true });
              else {
                this.setState({ error: false });
                if (!this.state.about || !this.state.about.trim()) {
                  this.setState({ about: "" });
                }
                postRequest(
                  "profile/editprofiledetails",
                  {
                    email: window.localStorage.getItem("email"),
                    password: window.localStorage.getItem("password"),
                    name: this.state.name,
                    phone: this.state.phone,
                    about: this.state.about,
                    headline: this.state.headline,
                    altEmail: this.state.altEmail,
                    github: this.state.github,
                    linkedin: this.state.linkedin,
                    codeforces: this.state.codeforces,
                    codechef: this.state.codechef,
                    background_image: this.state.backgroundImage,
                    profile_image: this.state.new_avatar
                  },
                  (res) => {
                    if (res.message == "SUCCESS") {
                      var x = document.getElementById("snackbar");
                      x.className = "show";
                      setTimeout(function () {
                        x.className = x.className.replace("show", "");
                      }, 1000);
                    }

                    this.setState({ errorMessage: res.reason });
                  }
                );
              }
            }}
          />
          </>
        }
        </div>
        <div id='snackbar'>SAVED</div>
      </div>
    );
  }
}
