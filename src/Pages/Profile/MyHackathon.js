import React from 'react';

import Button from '../../components/Button';
import Header from '../../components/Header';
import InviteModal from '../../components/InviteModal';
import HackModal from '../../components/HackModal';
import WorkView from '../../components/WorkView';
import {postRequest} from '../../components/CallApi'

import { Card, CardActions, CardContent, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#f5aa0a',
    marginBottom: '1rem',
    height: 'fit-content',
    padding: '0 0.3rem 0 0.3rem',
    border: 1,
    borderStyle: 'solid',
    borderColor: 'grey'
  },
  title: {
    fontSize: 15,
    color: 'white',
    fontWeight: '500',
  }
});

const PageHeader = (props) => (
  <Card className = {useStyles().header}>
    <CardContent>
      <Typography className = {useStyles().title}>
        My Hackathons
      </Typography>
    </CardContent>
    {
      (props.view)?"":
      <CardActions>
        <Button text = "+Add"  onClick = {props.newHack} type = "widget__button project__add"/>
      </CardActions>
    }
  </Card>
)

export default class HacksPage extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      hacks: [],
      openModal: false,
      addDetail: false,
      showDetail: false,
      editDetail: false,
      request: false,
      hack: {
        title: null,
        description: null,
        startDate: null,
        endDate: null,
        requirements: null,
        member: 0,
        mentor:null,
        colab: false,
        hack_id:0
      }
    };

    const url = window.location.href;
    const parser = require('url-parameter-parser');
    const res = parser(url);
    const user = res.email;

    postRequest('hack/fetchhacks',
      {
        'email': user
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
        }
      }
    )
  }

  RequestUser = () =>{
    //console.log("Hello There")
    this.setState(()=>({
      request: true
    }))
  }

  AddDetail = () => {
    this.setState(() => ({
      openModal: true,
      addDetail: true
    }));
  }

  ShowDetails = (index) => {
    let pro = this.state.hacks[index];

    this.setState(() => ({
      hack: {
        index: index,
        title: pro.title,
        description: pro.description,
        startDate: pro.startDate,
        endDate: pro.endDate,
        requirements: pro.requirements,
        mentor: pro.mentor,
        member: pro.member
      },
      showDetail: true,
      openModal: true
    }))
  }

  EditDetails = (index) => {

    let pro = this.state.hacks[index];

    this.setState(() => ({
      hack: pro,
      showDetail: false,
      editDetail: true,
      openModal: true
    }))
  }

  SubmitDetails = (hack,edit) => {
    if(!edit){
      this.setState((prevSate) => ({
        hacks: prevSate.hacks.concat(hack),
        addDetail: false,
        editDetail: false,
        openModal: false
      }));
    }
    else{
      this.setState(() => ({
        addDetail: false,
        editDetail: false,
        openModal: false
      }));

      //this.state.hacks[index] = hack;
    }
  };

  DiscardDetails = () => {
    this.setState(() => ({
      addDetail:false,
      editDetail: false,
      showDetail: false,
      openModal: false,
      request: false
    }))
  }

  EditHack = (index) => {
    console.log(index)
  }

  DeleteHack = (hackIndex) => {
    let hacks=this.state.hacks;
    let item = hacks[hackIndex];
    
    postRequest('hack/deletehack',
      {
        'email':window.localStorage.getItem('email'),
        'password': window.localStorage.getItem('password'),
        'hack_id': item.hack_id
      },
      (res)=>{
        if(res.message=="SUCCESS")
        {
          hacks.splice(hackIndex,1)
          this.setState(() => ({hacks}));
        }
      }
    )
  }

  render(){

    const url = window.location.href;
    const parser = require('url-parameter-parser');
    const res = parser(url);
    const user = res.email;

    return(
      <div>
        <Header logout = {true}/>
        <div className = "widget__list">
        <PageHeader newHack = {this.AddDetail} view = {user!=window.localStorage.getItem('email')}/>
        <WorkView
          works={this.state.hacks}
          ShowDetails={this.ShowDetails}
          Delete = {this.DeleteProject}
          Edit = {this.EditDetails}
          view = {user!=window.localStorage.getItem('email')}
          Request = {this.RequestUser}
        />
        {
          (this.state.openModal)?
          <HackModal
            openModal = {this.state.openModal}
            addDetail = {this.state.addDetail}
            showDetail = {this.state.showDetail}
            editDetail = {this.state.editDetail}
            hack = {this.state.hack}
            SubmitDetails = {this.SubmitDetails}
            DiscardDetails = {this.DiscardDetails}
            EditHack = {this.EditHack}
          />
          :
          ''
        }
        {
          (this.state.request)?
          <InviteModal
            request = {this.state.request}
            DiscardDetails = {this.DiscardDetails}
          />
          :
          ''
        }
        </div>
      </div>
    )
  }
}