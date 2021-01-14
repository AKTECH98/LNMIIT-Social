import React from "react";
import {postRequest} from '../components/CallApi'

import Header from '../components/Header';
import TextField from '@material-ui/core/TextField';
import Request from '../components/Requests';
import Button from "../components/Button";

export default class FullColab extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      skills: [],
      members: ["Author"],
      colab_id: '',
      link: '',
      colab: false,
      title:'', 
      startDate: null, 
      endDate:null,
      skills_required:'',
      mentor: " ",
      description:'',
      users: []
    }
  }

  AddSkill = (skill) => {
      this.setState((prevState)=>({skills : prevState.skills.concat(skill)}))
  }

  formatDate = () => {
    var d = new Date(),

    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  componentDidMount(){
    const url = window.location.href;
    const parser = require('url-parameter-parser');
    const res = parser(url);
    
    this.setState({colab_id:res.colabID})

    postRequest('project/getinterestedmembers',
      {
        'email':window.localStorage.getItem('email'),
        'password': window.localStorage.getItem('password'),
        'project_id': res.colabID
      },
      (res)=>{
        if(res.message=="SUCCESS")
        {
          //console.log(res)
          this.setState({users:res.users})
        }
      }
    )

    postRequest('project/getcolabdetails',
      {
        'email':window.localStorage.getItem('email'),
        'password': window.localStorage.getItem('password'),
        'colab_id': res.colabID
      },
      (res)=>{
        if(res.message=="SUCCESS")
        {
          //console.log(res.return_value)
          this.setState(() => (
            {
              link:res.return_value.link,
              colab:res.return_value.colab,
              title:res.return_value.title, 
              startDate:res.return_value.startDate, 
              endDate:res.return_value.endDate,
              skills_required:res.return_value.skills_required,
              mentor:res.return_value.mentor,
              description:res.return_value.description
            })
          )

          console.log(this.state.skills_required)
        }
      }
    )
  }

  render() {
    return (
      <div>
        <Header logout = {true}/>
        <div className = "collaboration">
         
          <div className = "colab--details">
              <div className = "colab--details-left">
              <TextField
                variant = "outlined"
                style={{
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
                label='Title'
                value = {this.state.title}
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
                label='Description'
                value = {this.state.description}
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
                value = {this.state.link}
              />

              <div className = "colab--skills">
                <div className = "colab--skills-header">
                  <h2>Skills</h2>
                  <form onSubmit = {(e)=>{
                      e.preventDefault();
                      const skill = e.target.skill.value; 
                      //console.log("Hello")
                      if(skill)
                        this.AddSkill(skill)
                    }}
                  >
                    <input type="text" className = "skill__bar" name = "skill" placeholder="Add a Skill..."/>
                  </form>
                </div>
                <div className = "colab--skills-content">
                {
                  (this.state.skills.length==0)?
                    "No Skill Requirements"
                  :
                    this.state.skills.map((skill,index)=>(
                      <div className="skill--chip" key = {index}>
                        {skill}
                      <span className = "button--close">x</span>
                      </div>
                    ))
                }
                </div>
              </div>
            </div>

              <div className = "colab--details-right">
                <TextField
                  type = "date"
                  defaultValue = {this.formatDate()}
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
                />
                <TextField
                  type = "date"
                  defaultValue = {this.formatDate()}
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
                value = {this.state.mentor}
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

          <div className = "colab--requests">
            <Request users = {this.state.users} id = {this.state.colab_id}/>
          </div>
        </div>
        <center><Button text = "Save Changes" type = "button"/></center>
      </div>
    );
  }
}
