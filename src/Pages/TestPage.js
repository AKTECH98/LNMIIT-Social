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
    addProject: undefined
  };
  editProject = () => {
    console.log("Hello I am Alive");
    this.setState(() => ({ addProject: true }));
  };
  submitProject = () => {
    this.setState(() => ({ addProject: undefined }));
  };
  deleteProject = (projectToRemove) => {
    this.setState((prevState) => ({
      projects: prevState.projects.filter((project) => projectToRemove !== project)
    }));
  };
  handleAddProject = (project) => {
    this.setState((prevState) => ({
      projects: prevState.projects.concat(project)
    }));
  };
  render() {
    return (
      <div>
        <Header newProject = {this.editProject} />
        <ProjectOption
        projects={this.state.projects}
        deleteProject={this.deleteProject}
        />
        <ProjectModal
        addProject={this.state.addProject}
        submitProject={this.submitProject}
        handleAddProject={this.handleAddProject}
        />
    </div>
    );
  }
}