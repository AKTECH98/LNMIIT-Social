import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader, CardActions} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Button from './Button';

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
            
            if(skill)
              props.AddSkills(skill)
          }}
        >
          <input type="text" className = "skill__bar" name = "skill" placeholder="Add a Skill..."/>
        </form>
      </CardActions> 
      :''
    }
    <CardContent classes = {{root:classes.content}}>
    { 
      props.skills.map((skill,index) => (
        <div className="skill--chip" key = {index}>
          {skill}
        <span className = "button--close">x</span>
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
      skills: []
    }
  }

  AddSkills = (skill) => {
      this.setState((prevState)=>({skills: prevState.skills.concat(skill)}))

      console.log(this.state.skills)
  }

  render(){
    return (
      <div>
        <SkillCard skills = {this.state.skills} AddSkills = {this.AddSkills}/>        
      </div>
    )
  }
}