import React from 'react';

import Button from './Button';
import WidgetView from './WidgetView';

import { Card, CardActions, CardContent, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

import {postRequest} from './CallApi'

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    marginBottom: '0.25rem',
    height: 'fit-content',
    padding: '0 0.3rem 0 0.3rem',
    border: 0.5,
    borderStyle: 'solid',
    borderColor: 'grey'
  },
  title: {
    fontSize: 14,
    color: '#4574bf',
    fontWeight: '500',
  }
});

function Header(props){
  return(
  <Card className = {useStyles().header}>
    <CardContent>
      <Typography className = {useStyles().title}>
        My Projects
      </Typography>
    </CardContent>
    <CardActions>
      <Link to = {"MyProjects?email="+props.user}>
      <Button text = "View All" type = "widget__button"/>
      </Link>
    </CardActions>
  </Card>
  )
}

export default class WidgetProject extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      projectTitles: []
    };

    postRequest('project/fetchprojectstitle',
      {
        'email': this.props.user
      },
      (res)=>{
        if(res.message=="SUCCESS")
        {
          let titles = []
          res.return_value.forEach((item,index)=>{
          if(index<4)
            titles.push(item);
          })
          this.setState({projectTitles: titles})
          console.log(this.state.projectTitles)
        }
      }
    )
  }

  render() {
    return (
      <div className = "widget__list">
        <Header user = {this.props.user}/>
        <WidgetView titles = {this.state.projectTitles} />
      </div>
    );
  }
}