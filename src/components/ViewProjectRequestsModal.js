import React from 'react';
import Modal from 'react-modal';
import Button from './Button';
import {postRequest} from './CallApi'

import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    width: 'fitContent',
  },
  tableHead: {
    backgroundColor: '#4574bf',
    color: 'white',
    fontSize: 20,
    fontFamily: 'cursive'
  },
  tableRow: {
    "&:hover":{
    }
  },
  tableCell: {
    color: 'black',
    fontSize: 15,
    fontFamily: 'cursive'
  },
  tableCellButton: {
    display: 'flex',
    flexDirection: 'column'
  },
});

function Requests(props){

  const classes = useStyles();
  
  return(
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow classes={{root:classes.tableRow}}>
              <TableCell align = "center" classes={{root:classes.tableHead}}>Email ID</TableCell>
              <TableCell align = "center" classes={{root:classes.tableHead}}>Name</TableCell>
              <TableCell align = "center" classes={{root:classes.tableHead}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(props.users.length==0)?
              <TableRow classes={{root:classes.tableRow}}>
                <TableCell classes={{root:classes.tableCell}} component="th" scope="row">
                 No Pending Requests
                </TableCell>
              </TableRow>
              :
              props.users.map((user) => (
              <TableRow key={user} id = {user} classes={{root:classes.tableRow}}>
                <TableCell classes={{root:classes.tableCell}} component="th" scope="row">
                  {user /*Email Id*/}
                </TableCell>
                <TableCell classes={{root:classes.tableCell}} align="left">
                  Name {/*User Name */}
                </TableCell>
                <TableCell classes={{root:classes.tableCellButton}} align="center">
                {
                  (props.confirm)?<p><i className="fa fa-spinner fa-spin"></i>Confirming Request..</p>:
                  <Button text = "Confirm" type = "button accept__request--button" 
                    onClick = {()=>{props.confirmRequest(user)}}
                  />
                }
                  <Button text = "Reject" type = "button reject__request--button" onClick={props.rejectRequest}/>
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
      users:[],
      confirm: false,
      loading: false
    }
  }
  
  ConfirmRequest = (email_id) => {
    this.setState({confirm:true})
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

          var user = document.getElementById(email_id);
          user.className = "hide";
        }
        else
        {
          this.setState({confirm:false})
        }
      }
    )
  }  

  componentDidMount(){
    postRequest('project/getinterestedmembers',
          {
            'email':window.localStorage.getItem('email'),
            'password': window.localStorage.getItem('password'),
            'project_id': this.props.project_id
          },
          (res)=>{
            if(res.message=="SUCCESS")
            {
              console.log(res)
              this.setState({users:res.users})
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
        <h2 className = "modal__header">Pending Requests</h2>

        {
          (this.state.loading)?
          <p><i className="fa fa-spinner fa-spin"></i>Loading Request...</p>
          :
          <Requests 
            users = {this.state.users}
            confirm = {this.state.confirm}
            confirmRequest = {this.ConfirmRequest}
            rejectRequest = {this.props.close}
          />
        }

        <Button text = "Close" type = "button modal__button" onClick={this.props.close}/>
        <div id="snackbar">Request Accepted</div>
      </Modal>
    )
  }
};
