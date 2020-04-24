import React from 'react';
import PropTypes from "prop-types";

import {withStyles} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({});

export default class PasswordField extends React.Component {
  render() {
    return <TextField type = "password"/>
  }
}

PasswordFeild.PropTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.func.isRequired
}

PasswordFeild = withStyles(styles)(PasswordFeild);