import React from 'react';

export default class AddProject extends React.Component {
  state = {
    title: undefined,
    description: undefined,
    members: undefined
  };
  handleAddOption = (e) => {
    e.preventDefault();

    const title = e.target.elements.title.value.trim();
    const description = e.target.elements.descrip.value.trim();
    const members = e.target.elements.memb.value.trim();

    const error = this.props.handleAddProject(title);

    console.log(title,description,members);
    

    if (!error) {
      e.target.elements.title.value = '';
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
