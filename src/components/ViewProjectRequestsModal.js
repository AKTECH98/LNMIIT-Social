import React from 'react';
import Modal from 'react-modal';
import Button from './Button';
import {postRequest} from './CallApi'

import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    width: 'fitContent',
  },
  tableCell: {
    color: '#4574bf',
    fontSize: 15,
  },
  tableRow: {
    "&:hover":{
    }
  },
});

function Requests(props){

  const classes = useStyles();
  
  return(
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {(props.users==undefined)?
              console.log("Empty")
              :
              props.users.map((user) => (
              <TableRow key={user} classes={{root:classes.tableRow}}>
                <TableCell classes={{root:classes.tableCell}} component="th" scope="row">
                  {user /*Email Id*/}
                </TableCell>
                <TableCell classes={{root:classes.tableCell}} align="left">
                  Name {/*User Name */}
                </TableCell>
                <TableCell classes={{root:classes.tableCell}} align="left">
                  <Button text = "Confirm" type = "button modal__button" 
                    onClick = {()=>{props.confirmRequest(user)}}
                  />
                </TableCell>
                <TableCell classes={{root:classes.tableCell}} align="left">
                  <Button text = "Reject" type = "button modal__button"/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
)}

export default class ViewProjectRequestsModal extends React.Component {
  constructor(props)
  {
    super(props)
    this.state={
      users:[]
    }
  }
  
  ConfirmRequest = (email_id) => {
    postRequest('project/invitetojoin',
      {
        'email':window.localStorage.getItem('email'),
        'password': window.localStorage.getItem('password'),
        'project_id': this.props.project_id,
        'user': email_id
      },
      (res)=>{
        if(res.message=="SUCCESS")
        {
          var x = document.getElementById("snackbar");
          x.className = "show";
          setTimeout(function(){ x.className = x.className.replace("show", ""); },2000);
        }
      }
    )
  }  

  render() {
    
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.close}
        contentLabel="Requests to join"
        className = "modal"
        ariaHideApp={false}
      >
      {
        postRequest('project/getinterestedmembers',
          {
            'email':window.localStorage.getItem('email'),
            'password': window.localStorage.getItem('password'),
            'project_id': this.props.project_id
          },
          (res)=>{
            if(res.message=="SUCCESS")
            {
              this.setState({users:res.users})
            }
          }
        )          
      }
        <h3 className = "modal__header">Pending Requests</h3>
        <Requests 
          users = {this.state.users}
          confirmRequest = {this.ConfirmRequest}
        />
        <Button text = "Close" type = "button modal__button" onClick={this.props.close}/>
        <div id="snackbar">Request Accepted</div>
      </Modal>
    )
  }
};
