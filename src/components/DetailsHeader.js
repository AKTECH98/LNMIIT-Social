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
    borderRadius: '10px',
    padding: '5px',
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
}));

export default function HeaderDetails(props) {
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

  const ViewJoinRequests = (event) => {
    props.ViewJoinRequestsWork(props.index);
    handleClose(event);
  }

  const Delete = (event) => {
    props.DeleteWork(props.index);
    handleClose(event);
  }

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

  return (
    <Card className={classes.root}>
      <CardHeader classes={
        {
          root : classes.header,
          title : classes.title,
          subheader : classes.subheader
        }}
        title={props.optionText.title}
        subheader = {
          <div>
          {'Author: '+props.optionText.author}<br/>
          {(props.optionText.mentor!=undefined)?"Mentor : " + props.optionText.mentor:"Mentor : None"}<br/>
          {'Members : '+ props.optionText.member_count}<br/>
          {(props.optionText.requirements!=undefined)?'Skills : '+props.optionText.requirements:"Skills : None Required"}
          </div>
        }
      />
    </Card>
  );
}
