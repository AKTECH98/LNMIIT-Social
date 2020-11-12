import React from 'react';

import Button from './Button';
import { Card, CardContent, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  items: {
    backgroundColor: '#464b5e',
    marginBottom: '0.5rem',
    height: 'fit-content'
  },
  item: {
    fontSize: 14,
    color: 'white'
  }
});

const WidgetItem = (props) => (
  <Card className = {useStyles().items}>
    <CardContent className = {useStyles().item}>
      {props.title}
    </CardContent>
  </Card>
);

export default WidgetItem;
