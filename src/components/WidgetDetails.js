import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from "clsx";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GitHubIcon from '@material-ui/icons/GitHub';
import ColabIcon from '@material-ui/icons/CheckCircleOutlineOutlined';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    color: '#4574bf',
    width: 230,
    height: 'fit-content',
    border: '#4574bf',
    borderStyle: 'solid',
    borderRadius: '10px'
  },
  header: {backgroundColor: '#101010'},
  title: {
    color: '#4574bf',
    fontSize : 20,
    height: 'fit-content'
  },
  subheader: {
    color: 'gray',
    fontSize : 12
  },
  content: {
    fontSize: 15,
    minHeight: 125,
    maxHeight: 125
  },
  action: {
    minHeight: 20,
    maxHeight: 20
  },
  rootIcon: {
    color: 'blue'
  }
}));

export default function Details(props) {
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

  const Edit = (event) => {
    props.EditWork(props.index);
    handleClose(event);
  }

  const Delete = (event) => {
    props.DeleteWork(props.index);
    handleClose(event);
  }

  function handleListKeyDown(event) {
    console.log(event.key);
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

  return (
    <Card className={classes.root}>
      <CardHeader classes={
        {
          root : classes.header,
          title : classes.title,
          subheader : classes.subheader
        }
      }
        action={
          (props.view)?"":<div>
          <IconButton
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            classes = {{root: classes.rootIcon}}
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
                    <MenuItem onClick={Edit}>Edit</MenuItem>
                    <MenuItem onClick={Delete}>Delete</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
              </Grow>
            )}
          </Popper>
          </div>
        }
        title={props.optionText.title}
        subheader = {
          <div>
          {'Author: Author Name'}<br/>
          {(props.optionText.mentor!=undefined)?"Mentor : " + props.optionText.mentor:"Mentor : None"}<br/>
          {'Members : '+ props.optionText.member}<br/>
          {(props.optionText.requirements!=undefined)?'Skills : '+props.optionText.requirements:"Skills : None"}
          </div>
        }
      />
      <CardContent classes = {{root: classes.content}}>
        Description :<hr/><br/>
        {(props.optionText.description==undefined)?'None':props.optionText.description}
      </CardContent>
      <CardActions classes = {{root:classes.action}}>
        {
          (props.optionText.project_link)?
          <a href = {props.optionText.project_link}>
            <IconButton>
              <GitHubIcon fontSize = "large" style = {{color:'black'}} />
            </IconButton>
          </a>
          :""
        }
        {
          (props.optionText.colab)?
            <IconButton>
              <ColabIcon fontSize = "large" style = {{color:'green'}} />
            </IconButton>
            :""
        }
      </CardActions>
    </Card>
  );
}
