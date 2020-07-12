import React from 'react';
import Modal from 'react-modal';
import {Link, Redirect} from 'react-router-dom';
import TextField from '../components/TextField';
import Button from '../components/Button';
import DatePicker from '../components/DatePicker'
import {postRequest} from './CallApi'

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
    <DatePicker
      disabled = {!props.edit}
      value = {props.startDate}
      label = "Start Date"
      inputprops = {{
        style: {
          fontWeight: 300,
          color: 'white',
          fontSize: 20
        },
      }}
      format = "dd-MM-yyyy"
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
      onChange = {props.AddStartDate}
    />
    <DatePicker
      disabled = {!props.edit}
      value = {props.endDate}
      format = "dd-MM-yyyy"
      label = "End Date"
      inputprops = {{
        style: {
          fontWeight: 300,
          color: 'white',
          fontSize: 20
        },
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
      onChange = {props.AddEndDate}
    />
    <TextField
      disabled = {!props.edit}
      default = {props.requirements}
      label = "Requirements (or skills??)"
      inputprops = {{
        style: {
          fontWeight: 300,
          color: 'white',
          fontSize: 20
        },
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
      Change = {props.AddRequirements}
    />
    <TextField
      disabled = {!props.edit}
      default = {props.mentor}
      label = "Mentor"
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
      Change = {props.AddMentor}
    />
    <TextField
      disabled = {!props.edit}
      default = {props.description}
      label = "Description"
      multiline
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
  </div>
)

export default class ProjectModal extends React.Component {

  state = {
    title: null,
    description: null,
    startDate: null,
    endDate: null,
    mentor: null,
    requirements: null,
    member: 0,
    error: false
  };


  componentDidMount() {
    try {
      if(this.props.showDetail){
        this.setState(() => ({
          title : this.props.project.title,
          description: this.props.project.description,
          startDate: this.props.project.startDate,
          endDate: this.props.project.endDate,
          requirements: this.props.project.requirements,
          member: this.props.project.member,
          mentor: this.props.project.mentor
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

  AddProjectStartDate = (date) => {
    const startDate = date;
    this.setState(() => ({ startDate }))
  };

  AddProjectEndDate = (date) => {
    const endDate = date;
    this.setState(() => ({ endDate }))
  };

  AddProjectRequirements = (e) => {
    const requirements = e.target.value;
    this.setState(() => ({ requirements }))
  };


  AddProjectMentor = (e) => {
    const mentor = e.target.value;
    this.setState(() => ({ mentor }))
  };

  AddProjectMembers = (e) => {
    const member = e.target.value;

    this.setState(() => ({ member }));
  };

  SaveDetails = () => {

    if(!this.state.title || !this.state.description || !this.state.member || !this.state.mentor || !this.state.requirements || !this.state.startDate || !this.state.endDate){
      this.setState(() => ({error : true}));
      console.log(this.state)
    }
    else {
      let project = this.state
      this.props.SubmitDetails(project,this.props.editDetail,this.props.project.index);
      console.log(this.state)
      function formatDate(date) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();

                if (month.length < 2)
                    month = '0' + month;
                if (day.length < 2)
                    day = '0' + day;

                return [year, month, day].join('-');
            }
      postRequest('project/createproject',
                                {
                                  'email':window.localStorage.getItem('email'),
                                  'password': window.localStorage.getItem('password'),
                                  'title': this.state.title,
                                  'description': this.state.description,
                                  'startDate': formatDate(this.state.startDate),
                                  'endDate':formatDate(this.state.endDate),
                                  'skillsRequired':this.state.requirements,
                                  'mentor':this.state.mentor,
                                  'members':this.state.member
                                },
                                (res)=>{
                                  if(res.message=="SUCCESS")
                                  {
                                    console.log('SUCCESS')
                                  }

                                }
                 )
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
        <h3 className = "modal__header">
        Project Details
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
            startDate = {this.state.startDate}
            endDate = {this.state.endDate}
            requirements = {this.state.requirements}
            member = {this.state.member}
            mentor = {this.state.mentor}
            AddTitle = {this.AddProjectTitle}
            AddDescription = {this.AddProjectDescription}
            AddStartDate = {this.AddProjectStartDate}
            AddEndDate = {this.AddProjectEndDate}
            AddRequirements = {this.AddProjectRequirements}
            AddMentor = {this.AddProjectMentor}
            AddMembers = {this.AddProjectMembers}
          />
          {
            (this.props.showDetail)?
            <div>
            <Button text = "EDIT" type = "button modal__button" onClick = {() => {this.props.EditDetails()}}/>
            <Button text = "DELETE" type = "button modal__button" onClick = {() => {this.props.DeleteProject(this.props.project.index)}} />
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
