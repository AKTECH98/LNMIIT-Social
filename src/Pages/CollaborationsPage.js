import React from 'react';
import {Link,BrowserRouter} from 'react-router-dom'
import clsx from 'clsx'
import Header from '../components/Header';
import InviteModal from '../components/InviteModal';
import WorkView from '../components/WorkView';
import ColabDetails from '../components/ColabDetails';
import {postRequest} from '../components/CallApi'

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Card, CardHeader, IconButton, CardContent, Collapse} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>({
  root: {
    height: "fit-content",
    backgroundColor: 'black',
    marginBottom: '1rem',
  },
  header: {
    height: "fit-content",
  },
  title: {
    fontSize: 30,
    color: "white",
    fontWeight: 700,
    fontFamily: "cursive",
  },
  subheader: {
    borderBottom: "0.1rem solid grey",
    fontSize: 15,
    fontColor: "black",
    color: 'white'
  },
  icon: {
    "&:hover":{
      backgroundColor: 'gray'
    }
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  container: {
    position: "absolute",
    zIndex: 5,
  },
  addDetail: {
    backgroundColor: '#f5f5f5'
  }
}));

function PageHeader(props){

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return(
    <Card className = {useStyles().root}>
      <CardHeader
        classes = {{
          root: useStyles().header,
          title: useStyles().title,
          subheader: useStyles().subheader,
        }}
        action={
          (props.view)?
            "" 
          :   
            <IconButton 
              className={clsx(useStyles().expand, {
                [useStyles().expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
            >
              {expanded?<RemoveIcon style = {{color : 'white',fontSize: 35}}/>:<AddIcon style = {{color : 'white',fontSize: 35}}/>}
              
            </IconButton>
        }

        title= {
          (props.user==undefined)?    
            "All Public Collaborations"
          :
            (props.user==window.localStorage.email)?
              "My Collaborations"
            :
              "Collaborations of "+props.user
        }
        subheader = {
          (props.user==undefined)?    
            <BrowserRouter forceRefresh={true}>
              <Link className = "colab__public--toggle linklink" to={"Collaborations?email="+window.localStorage.email} onClick={()=>window.location.reload()}> 
                Click here to view Your Collaborations
              </Link>
            </BrowserRouter>
          :
            (props.user==window.localStorage.email)?
              <BrowserRouter forceRefresh={true}>
                <Link className = "colab__public--toggle linklink" to="Collaborations">
                  Click here to view All Public Collaborations
                </Link>
              </BrowserRouter>
            :
              <BrowserRouter forceRefresh={true}>
                <Link className = "colab__public--toggle linklink" to="Collaborations">
                  Click here to view All Public Collaborations
                </Link>
              </BrowserRouter>
        }
      />
      <Collapse in={expanded} timeout={900} unmountOnExit classes = {{container: useStyles().container}}>
        <CardContent classes = {{root: useStyles().addDetail}}>
          <ColabDetails/>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default class ProjectsPage extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      loading: true,
      projects: [],
      openRequestsModal: false,
      addDetail: false,
      request: false,
      request_project_id:null,
    }
  }

  componentDidMount()
  {
      const url = window.location.href;
      const parser = require('url-parameter-parser');
      const res = parser(url);
      const user = res.email;
      if(user!=undefined)
      {
        postRequest('project/fetchprojectsofuser',
        {
          'member_email': user,
          'email':window.localStorage.getItem('email'),
          'password': window.localStorage.getItem('password'),
        },
        (res)=>{
          if(res.message=="SUCCESS")
          {
            let default_projects = []
              res.return_value.forEach((item)=>{
                let pro = {
                  title : item.title,
                  description: item.description,
                  startDate: item.startDate,
                  endDate: item.endDate,
                  requirements: item.skills_required,
                  member: item.members,
                  mentor: item.mentor,
                  colab: item.colab,
                  project_link: item.link,
                  project_id: item.project_id,
                  admin: item.admin,
                  colab_type: item.colab_type,
                }
                
                default_projects.push(pro)
                this.setState({projects: default_projects})
              }
            )
            this.setState({loading:false})
          }
        })
      }
      else
      {
        postRequest('project/fetchpublicprojects',
        {
          'email':window.localStorage.getItem('email'),
          'password': window.localStorage.getItem('password'),
        },
        (res)=>{
          if(res.message=="SUCCESS")
          {
            let default_projects = []
              res.return_value.forEach((item)=>{
                let pro = {
                  title : item.title,
                  description: item.description,
                  startDate: item.startDate,
                  endDate: item.endDate,
                  requirements: item.skills_required,
                  member: item.members,
                  mentor: item.mentor,
                  colab: item.colab,
                  project_link: item.link,
                  project_id: item.project_id,
                  admin: item.admin,
                  colab_type: item.colab_type,
                }
                
                default_projects.push(pro)
                this.setState({projects: default_projects})    
              }
            )
            this.setState({loading:false})
          }
        })
      }

  } 
  RequestUser = (index) => {
    let pro = this.state.projects[index];
    this.setState(()=>({
      request: true,
      request_project_id: pro.project_id
    }))
  }

  DeleteProject = (projectIndex) => {
    let projects=this.state.projects;
    let item = projects[projectIndex];
    
    postRequest('project/deleteproject',
      {
        'email':window.localStorage.getItem('email'),
        'password': window.localStorage.getItem('password'),
        'project_id': item.project_id
      },
      (res)=>{
        if(res.message=="SUCCESS")
        {
          window.location.reload()
        }
      }
    )
  }

  render(){

    const url = window.location.href;
    const parser = require('url-parameter-parser');
    const res = parser(url);
    const user = res.email;

    return(
      <div>
        <Header logout = {true}/>
        <div className = "widget__list">
        <PageHeader 
          user = {user}
          newProject = {this.AddDetail} 
          view = {user!=window.localStorage.getItem('email')}
        />
        {console.log(this.state.loading)}
        {
          (this.state.loading)?
          <center><div className = "loader--square"><div/><div/></div></center>
          :
          <WorkView
            works={this.state.projects}
            Request = {this.RequestUser}
          />
        }

        <div id="snackbar">Link Copied to Clipboard..</div>

        {
          (this.state.request)?
          <InviteModal
            request = {this.state.request}
            project_id = {this.state.request_project_id}
            DiscardDetails = {this.DiscardDetails}
          />
          :
          ''
        }
        </div>
      </div>
    )
  }
}
