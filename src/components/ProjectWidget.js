import React from 'react';

import Button from './Button';
import WidgetView from './WidgetView';

import { Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#20222b',
    marginBottom: '0.25rem',
    height: 'fit-content',
    padding: '0 0.3rem 0 0.3rem'
  },
  title: {
    fontSize: 14,
    color: 'white',
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
      <Button text = "See All" type = "project__button"/>
      </Link>
    </CardActions>
  </Card>
)

export default class ProjectWidget extends React.Component {
  /*
    Modify WidgetView
  */

  render() {
    return (
      <div className = "project__list">
        <Header />
        <WidgetView />
      </div>
    );
  }
}