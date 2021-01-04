import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header';
import { Card, CardContent, CardHeader, Avatar } from '@material-ui/core';

import {postRequest} from '../components/CallApi';

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
        title = "Search Result.  TODO: Remove duplicates from backend"
      />
      <CardContent>
      {
          props.results.map((e)=>{
            return (
              <Link to={"ProfilePage?email="+e.email}>
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
                    title = {e.name}
                    subheader = "Position"
                  />
                  <CardContent classes = {{root: classes.content}}>
                    {e.desc}
                  </CardContent>
                </Card>
              </div>
              </Link>
            )
          })
          
      }
       
      </CardContent>
    </Card>
  )
}

export default class SearchPage extends React.Component {
  constructor(props){
    super(props)
    {
      this.state={
        results:[]
      }
    }
  }
  componentDidMount(){
    const url = window.location.href;
  const parser = require('url-parameter-parser');
  const res = parser(url);
  const search_term = (res.search==undefined)?"":res.search     
    postRequest('search/searchuser',
                {
                  'name':search_term,
               },
              (res)=>{this.setState({results:res.users})})
  }
  render(){
    return (
      <div>
        <Header logout = {true} />
        <div className = "notify">
        <div></div>
        <SearchPannel results={this.state.results}/>
        </div>
      </div>
    )
  }
}