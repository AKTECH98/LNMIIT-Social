import React from 'react';

import Button from '../components/Button';
import ProjectModal from '../components/ProjectModal';
import ProjectOption from '../components/ProjectOption';

const Header = (props) => (
  <div>
    <h1>Projects</h1>
    <Button text = "+Add"  onClick = {props.newProject}/>
  </div>
)

export default class ProjectList extends React.Component {
  state = {
    projects: [],
    openModal: false,
    addDetail: false,
    showDetail: false,
    editDetail:false,
    project: {
      index: -1,
      title: null,
      description: null,
      member: 0
    }
  };

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
        member: pro.member
      },
      showDetail: true,
      openModal: true
    }))
  }

  EditDetails = (index) => {

    this.DeleteProject(index);

    this.setState(() => ({
      showDetail: false,
      editDetail: true,
      openModal: true
    }))
  }

  SubmitDetails = (project) => {
    this.setState((prevSate) => ({
      projects: prevSate.projects.concat(project), 
      addDetail: false,
      editDetail: false,
      openModal: false 
    }));
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

  render() {
    return (
      <div>
        <Header newProject = {this.AddDetail} />
        <ProjectOption
          projects={this.state.projects}
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
    );
  }
}
