import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header';
import { Card, CardContent, CardHeader, Avatar } from '@material-ui/core';

const url = window.location.href;
const parser = require('url-parameter-parser');
const res = parser(url);const search_term = (res.search==undefined)?"":res.search

const useStyles = makeStyles({
  root: {
    backgroundColor: '#f5aa0a',
    minWidth: '50%',
    height: 'fit-content',
  },
  subRoot: {
    backgroundColor: '#f5f5f5',
    marginBottom: 5
  },
  pageTitle: {
    fontSize: 30,
    fontFamily: 'cursive'
  },
  title: {
    fontSize : 18,
    fontFamily: 'cursive'
  },
  subheader: {
    color: 'gray',
    fontSize : 12,
    fontFamily: 'cursive',
    borderBottom: '0.1rem solid grey'
  },
  content: {
    fontSize: 15
  },
});

function SearchPannel(props){

  const classes = useStyles();

  return(
    <Card className = {classes.root}>
      <CardHeader
        classes = {
          {
            title : classes.pageTitle
          }
        }
        title = "Search Result"
      />
      <CardContent>
        <div>
          <Card className = {classes.subRoot}>
            <CardHeader
              classes = {
              {
                title : classes.title,
                subheader : classes.subheader
              }}
              avatar={
                <Avatar>
                </Avatar>
              }
              title = "Default Name"
              subheader = "Position"
            />
            <CardContent classes = {{root: classes.content}}>
              Description of The Profile
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}

export default class SearchPage extends React.Component {

  render(){
    return (
      <div>
        <Header logout = {true} />
        <div className = "notify">
        <div>
        </div>
        <SearchPannel />
        <div>
        </div>
        </div>
      </div>
    )
  }
}