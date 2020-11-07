import React from 'react';

import Button from './Button';

import { Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';
import {postRequest} from './CallApi'
import WidgetView from './WidgetView';

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
      <Link to = {'/MyHacks'}>
        <Button text = "View All" type = "widget__button"/>
      </Link>
    </CardActions>
  </Card>
)

export default class WidgetHack extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      hackTitles: []
    };

    postRequest('hack/fetchhackstitle',
      {
        'email':window.localStorage.getItem('email'),
        'password': window.localStorage.getItem('password'),
      },
      (res)=>{
        if(res.message=="SUCCESS")
        {
          let titles = []
          res.return_value.forEach((item,index)=>{
          if(index<4)
            titles.push(item);
          })
          this.setState({hackTitles: titles})
          console.log(this.state.hackTitles)
        }
      }
    )
  }

  render() {
    return (
      <div className = "widget__list">
        <Header />
        <WidgetView titles = {this.state.hackTitles}/>
      </div>
    );
  }
}