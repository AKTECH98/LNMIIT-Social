import React from 'react';

import Button from './Button';
import HackModal from './HackModal';
import WidgetView from './WidgetView';

import { Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
        Hacks
      </Typography>
    </CardContent>
    <CardActions>
      <Button text = "+Add"  onClick = {props.newHack} type = "project__button"/>
    </CardActions>
  </Card>
)

export default class HackWidget extends React.Component {
  state = {
    hacks: [],
    openModal: false,
    addDetail: false,
    showDetail: false,
    editDetail: false,
    hack: {
      index: -1,
      title: null,
      description: null,
      member: 0
    }
  };

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
        member: pro.member
      },
      showDetail: true,
      openModal: true
    }))
  }

  EditDetails = () => {
    this.setState(() => ({
      showDetail: false,
      editDetail: true,
      openModal: true
    }))
  }

  SubmitDetails = (hack,edit,index) => {

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

      this.state.hacks[index] = hack;
    }
  };

  DiscardDetails = () => {
    this.setState(() => ({
      addDetail:false,
      editDetail: false,
      showDetail: false,
      openModal: false
    }))
  }

  EditHack = (index) => {
    console.log(index)
  }

  DeleteHack = (hackIndex) => {
    let hacks=this.state.hacks;
    hacks.splice(hackIndex,1);
    this.setState(() => ({
      openModal: false,
      showDetail: false,
      hacks
    }));
  };

  render() {
    return (
      <div className = "project__list">
        
        <Header newHack = {this.AddDetail} />
        <WidgetView
          projects={this.state.hacks}
          ShowDetails={this.ShowDetails}
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
            EditDetails = {this.EditDetails}
            DeleteHack = {this.DeleteHack}
            EditHack = {this.EditHack}
          />
          :
          ''
        }
      </div>
    );
  }
}
