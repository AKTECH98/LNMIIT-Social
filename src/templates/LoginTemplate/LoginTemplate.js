import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";

import Card from '../../components/Strip';
import Grid from '../../components/Grid';
import GridItem from '../../components/GridItem';

import LoginTemplateBackground from './LoginTemplateBackground.jpg';

export default class Login extends React.Component
{
  constructor(props){
    super(props);
    this.state={};
  }
  render()
  {
    const {
      children
    } = this.props;

    const containerStyle={
      background:'url('+LoginTemplateBackground+')',
      height:'100%',
      backgroundSize: 'cover',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }

    return(
          <div style={containerStyle}>

          <Grid>
            <GridItem small={1} medium={3}  large={3}>
            </GridItem>
            <GridItem small={10} medium={6}  large={6}>
              <Card>
                {children}
              </Card>
            </GridItem>
            <GridItem small={1} medium={3}  large={3}>
            </GridItem>

          </Grid>
          </div>
    );
  }
}
