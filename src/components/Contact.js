import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  header: {
    fontSize: 15,
    fontColor: 'black'
  },
  root:{
    backgroundColor: 'white',
    Height: 'fit-content',
    Width: 'fit-content'
  },
  subHeader: {
    borderBottom: '0.1rem solid grey',
    fontSize: 12,
    fontColor: 'black'
  },
  title: {
    fontSize: 25,
    color: '#4574bf',
    fontWeight: 400
  },
  content: {
    color: '#4574bf',
    fontSize: 15
  },
  table: {
    width: 'fitContent',
  },
  tableCell: {
    color: '#4574bf',
    fontSize: 15,
  },
  tableRow: {
    "&:hover":{
      backgroundColor: 'black',
    }
  },
  rootIcon: {
    color: 'blue'
  }
});

export default function Contact(props){

  const classes = useStyles();
  
  return(
  <Card className = {classes.root}>
    <CardHeader
      classes = {{
        root: classes.header,
        title: classes.title,
        subheader: classes.subHeader
      }}

      action={
        (props.view)?
        ""
        :
        <div>
          <Link to={'EditProfile'} className = "linklink">
            <IconButton disabled = {props.view}>
              <EditTwoToneIcon style = {{ fontSize: 25, color: "blue" }} />
            </IconButton>
          </Link>
        </div>
      }

      title= "Contact Info. & Links"
      subheader = "."
    />
    <CardContent classes = {{root:classes.content}}>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow classes={{root:classes.tableRow}}>
              <TableCell classes={{root:classes.tableCell}} component="th" scope="row">
                Phone No.
              </TableCell>
              <TableCell classes={{root:classes.tableCell}} align="left">
                {props.personal==null?'Not Provided':props.personal.phone}
              </TableCell>
            </TableRow>
            <TableRow classes={{root:classes.tableRow}}>
              <TableCell classes={{root:classes.tableCell}} component="th" scope="row">
                E-Mail
              </TableCell>
              <TableCell classes={{root:classes.tableCell}} align="left">
                {props.personal==null?'Not Provided':props.personal.email}
              </TableCell>
            </TableRow>
            <TableRow classes={{root:classes.tableRow}}>
              <TableCell classes={{root:classes.tableCell}} component="th" scope="row">
                Linkedin
              </TableCell>
              <TableCell classes={{root:classes.tableCell}} align="left">
                {
                  (props.personal==null)?'Not Provided':
                  <a className = "linklink" href = {"https://"+props.personal.linkedin}>
                    Visit My Linkedin Page
                  </a>
                }
                </TableCell>
            </TableRow>
            <TableRow classes={{root:classes.tableRow}}>
              <TableCell classes={{root:classes.tableCell}} component="th" scope="row">
                GitHub
              </TableCell>
              <TableCell classes={{root:classes.tableCell}} align="left">
                {
                  (props.personal==null)?'Not Provided':
                  <a className = "linklink" href = {"https://"+props.personal.github}>
                    Visit My GitHub Profile
                  </a>
                }
              </TableCell>
            </TableRow>
            <TableRow classes={{root:classes.tableRow}}>
              <TableCell classes={{root:classes.tableCell}} component="th" scope="row">
                Codeforces
              </TableCell>
              <TableCell classes={{root:classes.tableCell}} align="left">
                {props.personal==null?'Not Provided':props.personal.codeforces}
              </TableCell>
            </TableRow>
            <TableRow classes={{root:classes.tableRow}}>
              <TableCell classes={{root:classes.tableCell}} component="th" scope="row">
                CodeChef
              </TableCell>
              <TableCell classes={{root:classes.tableCell}} align="left">
                {props.personal==null?'Not Provided':props.personal.codechef}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
  </Card>
)}