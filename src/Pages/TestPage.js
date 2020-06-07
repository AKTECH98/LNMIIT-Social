import React from 'react';

import Button from '../components/Button';

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: 'Black'
  },
  title: {
    color: 'white'
  }
}));

export default function RecipeReviewCard() {

  const classes = useStyles();

  return (
    <Card classes={{root:classes.root}}>
      <CardHeader
        action={
          <Button text = "EDIT" />
        }
        classes = {
          {
            title : classes.title
          }
        }
        title="Anshul Kiyawat"
      />
    </Card>
  );
}
