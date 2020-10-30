import React from 'react';

import Button from './Button';
import WidgetView from './WidgetView';

import { Card, CardActions, CardContent, Typography, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

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

const Header = (props) => (
  <Card className = {useStyles().header}>
    <CardContent>
      <Typography className = {useStyles().title}>
        Projects
      </Typography>
    </CardContent>
    <CardActions>
      <Link to = {'/Projects'}>
      <Button text = "View All" type = "project__button"/>
      </Link>
    </CardActions>
  </Card>
)

export default class ProjectWidget extends React.Component {
  /*
    Modify WidgetView
  */

 ShowProjects = () => {
  this.setState(() => ({
    openModal: true,
    addDetail: true
  }));
}

  render() {
    return (
      <div className = "project__list">
        <Header />
        <WidgetView />
      </div>
    );
  }
}