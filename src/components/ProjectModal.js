import React from 'react';
import Modal from 'react-modal';

import TextField from './TextField';
import Button from './Button';
import DatePicker from '../components/DatePicker'
import {postRequest} from './CallApi'

import Checkbox from '@material-ui/core/Checkbox';

function Details(props){

  const [checked, setChecked] = React.useState(props.colab);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    props.AddColab(event.target.checked);
  };

  return(
  <div>
    <div className = "modal__details">
    <TextField
      disabled = {!props.edit}
      default = {props.title}
      label = "Title"
      FeildStyle = {{
        width: 275,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5
      }}
      inputprops = {{
        style: {
          fontWeight: 300,
          color: 'black',
          fontSize: 20
        }
      }}
      LabelStyle = {{
        style: {
          fontWeight: 500,
          color: 'purple',
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
          color: 'black',
          fontSize: 20
        },
        type: 'Number'
      }}
      FeildStyle = {{
        width: 75,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
      }}
      LabelStyle = {{
        style: {
          fontWeight: 500,
          color: 'purple',
          fontSize: 15
        }
      }}
      Change = {props.AddMembers}
    />
    </div>
    <div className = "modal__details">
    <DatePicker
      disabled = {!props.edit}
      value = {props.startDate}
      label = "Start Date"
      inputprops = {{
        style: {
          fontWeight: 300,
          color: 'black',
          fontSize: 20
        },
      }}
      format = "dd-MM-yyyy"
      FeildStyle = {{
        width: 175,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5
      }}
      LabelStyle = {{
        style: {
          fontWeight: 500,
          color: 'purple',
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
          color: 'black',
          fontSize: 20
        },
      }}
      FeildStyle = {{
        width: 175,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5
      }}
      LabelStyle = {{
        style: {
          fontWeight: 500,
          color: 'purple',
          fontSize: 15
        }
      }}
      onChange = {props.AddEndDate}
    />
    </div>
    <div className = "modal__details">
    <TextField
      disabled = {!props.edit}
      multiline
      default = {props.requirements}
      label = "Skills"
      inputprops = {{
        style: {
          fontWeight: 300,
          color: 'black',
          fontSize: 20
        },
      }}
      FeildStyle = {{
        width: 162,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5
      }}
      LabelStyle = {{
        style: {
          fontWeight: 500,
          color: 'purple',
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
        width: 187,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5
      }}
      inputprops = {{
        style: {
          fontWeight: 300,
          color: 'black',
          fontSize: 20
        }
      }}
      LabelStyle = {{
        style: {
          fontWeight: 500,
          color: 'purple',
          fontSize: 15
        }
      }}
      Change = {props.AddMentor}
    />
    </div>
    <TextField
      disabled = {!props.edit}
      default = {props.description}
      label = "Description (max. 25 Words)"
      multiline
      FeildStyle = {{
        width: 350,
        height: 'fit-content',
        marginTop: 5,
        marginBottom: 5
      }}
      inputprops = {{
        style: {
          fontWeight: 150,
          color: 'black',
          fontSize: 20
        }
      }}
      LabelStyle = {{
        style: {
          fontWeight: 500,
          color: 'purple',
          fontSize: 15
        }
      }}
      Change = {props.AddDescription}
    />
    <div>
    <Checkbox
      checked={checked}
      onChange={handleChange}
      size = "medium"
      color = "primary"
      label = "Hello"
    />
      Invite Colaborators
    </div>
  </div>
  )
}

export default class ProjectModal extends React.Component {

  state = {
    title: null,
    description: null,
    startDate: null,
    endDate: null,
    mentor: null,
    requirements: null,
    member: 0,
    error: false,
    colab: false
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
          mentor: this.props.project.mentor,
          colab: this.props.project.colab
        }))
      }
    } catch(e) {
      console.log(e);
    }
  }

  AddColab = (colab) => {
    this.setState(() => ({colab}))
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
    }
    else {
      let project = this.state
      this.props.SubmitDetails(project,this.props.editDetail,this.props.project.index);

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
                    'title': project.title,
                    'description': project.description,
                    'startDate': formatDate(project.startDate),
                    'endDate':formatDate(project.endDate),
                    'skillsRequired': project.requirements,
                    'mentor': project.mentor,
                    'members': project.member,
                    'colab': project.colab
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
            colab = {this.state.colab}
            AddTitle = {this.AddProjectTitle}
            AddDescription = {this.AddProjectDescription}
            AddStartDate = {this.AddProjectStartDate}
            AddEndDate = {this.AddProjectEndDate}
            AddRequirements = {this.AddProjectRequirements}
            AddMentor = {this.AddProjectMentor}
            AddMembers = {this.AddProjectMembers}
            AddColab = {this.AddColab}
          />
          {
            (this.props.showDetail)?
            <div>
            <Button text = "EDIT" type = "button modal__button" onClick = {() => {this.props.EditDetails()}}/>
            <Button text = "DELETE" type = "button modal__button" onClick = {() => {this.props.DeleteProject(this.props.project.index)}} />
            </div>
            :
            <div>
              <Button text = "Add Project" type = "button modal__button" onClick = {this.SaveDetails}/>
              <Button text = "Discard Details" type = "button modal__button" onClick = {this.props.DiscardDetails}/>
            </div>
          }
          </div>
        }
      </Modal>
    )
  }
};
