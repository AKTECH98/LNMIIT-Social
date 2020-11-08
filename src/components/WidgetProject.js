import React from 'react';

import Button from './Button';
import WidgetView from './WidgetView';

import { Card, CardActions, CardContent, Typography} from '@material-ui/core';
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
      <Link to = {props.link}>
      <Button text = "View All" type = "widget__button"/>
      </Link>
    </CardActions>
  </Card>
)

export default class WidgetProject extends React.Component {
  
  constructor(props) {
    super(props);
 
    this.state = {
      link: props.link,
    };
  }
  
  /*
    Modify WidgetView
  */
  render() {
    return (
      <div className = "widget__list">
        <Header link = {this.state.link} />
        <WidgetView />
      </div>
    );
  }
}