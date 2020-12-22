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
    marginBottom: '2rem',
    marginTop: '10px',
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
}

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
          let hacks = []
          res.return_value.forEach((item)=>{
            hacks.push({
              title : item.title,
              description: item.description,
              startDate: item.startDate,
              endDate: item.endDate,
              requirements: item.skills_required,
              member: item.members,
              mentor: item.mentor,
              colab: item.colab,
              hack_link: item.link,
              hack_id: item.hack_id
            })
          })
          //console.log(default_hacks)
          this.setState({hacks})
          //console.log(this.state.sections)
        }
      }
    )
  }

  render() {
    return (
      <div className = "widget__list">
        <Header user = {this.props.user}/>
        <WidgetView work = {this.state.hacks} />
      </div>
    );
  }
}