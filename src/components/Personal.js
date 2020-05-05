import React from 'react';

import Button from './Button';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#464b5e'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 20
  },
  title: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
  }
});

const Personal = (props) => (
  <Card className = {useStyles().root}>
    <CardContent className = {useStyles().header}>
      Profile Name
      <Button text="EDIT" type="button__edit"/>
    </CardContent>
  </Card>
)

export default Personal;