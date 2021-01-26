import React from "react";
import {Link} from 'react-router-dom';
import {postRequest} from '../components/CallApi'
import Chats from '../components/Chats'
import Button from "../components/Button";
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

export default class ColabDetails extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      error: false,
      saving: false,
      admin: true,
      colab_id: '',
      title:'', 
      mentor: " ",
      startDate: this.formatDate(), 
      endDate:this.formatDate(),
      skills_required:'',
      skills: [],
      description:'',
      members: [{name:"You",email:window.localStorage.email,"admin":true}],
      member_count: "1",
      link: '',
      colab: false,
      colab_type: "OTHER",
      isMember: false,
    }
  }

  componentDidMount(){
    const url = window.location.href;
    const parser = require('url-parameter-parser');
    const res = parser(url);

    if(res.colabID!=undefined)
    {
      this.setState({colab_id:res.colabID})

      postRequest('project/fetchprojectmembers',
        {
          'email':window.localStorage.getItem('email'),
          'password': window.localStorage.getItem('password'),
          'project_id': res.colabID
        },
        (res)=>{
          if(res.message=="SUCCESS")
          {
            //console.log(res.return_value)
            this.setState({members:res.results})
            
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
                admin: res.return_value.admin,
                isMember: res.return_value.is_member,
                link:res.return_value.link,
                colab:res.return_value.colab,
                title:res.return_value.title, 
                startDate:res.return_value.startDate, 
                endDate:res.return_value.endDate,
                skills_required:res.return_value.skills_required,
                mentor:res.return_value.mentor,
                member_count: res.return_value.member_count,
                description:res.return_value.description,
                colab_type:res.return_value.colab_type,
              })
            )

            let skills;

            if(this.state.skills_required!=null)
            {
              skills = this.state.skills_required.split(",")
              this.setState({skills:skills})
            }
          }
        }
      )
    }
  }

  AddSkill = (skill) => {
  
    this.setState((prevState)=>({
      skills : prevState.skills.concat(skill)
    }))

    if(this.state.skills_required==null)
    {
      this.setState({skills_required : skill})  
    }
    else
    {
      this.setState((prevState)=>({
        skills_required : prevState.skills_required.concat(","+skill)
      }))
    }
}

  DeleteSkill = (index) => {

    let skills = this.state.skills;
    skills.splice(index,1);

    this.setState({skills})
    let new_skill_set = ""
    
    for(var i=0;i<this.state.skills.length;i++)
    {
      if(i>0)
        new_skill_set += ","

      new_skill_set += this.state.skills[i];
    }

    this.setState({skills_required:new_skill_set})
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

  AddTitle = (e) => {
    const title = e.target.value;

    if(this.state.error==true)
    {
      this.setState(() => ({error: false, title}))
    }
    else
      this.setState(() => ({ title }))
  };

  AddDescription = (e) => {
    const description = e.target.value;

    if(this.state.error==true)
    {
      this.setState(() => ({error: false, description}))
    }
    else
      this.setState(() => ({ description }))
  };

  SaveDetails = () => {

    this.setState(()=>({saving:true}))
    if(!this.state.title || !this.state.description){
      this.setState(() => ({error : true,saving: false}));
    }
    else {
      let colab = this.state

      

      postRequest('project/createproject',
        {
          'email':window.localStorage.getItem('email'),
          'password': window.localStorage.getItem('password'),
          'project_id': colab.colab_id,
          'title': colab.title,
          'description': colab.description,
          'startDate': colab.startDate,
          'endDate': colab.endDate,
          'skillsRequired': colab.skills_required,
          'mentor': colab.mentor,
          'colab': colab.colab,
          'link' : colab.link,
          'colab_type': colab.colab_type,
        },
        (res)=>{
          if(res.message=="SUCCESS")
          {
            window.location.reload()
          }
        }
      )
    }
  }

  EditDetails = () => {
    this.setState({saving:true})
    if(!this.state.title || !this.state.description){
      this.setState(() => ({error : true,saving:false}));
    }
    else {
      let colab = this.state

      postRequest('project/editproject',
        {
          'email':window.localStorage.getItem('email'),
          'password': window.localStorage.getItem('password'),
          'project_id': colab.colab_id,
          'title': colab.title,
          'description': colab.description,
          'startDate': colab.startDate,
          'endDate': colab.endDate,
          'skillsRequired': colab.skills_required,
          'mentor': colab.mentor,
          'colab': colab.colab,
          'link' : colab.link,
          'colab_type':colab.colab_type,
        },
        (res)=>{
          if(res.message=="SUCCESS")
          {
            window.location.reload()
          }
        }
      )
    }
  }


  render(){
    return(
      <div>
        <div className = "colab--details">
          <div className = "colab--details-left">
          <div className = "colab--type">
            <h2>Type</h2>
            <div className = "colab--type-content">
              <div>
                <Radio
                  checked= {this.state.colab_type=="PROJECT"}
                  style = {{
                    transform: 'scale(1.5)'
                  }}
                  color = "primary"
                  disabled = {!this.state.admin}
                  onClick={()=>this.setState({colab_type:"PROJECT"})}
                />
                Project
              </div>
              <div>
                <Radio
                  checked= {this.state.colab_type=="HACKATHON"}
                  style = {{
                    transform: 'scale(1.5)'
                  }}
                  color = "primary"
                  disabled = {!this.state.admin}
                  onClick={()=>this.setState({colab_type:"HACKATHON"})}
                />
                Hackathon
              </div>
              <div>
                <Radio
                  checked= {this.state.colab_type=="OTHER"}
                  style = {{
                    transform: 'scale(1.5)'
                  }}
                  color = "primary"
                  disabled = {!this.state.admin}
                  onClick={()=>this.setState({colab_type:"OTHER"})}
                />
                Other
            </div>
            </div>
          </div>
          
          <div>
            <Checkbox
              checked= {this.state.colab}
              style = {{
                transform: 'scale(1.5)'
              }}
              onChange = {(e)=>{
                this.setState({colab:e.target.checked})    
              }}
              color = "primary"
              disabled = {!this.state.admin}
            />
            Invite Collaborations
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
            onChange = {this.AddTitle}
            value = {this.state.title}
            disabled = {!this.state.admin}
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
            value = {this.state.description}
            onChange = {this.AddDescription}
            disabled = {!this.state.admin}
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
            onChange = {(e)=>this.setState({link:e.target.value})}
            disabled = {!this.state.admin}
          />

          <div className = "colab--skills">
            <div className = "colab--skills-header">
              <h2>Skills</h2>
              { (this.state.admin)?
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
                    (this.state.admin)?
                    <span className = "button--close" onClick = {()=>{this.DeleteSkill(index)}}>x</span>
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
            variant = "outlined"
            style={{
              marginBottom: 5,
              width: "100%"
            }}
            inputProps ={{max:this.state.endDate}}
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
            value={this.state.startDate}
            onChange={(e)=>this.setState({startDate:e.target.value})}
            label='Start Date'
            disabled = {!this.state.admin}
          />
          <TextField
            type = "date"
            variant = "outlined"
            style={{
              marginTop: 10,
              marginBottom: 5,
              width: "100%"
            }}
            inputProps ={{min:this.state.startDate}}
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
            value={this.state.endDate}
            onChange={(e)=>this.setState({endDate:e.target.value})}
            label='End Date'
            disabled = {!this.state.admin}
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
              onChange = {(e)=>this.setState({mentor:e.target.value})}
              disabled = {!this.state.admin}
            />

            <div className = "colab--members">
              <h2>Members : {this.state.member_count}</h2>
              <div className = "colab--members-content">
                
                {
                  this.state.members.map((member,index)=>(
                    <Link  key = {index} className="linklink" to={"ProfilePage?email="+member.email}>
                    <div className="member--chip">
                      {member.email==window.localStorage.email?"You":member.name} {(member.admin)?<div className = "admin--tag">Admin</div>:""}
                    </div>
                    </Link>
                  ))
                }
                
              </div>
            </div>
          </div>
        </div>
        <center>
        { (this.state.error)?
          <p className = "error">Please Enter all Details Marked *</p>
          :""
        }
        {
          (this.state.admin)?
            (this.state.saving)?
              <p><i className="fa fa-spinner fa-spin"></i>..Saving Changes</p>
            :
              (this.state.colab_id=="")?
              <Button text = "Add Collaboration" type = "button" onClick = {this.SaveDetails}/>   
              :
              <Button text = "Save Changes" type = "button" onClick = {this.EditDetails}/>
          :""
        }
        </center>

      </div>
    )
  }
}