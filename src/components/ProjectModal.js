import React from 'react';
import Modal from 'react-modal';

import TextField from '../components/TextField';
import Button from '../components/Button';

const Details = (props) => (
  <div>
    <TextField
      disabled = {!props.edit}
      default = {props.title}
      label = "Title"
      inputprops = {{
        style: {
          fontWeight: 300,
          color: 'white',
          fontSize: 20
        }
      }}
      Change = {props.AddTitle}
    />
    <TextField 
      disabled = {!props.edit}
      default = {props.description}
      label = "Description"
      inputprops = {{
        style: {
          fontWeight: 300,
          color: 'white',
          fontSize: 20
        }
      }}
      Change = {props.AddDescription}
    />
    <TextField 
      disabled = {!props.edit}
      default = {props.member}
      label = "Members"
      inputprops = {{
        style: {
          fontWeight: 300,
          color: 'white',
          fontSize: 20
        },
        type: 'Number'
      }}
      Change = {props.AddMembers}
    />
  </div>
)

export default class ProjectModal extends React.Component {
  state = {
    title: null,
    description: null,
    member: 0,
    error: false
  };

  componentDidMount() {
    try {
      if(this.props.showDetail){
        this.setState(() => ({
          title : this.props.project.title,
          description: this.props.project.description,
          member: this.props.project.member
        }))
      }
    } catch(e) {
      console.log(e);
    }
  }

  FixError = () => {
    this.setState(() => ({error : false}));
  }

  AddProjectTitle = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title }))
  };

  AddProjectDescription = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }))
  };

  AddProjectMembers = (e) => {
    const member = e.target.value;

    this.setState(() => ({ member }));
  };

  SaveDetails = () => {

    if(!this.state.title || !this.state.description || !this.state.member){
      this.setState(() => ({error : true}));
    }
    else {
      let project = this.state
      this.props.SubmitDetails(project);
    }
  }

  render() {
    return (
      <Modal
        isOpen={!!this.props.openModal}
        onRequestClose={this.props.DiscardDetails}
        contentLabel="Project Details"
        className = "modal"
        ariaHideApp={false}
      >
        <h3 className = "modal__title">Project Details</h3>
        <Button text = "X" type = "button" onClick = {this.props.DiscardDetails} />
        {
          (this.state.error)?
          <div>
          <p>Please Enter All Valid Details</p>
          <Button text = "Continue" type = "button" onClick = {this.FixError} />
          </div>
          :
          <div>
          <Details 
            edit = {(this.props.addDetail || this.props.editDetail) || !this.props.showDetail}
            title = {this.state.title}
            description = {this.state.description}
            member = {this.state.member}
            AddTitle = {this.AddProjectTitle}
            AddDescription = {this.AddProjectDescription}
            AddMembers = {this.AddProjectMembers}
          />
          {
            (this.props.showDetail)?
            <div>
            <Button text = "EDIT" type = "button" onClick = {() => {this.props.EditDetails(this.props.project.index)}}/>
            <Button text = "DELETE" type = "button" onClick = {() => {this.props.DeleteProject(this.props.project.index)}} />
            </div>
            :
            <div>
              <Button text = "Save Details" type = "button" onClick = {this.SaveDetails}/>
              <Button text = "Discard Details" type = "button" onClick = {this.props.DiscardDetails}/>
            </div>
          }
          </div>
        }
      </Modal>
    )
  }
};