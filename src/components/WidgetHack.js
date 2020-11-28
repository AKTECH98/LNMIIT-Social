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
    marginBottom: '2rem',
    marginTop: '3rem',
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
        My Hacks
      </Typography>
    </CardContent>
    <CardActions>
      <Link to = {"MyHacks?email="+props.user}>
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
      hacks: []
    };

    const url = window.location.href;
    const parser = require('url-parameter-parser');
    const res = parser(url);
    const query = res.email;
    const user_email = query.split('#')[0];

    postRequest('hack/fetchhacks',
      {
        'email': user_email,
      },
      (res)=>{
        if(res.message=="SUCCESS")
        {
          let default_hacks = []
          res.return_value.forEach((item)=>{
            default_hacks.push({
              title : item.title,
              description: item.description,
              startDate: item.startDate,
              endDate: item.endDate,
              requirements: item.skills_required,
              member: item.members,
              mentor: item.mentor,
              colab: item.colab,
              hack_id: item.hack_id
            })
          })
          //console.log(default_hacks)
          this.setState({hacks: default_hacks})
          //console.log(this.state.hacks)
        }
      }
    )
  }

  render() {

    const url = window.location.href;
    const parser = require('url-parameter-parser');
    const res = parser(url);
    const user = res.email;

    return (
      <div className = "widget__list">
        <Header user = {user}/>
        <WidgetView type = "hack" work = {this.state.hacks} />
      </div>
    );
  }
}