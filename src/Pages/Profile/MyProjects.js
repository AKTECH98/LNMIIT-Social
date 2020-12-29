import React from 'react';

import Button from '../../components/Button';
import Header from '../../components/Header';
import ProjectModal from '../../components/ProjectModal';
import InviteModal from '../../components/InviteModal';
import WorkView from '../../components/WorkView';
import {postRequest} from '../../components/CallApi'
import ViewProjectRequestsModal from '../../components/ViewProjectRequestsModal'

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
    {
      (props.view)?"":
      <CardActions>
        <Button text = "+Add"  onClick = {props.newProject} type = "widget__button project__add"/>
      </CardActions>
    }
  </Card>
)

export default class ProjectsPage extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      projects: [],
      openModal: false,
      openRequestsModal: false,
      addDetail: false,
      showDetail: false,
      editDetail: false,
      request: false,
      request_project_id:null,
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
        project_link:null,
        badges:0
      }
    };


  }

  componentDidMount()
  {
        const url = window.location.href;
      const parser = require('url-parameter-parser');
      const res = parser(url);
      const user = res.email;
      postRequest('project/fetchprojectsofuser',
      {
        'email': user,
      },
      (res)=>{
        if(res.message=="SUCCESS")
        {
          let default_projects = []

          res.return_value.forEach((item)=>{
            postRequest('project/getinterestedmembers',
              {
                'email':window.localStorage.getItem('email'),
                'password': window.localStorage.getItem('password'),
                'project_id': item.project_id
              },
              (res)=>{
                if(res.message=="SUCCESS")
                {
                  default_projects.push({
                    title : item.title,
                    description: item.description,
                    startDate: item.startDate,
                    endDate: item.endDate,
                    requirements: item.skills_required,
                    member: item.members,
                    mentor: item.mentor,
                    colab: item.colab,
                    project_link: item.link,
                    project_id: item.project_id,
                    admin: item.admin,
                    badges:res.users.length
                  })
                  console.log(default_projects)
                  this.setState({projects: default_projects})
                }
              }
            )
            
          })
          
        }
      }
    )

  } 
  RequestUser = (index) => {
    let pro = this.state.projects[index];
    this.setState(()=>({
      request: true,
      request_project_id: pro.project_id
    }))
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

  GetBadgeNumber =(index)=>{
    return this.state.projects[index].badges;
           
  }
  ViewJoinRequests = (index) => {
    let pro = this.state.projects[index];
    this.setState(() => ({
      request_project_id: pro.project_id,
      openRequestsModal: true
    }))
  }


  DiscardDetails = () => {
    this.setState(() => ({
      addDetail:false,
      editDetail: false,
      showDetail: false,
      openModal: false,
      request: false
    }))
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
          window.location.reload()
        }
      }
    )
  }

  render(){

    const url = window.location.href;
    const parser = require('url-parameter-parser');
    const res = parser(url);
    const user = res.email;

    return(
      <div>
        <Header logout = {true}/>
        <div className = "widget__list">
        <PageHeader newProject = {this.AddDetail} view = {user!=window.localStorage.getItem('email')}/>
        <WorkView
          works={this.state.projects}
          ShowDetails={this.ShowDetails}
          Delete = {this.DeleteProject}
          Edit = {this.EditDetails}
          ViewJoinRequests = {this.ViewJoinRequests}
          view = {user!=window.localStorage.getItem('email')}
          Request = {this.RequestUser}
          GetBadgeNumber ={this.GetBadgeNumber}
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
        {
          (this.state.request)?
          <InviteModal
            request = {this.state.request}
            project_id = {this.state.request_project_id}
            DiscardDetails = {this.DiscardDetails}
          />
          :
          ''
        }
        { this.state.openRequestsModal?
          <ViewProjectRequestsModal
            isOpen = {this.state.openRequestsModal}
            project_id = {this.state.request_project_id}
            close = {()=>{this.setState({openRequestsModal:false,request_project_id:null})}}
          />
          :
          ''
        }
        </div>
      </div>
    )
  }
}
