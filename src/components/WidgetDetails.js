import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import ColabIcon from '@material-ui/icons/CheckCircleOutlineOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    color: '#4574bf',
    width: 230,
    height: 'fit-content',
    border: '#4574bf',
    borderStyle: 'solid',
    borderRadius: '10px',
    padding: '5px',
  },
  header: {
    backgroundColor: '#101010'
  },
  title: {
    color: '#4574bf',
    fontSize : 20,
    height: 'fit-content'
  },
  subheader: {
    color: 'gray',
    fontSize : 12
  },
  content: {
    color: '#4574bf',
    fontSize: 15,
    minHeight: 125,
    maxHeight: 125
  },
  action: {
    minHeight: 20,
    maxHeight: 20
  },
  rootIcon: {
    color: 'blue'
  }
}));

export default function WidgetDetails(props){
  const classes = useStyles();
  
  const limitContent = (content,limit) => {
    const len = content.length;
    let newcontent = [];

    if (len > limit) {
      if(limit==2){
        newcontent = content.split(",").splice(0,limit);
        return (newcontent.join(",")+".....")
      }
      else{
        newcontent = content.split(" ").splice(0,limit);
        return (newcontent.join(" ")+".....")
      }
    }
    return content;
  }

  const Delete = (event) => {
    props.DeleteWork(props.index);
    handleClose(event);
  }

  return (
    <Card className={classes.root}>
      <Link className = "linklink" to = {"/CollaborationDetails?colabID="+ props.optionText.project_id}>
      <CardHeader classes={
        {
          root : classes.header,
          title : classes.title,
          subheader : classes.subheader
        }
      }
        
        title={props.optionText.title}
        subheader = {
          <div>
          {'Author: Author Name'}<br/>
          {(props.optionText.mentor!=undefined)?"Mentor : " + props.optionText.mentor:"Mentor : None"}<br/>
          {'Members : '+ props.optionText.member}<br/>
          {(props.optionText.requirements!=undefined)?'Skills : '+limitContent(props.optionText.requirements,2):"Skills : None Required"}
          </div>
        }
      />
      <CardContent classes = {{root: classes.content}}>
        Description :<hr/>
        {(props.optionText.description==undefined)?'None':limitContent(props.optionText.description,13)}
      </CardContent>
      </Link>
      <CardActions classes = {{root:classes.action}}>
        {
          (props.optionText.project_link)?
          <div className = "tooltip">
            <IconButton classes = {{root:classes.rootIcon}}
              onClick = {()=>{
                const el = document.createElement('textarea');
                el.value = props.optionText.project_link;
                document.body.appendChild(el);
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);
      
                var x = document.getElementById("snackbar");
                x.className = "show";
                setTimeout(function(){ x.className = x.className.replace("show", ""); },2000);
              }}
            >
              <GitHubIcon fontSize = "large" style = {{color:'black'}} />
            </IconButton>
            <span className = "tooltiptext github">Github Repository</span>
          </div>
          :" "
        }
        {
          (props.optionText.colab)?
          <div className = "tooltip">
              <IconButton onClick = {()=>props.Request(props.index)}>
                <ColabIcon fontSize = "large" style = {{color:'green'}} />
              </IconButton>

            <span className = "tooltiptext colab">Send Colab Request</span>
          </div>
          :" "
        }
      </CardActions>
    </Card>
  );
}