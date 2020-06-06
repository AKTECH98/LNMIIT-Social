import React from 'react';

import TextField from '@material-ui/core/TextField';

export default class TextFeild extends React.Component {

  render() {
    return (
      <TextField
        disabled = {this.props.disabled}
        variant = "filled"
        style={this.props.FeildStyle}
        InputProps = {this.props.inputprops}
        InputLabelProps = {this.props.LabelStyle}
        onChange = {this.props.Change}
        defaultValue={this.props.default}
        label={this.props.label}
        multiline={this.props.multiline}
      />
    )
  }
}
