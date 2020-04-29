import React from 'react';

export default class AddProject extends React.Component {
  state = {
    projects:this.props.projects,
  };

  handleAddOption = (e) => {
    e.preventDefault();
    const elements= e.target.elements;
    const title = elements.title.value.trim();
    const description = elements.descrip.value.trim();
    const members = elements.memb.value.trim();
    const error = this.props.handleAddProject(this.state.projects);

    let projects=this.state.projects;
    projects.push({title:title, description:description,members:members})
    this.setState(projects);

    if (!error) {
      elements.title.value = '';
      elements.descrip.value='';
      elements.memb.value='';
    }
  };
  render() {
    return (
      <div>
        {this.state.error && <p className = "add-option-error">{this.state.error}</p>}
        <form className = "add-option" onSubmit={this.handleAddOption}>
          <input className = "add-option__input" type="text" name="title" placeholder="Title" />
          <input className = "add-option__input"type="text" name="descrip" placeholder="Description" />
          <input className = "add-option__input"type="number" name="memb" placeholder="Members" />
          <button className = "button">Add Option</button>
        </form>
      </div>
    );
  }
}
