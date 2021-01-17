import React from "react";
import {postRequest} from '../components/CallApi'
import Request from '../components/Requests';
import Button from "../components/Button";

import Header from '../components/Header';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

export default class ColabDetails extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            members: ["Author"],
            skills: []
        }
    }

    render(){
        return(
            <div className = "colab--details">
                <div className = "colab--details-left">
                <div className = "colab--type">
                  <h2>Type</h2>
                  <div className = "colab--type-content">
                    <div>
                      <Checkbox
                        checked= {true}
                        style = {{
                          transform: 'scale(1.5)'
                        }}
                        color = "primary"
                        //disabled = {!this.state.admin}
                      />
                      Project
                    </div>
                    <div>
                      <Checkbox
                        checked= {false}
                        style = {{
                          transform: 'scale(1.5)'
                        }}
                        color = "primary"
                        //disabled = {!this.state.admin}
                      />
                      Hackathon
                    </div>
                  </div>
                </div>
                <TextField
                  variant = "outlined"
                  style={{
                    marginTop: 20,
                    marginBottom: 5,
                    width: '100%'
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
                  label='Title*'
                  //onChange = {this.AddTitle}
                  //value = {this.state.title}
                  //disabled = {!this.state.admin}
                />
                <TextField
                  multiline
                  variant = "outlined"
                  style={{
                    marginTop: 10,
                    marginBottom: 5,
                    width: '100%'
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
                  label='Description*'
                  //value = {this.state.description}
                  //onChange = {this.AddDescription}
                  //disabled = {!this.state.admin}
                />
                <TextField
                  variant = "outlined"
                  style={{
                    marginTop: 10,
                    marginBottom: 5,
                    width: '100%'
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
                  label='Github'
                  //value = {this.state.link}
                  //onChange = {(e)=>this.setState({link:e.target.value})}
                  //disabled = {!this.state.admin}
                />

                <div className = "colab--skills">
                  <div className = "colab--skills-header">
                    <h2>Skills</h2>
                    { (true)?
                    <form onSubmit = {(e)=>{
                        e.preventDefault();
                        
                        const skill = e.target.skill.value;
                        e.target.skill.value = ""; 
                        
                        if(skill)
                          this.AddSkill(skill)
                      }}
                    >
                      <TextField
                        id = "skill"
                        style={{
                          width: '100%',
                          height: 'fitContent'
                        }}
                        InputProps = {{
                          style: {
                            color: 'black',
                            fontSize: 15
                          }
                        }}
                        variant = "outlined"
                        placeholder = "Add a Skill..."
                        autoComplete = "off"
                      />
                    </form>
                    :""
                    }
                  </div>
                  <div className = "colab--skills-content">
                  {
                    (this.state.skills.length==0)?
                      "No Skill Requirements"
                    :
                      this.state.skills.map((skill,index)=>(
                        <div className="skill--chip" key = {index}>
                          {skill}
                        {
                          (true)?
                          <span className = "button--close">x</span>
                          :""
                        }
                        </div>
                      ))
                  }
                  </div>
                </div>
              </div>

                <div className = "colab--details-right">
                  <TextField
                    type = "date"
                    defaultValue = {"2021-01-17"}
                    variant = "outlined"
                    style={{
                      marginBottom: 5,
                      width: "100%"
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
                    label='Start Date'
                    //disabled = {!this.state.admin}
                  />
                  <TextField
                    type = "date"
                    defaultValue = {"2021-01-17"}
                    variant = "outlined"
                    style={{
                      marginTop: 10,
                      marginBottom: 5,
                      width: "100%"
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
                    label='End Date'
                    //disabled = {!this.state.admin}
                  />
                
                <TextField
                  variant = "outlined"
                  style={{
                    marginTop: 10,
                    marginBottom: 5,
                    width: '100%'
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
                  label='Mentor'
                  //value = {this.state.mentor}
                  //onChange = {(e)=>this.setState({mentor:e.target.value})}
                  //disabled = {!this.state.admin}
                />

                <div className = "colab--members">
                  <h2>Members : 1</h2>
                  <div className = "colab--members-content">
                    
                    {
                      this.state.members.map((member,index)=>(
                        <div className="member--chip" key = {index}>
                          {member}
                          {/*If Author/Admin */}
                          <div className = "admin--tag">ADIM</div>
                        </div>
                      ))
                    }
                    
                  </div>
                </div>
              </div>
            </div>
        )
    }
}