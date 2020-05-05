import React from 'react';
import Modal from 'react-modal';

import TextField from './TextField';
import Button from './Button';

const Details = (props) => (
  <div>
    <TextField
      disabled = {!props.edit}
      default = {props.title}
      label = "Title"
      FeildStyle = {{
        width: 275,
        marginTop: 5,
        marginBottom: 5
      }}
      inputprops = {{
        style: {
          fontWeight: 300,
          color: 'white',
          fontSize: 20
        }
      }}
      LabelStyle = {{
        style: {
          fontWeight: 500,
          color: 'white',
          fontSize: 15
        }
      }}
      Change = {props.AddTitle}
    />
    <TextField 
      disabled = {!props.edit}
      default = {props.description}
      label = "Description"
      FeildStyle = {{
        width: 275,
        marginTop: 5,
        marginBottom: 5
      }}
      inputprops = {{
        style: {
          fontWeight: 300,
          color: 'white',
          fontSize: 20
        }
      }}
      LabelStyle = {{
        style: {
          fontWeight: 500,
          color: 'white',
          fontSize: 15
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
      FeildStyle = {{
        width: 275,
        marginTop: 5,
        marginBottom: 5
      }}
      LabelStyle = {{
        style: {
          fontWeight: 500,
          color: 'white',
          fontSize: 15
        }
      }}
      Change = {props.AddMembers}
    />
  </div>
)

export default class HackModal extends React.Component {
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
          title : this.props.hack.title,
          description: this.props.hack.description,
          member: this.props.hack.member
        }))
      }
    } catch(e) {
      console.log(e);
    }
  }

  FixError = () => {
    this.setState(() => ({error : false}));
  }

  AddHackTitle = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title }))
  };

  AddHackDescription = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }))
  };

  AddHackMembers = (e) => {
    const member = e.target.value;

    this.setState(() => ({ member }));
  };

  SaveDetails = () => {

    if(!this.state.title || !this.state.description || !this.state.member){
      this.setState(() => ({error : true}));
    }
    else {
      let hack = this.state
      this.props.SubmitDetails(hack,this.props.editDetail,this.props.hack.index);
    }
  }

  render() {
    return (
      <Modal
        isOpen={!!this.props.openModal}
        onRequestClose={this.props.DiscardDetails}
        contentLabel="Hackathon Details"
        className = "modal"
        ariaHideApp={false}
      >
        <h3 className = "modal__header">
        Hackathon Details
        <Button text = "X" type = "close__button" onClick = {this.props.DiscardDetails} />
        </h3>
        {
          (this.state.error)?
          <div>
          <p className = "modal__body">Please Enter All Valid Details</p>
          <Button text = "Continue" type = "button continue__button" onClick = {this.FixError} />
          </div>
          :
          <div>
          <Details 
            edit = {(this.props.addDetail || this.props.editDetail) || !this.props.showDetail}
            title = {this.state.title}
            description = {this.state.description}
            member = {this.state.member}
            AddTitle = {this.AddHackTitle}
            AddDescription = {this.AddHackDescription}
            AddMembers = {this.AddHackMembers}
          />
          {
            (this.props.showDetail)?
            <div>
            <Button text = "EDIT" type = "button modal__button" onClick = {() => {this.props.EditDetails()}}/>
            <Button text = "DELETE" type = "button modal__button" onClick = {() => {this.props.DeleteHack(this.props.hack.index)}} />
            </div>
            :
            <div>
              <Button text = "Save Details" type = "button modal__button" onClick = {this.SaveDetails}/>
              <Button text = "Discard Details" type = "button modal__button" onClick = {this.props.DiscardDetails}/>
            </div>
          }
          </div>
        }
      </Modal>
    )
  }
};