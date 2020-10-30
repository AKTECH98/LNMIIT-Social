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
    backgroundColor: 'white',
    border: 0.5,
    borderColor: 'grey',
    borderStyle: 'solid',
    marginBottom: '0.25rem',
    height: 'fit-content',
    padding: '0 0.3rem 0 0.3rem'
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
        Hacks
      </Typography>
    </CardContent>
    <CardActions>
      <Link to = {'/Hacks'}>
        <Button text = "View All" type = "widget__button"/>
      </Link>
    </CardActions>
  </Card>
)

export default class WidgetHack extends React.Component {

  render() {
    return (
      <div className = "widget__list">
        <Header />
        <WidgetView/>
      </div>
    );
  }
}