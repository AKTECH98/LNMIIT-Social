import React from 'react';

import Button from '../../components/Button';
import Header from '../../components/Header';
import ProjectModal from '../../components/ProjectModal';
import WorkView from '../../components/WorkView';
import {postRequest} from '../../components/CallApi'

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
        My Projects
      </Typography>
    </CardContent>
    <CardActions>
      <Button text = "+Add"  onClick = {props.newProject} type = "widget__button project__add"/>
    </CardActions>
  </Card>
)

export default class ProjectsPage extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      projects: [],
      openModal: false,
      addDetail: false,
      showDetail: false,
      editDetail: false,
      project: {
        title: null,
        description: null,
        startDate: null,
        endDate: null,
        requirements: null,
        member: 0,
        mentor:null,
        colab: false,
        project_id:0,
        project_link:null
      }
    };

    postRequest('project/fetchprojects',
      {
        'email':window.localStorage.getItem('email'),
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


  AddDetail = () => {
    this.setState(() => ({
      openModal: true,
      addDetail: true
    }));
  }

  EditDetails = (index) => {

    let pro = this.state.projects[index];

    this.setState(() => ({
      project: pro,
      showDetail: false,
      editDetail: true,
      openModal: true
    }))
  }

  SubmitDetails = (project,edit) => {
    if(!edit){
      console.log(project);
      this.setState((prevSate) => ({
        projects: prevSate.projects.concat(project),
        addDetail: false,
        editDetail: false,
        openModal: false
      }));
    }
    else{
      this.setState(() => ({
        addDetail: false,
        editDetail: false,
        openModal: false
      }));

      //this.state.projects[index] = project;
    }
  };

  DiscardDetails = () => {
    this.setState(() => ({
      addDetail:false,
      editDetail: false,
      showDetail: false,
      openModal: false
    }))
  }

  EditProject = (index) => {
    console.log(index)
  }

  DeleteProject = (projectIndex) => {
    let projects=this.state.projects;
    let item = projects[projectIndex];
    
    postRequest('project/deleteproject',
      {
        'email':window.localStorage.getItem('email'),
        'password': window.localStorage.getItem('password'),
        'project_id': item.project_id
      },
      (res)=>{
        if(res.message=="SUCCESS")
        {
          projects.splice(projectIndex,1)
          this.setState(() => ({projects}));
        }
      }
    )
  }

  render(){
    return(
      <div>
        <Header logout = {true}/>
        <div className = "widget__list">
        <PageHeader newProject = {this.AddDetail} />
        <WorkView
          works={this.state.projects}
          ShowDetails={this.ShowDetails}
          Delete = {this.DeleteProject}
          Edit = {this.EditDetails}
        />
        {
          (this.state.openModal)?
          <ProjectModal
            openModal = {this.state.openModal}
            addDetail = {this.state.addDetail}
            showDetail = {this.state.showDetail}
            editDetail = {this.state.editDetail}
            project = {this.state.project}
            SubmitDetails = {this.SubmitDetails}
            DiscardDetails = {this.DiscardDetails}
            EditProject = {this.EditProject}
          />
          :
          ''
        }
        </div>
      </div>
    )
  }
}