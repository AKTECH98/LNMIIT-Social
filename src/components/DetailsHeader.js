import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import {Link} from "react-router-dom";

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
  header: {backgroundColor: '#101010'},
  title: {
    color: '#4574bf',
    fontSize : 20,
    height: 'fit-content'
  },
  subheader: {
    color: 'gray',
    fontSize : 12
  },
}));

export default function HeaderDetails(props) {
  const classes = useStyles();

  const limitContent = (content,limit,isSkill) => {

    let newcontent = [];

    if(isSkill==1)
    {
      newcontent = content.split(",")
      newcontent = newcontent.splice(1)
      content = newcontent.join(",")
    }
    else
      newcontent = content.split(" ")

    const len = newcontent.length;
    
    if (len > limit) {
      newcontent = newcontent.splice(0,limit);
      return (newcontent.join(" ")+".....")
    }
    
    return content;
  }

  return (
    <Card className={classes.root}>
      <Link className = "linklink" to = {"/CollaborationDetails?colabID="+ props.optionText.project_id}>
      <CardHeader classes={
        {
          root : classes.header,
          title : classes.title,
          subheader : classes.subheader
        }}
        title={props.optionText.title}
        subheader = {
          <div>
          {'Author: '+props.optionText.author}<br/>
          {(props.optionText.mentor.length!=1)?"Mentor : " + limitContent(props.optionText.mentor,4,0):"Mentor : None"}<br/>
          {'Members : '+ props.optionText.member_count}<br/>
          {(props.optionText.requirements!="")?'Skills : '+limitContent(props.optionText.requirements,2,1):"Skills : None Required"}
          </div>
        }
      />
      </Link>
    </Card>
  );
}
