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
        Projects
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
                                      mentor: item.mentor
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

  ShowDetails = (index) => {
    let pro = this.state.projects[index];

    this.setState(() => ({
      project: {
        index: index,
        title: pro.title,
        description: pro.description,
        startDate: pro.startDate,
        endDate: pro.endDate,
        requirements: pro.requirements,
        mentor: pro.mentor,
        member: pro.member
      },
      showDetail: true,
      openModal: true
    }))
  }

  EditDetails = () => {
    this.setState(() => ({
      showDetail: false,
      editDetail: true,
      openModal: true
    }))
  }

  SubmitDetails = (project,edit,index) => {

    if(!edit){
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

      this.state.projects[index] = project;
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
    projects.splice(projectIndex,1);
    this.setState(() => ({
      openModal: false,
      showDetail: false,
      projects
    }));
  };

  render(){
    return(
      <div>
        <Header logout = {true}/>
        <div className = "widget__list">
        <PageHeader newProject = {this.AddDetail} />
        <WorkView
          works={this.state.projects}
          ShowDetails={this.ShowDetails}
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
            EditDetails = {this.EditDetails}
            DeleteProject = {this.DeleteProject}
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
