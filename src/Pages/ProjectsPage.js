import React from 'react';


import Header from '../components/Header';
import WorkView from '../components/WorkView';
import {postRequest} from '../components/CallApi'

import { Card, CardActions, CardContent, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#f5aa0a',
    marginBottom: '1rem',
    height: 'fit-content',
    padding: '0 0.3rem 0 0.3rem',
    border: 1,
    borderStyle: 'solid',
    borderColor: 'grey'
  },
  title: {
    fontSize: 15,
    color: 'white',
    fontWeight: '500',
  }
});

const PageHeader = (props) => (
  <Card className = {useStyles().header}>
    <CardContent>
      <Typography className = {useStyles().title}>
        All Projects
      </Typography>
    </CardContent>
  </Card>
)

export default class ProjectsPage extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      projects: [],
      project: {
        index: -1,
        title: null,
        description: null,
        startDate: null,
        endDate: null,
        requirements: null,
        mentor:null,
        member: 0
      }
    };

    const url = window.location.href;
    const parser = require('url-parameter-parser');
    const res = parser(url);
    const user = res.email;

    postRequest('project/fetchallprojects',
      {
        'email': window.localStorage.getItem('email'),
        'password': window.localStorage.getItem('password'),
      },
      (res)=>{
        if(res.message=="SUCCESS")
        {
          let default_projects = []
          res.return_value.forEach((item)=>{
            default_projects.push({
              title : item.title,
              description: item.description,
              startDate: item.startDate,
              endDate: item.endDate,
              requirements: item.skills_required,
              member: item.members,
              mentor: item.mentor,
              colab: item.colab,
              project_id: item.project_id
            })
          })
          console.log(default_projects)
          this.setState({projects: default_projects})
        }
      }
    )
  }

  render() {
    return(
      <div>
        <Header logout = {true}/>
        <div className = "widget__list">
        <PageHeader />
          <WorkView
            works={this.state.projects}
            ShowDetails={this.ShowDetails}
            view = {true}
          />
        </div>
      </div>
    )
  }
}
