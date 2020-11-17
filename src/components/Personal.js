import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList'

import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  menuroot: {
    color: 'black',
    fontSize: 12
  },
  root: {
    backgroundColor: 'white',
    height: 'fit-content'
  },
  rootHeader: {
    borderBottom: '0.3rem solid grey',
    height: 'fit-content'
  },
  subRootA: {
    backgroundColor: 'white',
    minWidth: 500,
    minHeight: 200,
    maxHeight: 200
  },
  subRootB:{
    backgroundColor: 'white',
    minHeight: 200,
    maxHeight: 200
  },
  subHeader: {
    borderBottom: '0.1rem solid grey'
  },
  title: {
    fontSize: 30,
    color: '#4574bf',
    fontWeight: 700,
    fontFamily: 'cursive'
  },
  subTitle: {
    fontSize: 20,
    color: '#4574bf',
    fontWeight: 500
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  subContent: {
    color: '#4574bf',
    fontSize: 15
  },
  rootIcon: {
    color: 'blue'
	}
});

export default function Personal(props){

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }


    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  
  return(
  <Card className = {classes.root}>
    <CardHeader 
      classes = {
        {
          root: classes.rootHeader,
          title : classes.title,
          subheader: classes.subHeader
        }
      }

      action={
        props.view?"":<div>
        <IconButton
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          classes = {{root: classes.rootIcon}}
          disabled = {props.view}
        >
          <MoreVertIcon />
        </IconButton>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <Link to={'EditProfile'} className = "linklink">
                  <MenuItem onClick = {handleClose} className = {classes.menuroot}>
                    Edit
                  </MenuItem>
                  </Link>
                </MenuList>
              </ClickAwayListener>
            </Paper>
            </Grow>
          )}
        </Popper>
        </div>
      }  
      
      title= {props.personal==null?'Default Name': props.personal.first_name + ' ' + props.personal.middle_name + ' ' + props.personal.last_name}
    />
    <CardContent classes = {{root:classes.content}}>

      <Card className = {classes.subRootA}>
        <CardHeader
          classes = {{
            root: classes.subHeader,
            title: classes.subTitle
          }}
          title= "About"
        />
        <CardContent classes = {{root:classes.subContent}}>
          {props.personal==null?'Default Description':props.personal.profile_description}
        </CardContent>
      </Card>

      <Card className = {classes.subRootB}>
        <CardHeader
          classes = {{
            root: classes.subHeader,
            title: classes.subTitle
          }}
          title= "Contact Info."
        />
        <CardContent classes = {{root:classes.subContent}}>
          <Typography variant = "h5">
            Phone No. : {props.personal==null?'Default Phone':props.personal.phone}
          </Typography>
          <Typography variant = "h5">
            Email-ID : {props.personal==null?'Default Email':props.personal.email}
          </Typography>
        </CardContent>
      </Card>

    </CardContent>
  </Card>
)}