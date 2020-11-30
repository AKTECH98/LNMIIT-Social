import React from 'react';

import Button from './Button';
import WidgetView from './WidgetView';

import { Card, CardActions, CardContent, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

import {postRequest} from './CallApi'

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    marginBottom: '2rem',
    height: 'fit-content',
    padding: '0 0.3rem 0 0.3rem',
    border: 0.5,
    borderStyle: 'solid',
    borderColor: 'grey'
  },
  title: {
    fontSize: 14,
    color: '#4574bf',
    fontWeight: '500',
  }
});

function Header(props){
  return(
  <Card className = {useStyles().header}>
    <CardContent>
      <Typography className = {useStyles().title}>
        My Projects
      </Typography>
    </CardContent>
    <CardActions>
      <Link to = {"MyProjects?email="+props.user}>
      <Button text = "View All" type = "widget__button"/>
      </Link>
    </CardActions>
  </Card>
  )
}

export default class WidgetProject extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      projects: [],
      sections: []
    };

    const url = window.location.href;
    const parser = require('url-parameter-parser');
    const res = parser(url);
    const query = res.email;
    const user_email = query.split('#')[0];

    postRequest('project/fetchprojectsofuser',
      {
        'email': user_email,
      },
      (res)=>{
        if(res.message=="SUCCESS")
        {
          let projects = []
          res.return_value.forEach((item)=>{
            projects.push({
              title : item.title,
              description: item.description,
              startDate: item.startDate,
              endDate: item.endDate,
              requirements: item.skills_required,
              member: item.members,
              mentor: item.mentor,
              colab: item.colab,
              project_link: item.link,
              project_id: item.project_id
            })
          })

          let sections = []
          const len = projects.length;
          for(var i=0;i<len/4;i++)
            sections.push(i+1);

          //console.log(default_projects)
          this.setState({projects,sections})
          //console.log(this.state.sections)
        }
      }
    )
  }

  render() {
    return (
      <div className = "widget__list">
        <Header user = {this.props.user}/>
        <WidgetView type = "project" work = {this.state.projects} sections = {this.state.sections} />
      </div>
    );
  }
}