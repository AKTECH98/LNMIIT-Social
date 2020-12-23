import React from 'react';
import Modal from 'react-modal';

import TextField from './TextField';
import Button from './Button';
import DatePicker from '../components/DatePicker'
import {postRequest} from './CallApi'

import Checkbox from '@material-ui/core/Checkbox';

import LoginContext from '../contexts/LoginContext';

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
      default = {props.title}
      label = "Title*"
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
      default = {props.member}
      label = "Members*"
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
      default = {props.description}
      label = "Description* (max. 20 Words)"
      multiline
      FeildStyle = {{
        width: 350,
        height: 'fit-content',
        marginTop: 5,
        marginBottom: 5
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
          fontSize: 15,
        }
      }}
      Change = {props.AddDescription}
    />
    <div>
    <TextField
      default = {props.link}
      label = "Github Repository"
      multiline
      FeildStyle = {{
        width: 350,
        height: 'fit-content',
        marginTop: 5,
        marginBottom: 5
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
      Change = {props.AddLink}
    />
    </div>
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
    project_id:0,
    title: null,
    description: null,
    startDate: null,
    endDate: null,
    mentor: null,
    requirements: null,
    member: 1,
    error: false,
    colab: false,
    project_link: null
  };

  componentDidMount() {
    try {
      if(this.props.editDetail){
        this.setState(() => ({
          project_id: this.props.project.project_id,
          title : this.props.project.title,
          description: this.props.project.description,
          startDate: this.props.project.startDate,
          endDate: this.props.project.endDate,
          requirements: this.props.project.requirements,
          member: this.props.project.member,
          mentor: this.props.project.mentor,
          colab: this.props.project.colab,
          project_link: this.props.project.project_link
        }))
        //console.log(this.props.project_link + "Hi there");
      }
    } catch(e) {
      console.log(e);
    }
  }

  AddColab = (colab) => {
    this.setState(() => ({colab}))
  }
  AddProjectLink = (e) => {
    const project_link = e.target.value;
    this.setState(() => ({ project_link }))
  };

  FixError = () => {
    this.setState(() => ({error : false}));
  }

  AddProjectTitle = (e) => {
    const title = e.target.value;

    if(this.state.error==true)
    {
      this.setState(() => ({error: false, title}))
    }
    else
      this.setState(() => ({ title }))
  };

  AddProjectDescription = (e) => {
    const description = e.target.value;

    if(this.state.error==true)
    {
      this.setState(() => ({error: false, description}))
    }
    else
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
    if(member<=0)
      e.target.value = 1;
    else
    {
      if(this.state.error==true)
      {
        this.setState(() => ({ error: false, member }));
      }
      else 
        this.setState(() => ({member}));
    }
  };

  EditDetails = (loginData) => {
    if(!this.state.title || !this.state.member || !this.state.description){
      this.setState(() => ({error : true}));
    }
    else {
      let project = this.state

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

      postRequest('project/editproject',
        {
          'email':loginData.email,
          'password':loginData.password,
          'project_id': project.project_id,
          'title': project.title,
          'description': project.description,
          'startDate': formatDate(project.startDate),
          'endDate':formatDate(project.endDate),
          'skillsRequired': project.requirements,
          'mentor': project.mentor,
          'members': project.member,
          'colab': project.colab,
          'link' : project.project_link
        },
        (res)=>{
          if(res.message=="SUCCESS")
          {
            window.location.reload()
          }
        }
      )
    }
  }

  SaveDetails = (loginData) => {

    if(!this.state.title || !this.state.member || !this.state.description){
      this.setState(() => ({error : true}));
    }
    else {
      let project = this.state

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
          'email':loginData.email,
          'password': loginData.password,
          'title': project.title,
          'description': project.description,
          'startDate': formatDate(project.startDate),
          'endDate':formatDate(project.endDate),
          'skillsRequired': project.requirements,
          'mentor': project.mentor,
          'members': project.member,
          'colab': project.colab,
          'link' : project.project_link
        },
        (res)=>{
          if(res.message=="SUCCESS")
          {
            window.location.reload()
          }
        }
      )
    }
  }

  render() {
    return (
    <LoginContext.Consumer>
      {(loginData)=>{return (
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
        <div>
        <Details
          title = {this.state.title}
          link = {this.state.project_link}
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
          AddLink = {this.AddProjectLink}
        />
        {
          (this.props.editDetail)?
          <div>
          <Button text = "Save Changes" type = "button modal__button" onClick = {()=>this.EditDetails(loginData)}/>
          <Button text = "Discard Details" type = "button modal__button" onClick = {this.props.DiscardDetails}/>
          </div>
          :
          <div>
            { (this.state.error)?
              <p className = "error">Please Enter all Details Marked *</p>
              :""
            }
            <Button text = "Add Project" type = "button modal__button" onClick = {()=>this.SaveDetails(loginData)}/>
            <Button text = "Discard Details" type = "button modal__button" onClick = {this.props.DiscardDetails}/>
          </div>
        }
        </div>
      </Modal>)}}
    </LoginContext.Consumer>
    )
  }
};
