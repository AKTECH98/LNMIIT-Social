import React from 'react';


import Header from '../components/Header';
import WorkView from '../components/WorkView';


import { Card, CardActions, CardContent, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#f5aa0a',
    marginBottom: '1rem',
    height: 'fit-content',
    padding: '0 0.3rem 0 0.3rem',
    border: 1,
    borderStyle: 'solid',
    borderColor: 'grey'
  },
  title: {
    fontSize: 15,
    color: 'white',
    fontWeight: '500',
  }
});

const PageHeader = (props) => (
  <Card className = {useStyles().header}>
    <CardContent>
      <Typography className = {useStyles().title}>
        All Projects
      </Typography>
    </CardContent>
  </Card>
)

export default class ProjectsPage extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      projects: [],
      openModal: false,
      addDetail: false,
      showDetail: false,
      editDetail: false,
      project: {
        index: -1,
        title: null,
        description: null,
        startDate: null,
        endDate: null,
        requirements: null,
        mentor:null,
        member: 0
      }
    };
  }



  ShowDetails = (index) => {
    let pro = this.state.projects[index];

    this.setState(() => ({
      project: {
        index: index,
        title: pro.title,
        description: pro.description,
        startDate: pro.startDate,
        endDate: pro.endDate,
        requirements: pro.requirements,
        mentor: pro.mentor,
        member: pro.member
      },
      showDetail: true,
      openModal: true
    }))
  }



  render() {
    return(
      <div>
        <Header logout = {true}/>
        <div className = "widget__list">
        <PageHeader newProject = {this.showDetail} />
          <WorkView
            works={this.state.projects}
            ShowDetails={this.ShowDetails}
          />
          {
            (this.state.openModal)?
            <ProjectModal
              showDetail = {this.state.showDetail}
              project = {this.state.project}
            />
            :
            ''
          }
        </div>
      </div>
    )
  }
}
