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
    projects: []
  };

  editProject = () => {
    this.setState(() => ({ addProject: true }));
  };
  submitProject = () => {
    this.setState(() => ({ addProject: undefined }));
  };
  deleteProject = (projectIndex) => {
    let projects=this.state.projects;
    projects.splice(projectIndex,1);
    this.setState(projects);

  };
  handleAddProject = (newProject) => {
    this.setState({projects:newProject});
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
        projects={this.state.projects}
        />
    </div>
    );
  }
}
