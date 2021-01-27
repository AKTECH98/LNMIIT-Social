import React from 'react';
import { postRequest } from "./CallApi";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader, CardActions} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles((theme)=>({
  root: {
    backgroundColor: 'white',
    height: 'fit-content',
    width: '100%'
  },
  rootHeader: {
    height: 'fit-content',
    alignItem: 'left'
  },
  title: {
    fontSize: 40,
    color: '#4574bf',
    fontWeight: 700,
    fontFamily: 'cursive'
  },
  content: {
    color: '#4574bf',
    fontSize: 15,
    height: 'fitContent'
  }
}));

function SkillCard(props){

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  
  return(
  <Card className = {classes.root}>
    <CardHeader 
      classes = {
        {
          root: classes.rootHeader,
          title: classes.title,
          action: classes.action
        }
      }  

      action = {
        (props.view)?
        ""
        :
        (!open)?
        <IconButton onClick = {handleToggle}>
          <AddIcon style = {{ fontSize: 25, color: "blue" }} />
        </IconButton>
        :
        <IconButton onClick = {handleToggle}>
          <RemoveIcon style = {{ fontSize: 25, color: "blue" }} />
        </IconButton>
      }

      title= "Skills"
    />
    {
      (open)?
      <CardActions>
        <form onSubmit = {(e)=>{
            e.preventDefault();
            const skill = e.target.skill.value; 
            e.target.skill.value = ""

            if(skill)
              props.AddSkills(skill)
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
      </CardActions> 
      :''
    }
    <CardContent classes = {{root:classes.content}}>
    { 
      props.skills.map((skill,index) => (
        <div className="skill--chip" key = {index}>
          {skill}
        <span className = "button--close" onClick={()=>{props.RemoveSkill(index)}}>x</span>
        </div>
      ))
    }
    </CardContent>
  </Card>
)}

export default class Skills extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      skills: [],
      old_skills:[]
    }
  }

  componentDidMount(){
     postRequest('profile/viewskills',
        {
          'email':window.localStorage.getItem('email'),
        },
        (res)=>{
          if(res.message=="SUCCESS")
          {
            this.setState({skills:eval(res.skills)})
            this.setState({old_skills:eval(res.skills)})
          }
        }
      )
  }
  
  SaveSkills = (skills)=>{
    postRequest('profile/editskills',
        {
          'email':window.localStorage.getItem('email'),
          'password':window.localStorage.getItem('password'),
          'skills': JSON.stringify(skills)
        },
        (res)=>{
          if(res.message=="SUCCESS")
          {
            //this.setState({old_skills:this.state.skills})
          }
        }
      )
  }

  AddSkills = (skill) => {

      let skills = this.state.skills;
      skills = skills.concat(skill)
      this.setState({skills})

      this.SaveSkills(skills)
  }

  RemoveSkill = (index) => {
      let skills = this.state.skills
      skills.splice(index,1)
      this.setState({skills})

      this.SaveSkills(skills)
  }

  render(){
    return (
      <div>
        <SkillCard view = {this.props.view} old_skills={this.state.old_skills} skills = {this.state.skills} AddSkills = {this.AddSkills} RemoveSkill={this.RemoveSkill}/>        
      </div>
    )
  }
}