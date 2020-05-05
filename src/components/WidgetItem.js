import React from 'react';

import Button from './Button';
import { Card, CardContent, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  items: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#464b5e',
    marginBottom: '0.5rem',
    height: 'fit-content'
  },
  item: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  }
});

const WidgetItem = (props) => (
  <Card className = {useStyles().items}>
    <CardContent className = {useStyles().item}>
      {props.optionText}
    </CardContent>
    <CardActions>
    <Button
      type = "button--link more__button"
      onClick={props.ShowDetails}
      text = "More"
    />
    </CardActions>
  </Card>
);

export default WidgetItem;
