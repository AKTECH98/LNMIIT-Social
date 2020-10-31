import React from 'react';

import Button from '../../components/Button';
import Header from '../../components/Header';
import ProjectModal from '../../components/ProjectModal';

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
        Hackthons
      </Typography>
    </CardContent>
    <CardActions>
      <Button text = "+Add"  onClick = {props.newHack} type = "widget__button hack__add"/>
    </CardActions>
  </Card>
)

export default class HackthonPage extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      hacks: [],
      openModal: false,
      addDetail: false,
      showDetail: false,
      editDetail: false,
      hack: {
        index: -1,
        title: null,
        description: null,
        startDate: null,
        endDate: null,
        requirements: null,
        mentor:null,
        member: 0
      }
    };
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

  render(){
    return(
      <div>
        <Header logout = {true}/>
        <div className = "widget__list">
        <PageHeader newHack = {this.AddDetail} />
        Under Construction
        {
          (this.state.openModal)?
          <ProjectModal
            openModal = {this.state.openModal}
            addDetail = {this.state.addDetail}
            showDetail = {this.state.showDetail}
            editDetail = {this.state.editDetail}
            project = {this.state.hack}
            SubmitDetails = {this.SubmitDetails}
            DiscardDetails = {this.DiscardDetails}
            EditDetails = {this.EditDetails}
            DeleteProject = {this.DeleteHack}
            EditProject = {this.EditHack}
          />
          :
          ''
        }
        </div>
      </div>
    )
  }
}
