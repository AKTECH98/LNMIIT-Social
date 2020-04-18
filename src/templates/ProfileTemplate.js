import React,{useContext} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";

import Card from '../components/Strip';
import Grid from '../components/Grid';
import GridItem from '../components/GridItem';

import {ColorsContext} from '../WebsiteMainFiles/GlobalVariables.js';

export default function ProfileTemplate(props)
{
    const {
      children
    } = props;

    const backgroundColor=useContext(ColorsContext).background
    return(
          <div style={{background:backgroundColor,height:'100%'}}>

          <Grid>
            <GridItem small={12} medium={12}  large={1}>
            </GridItem>
            <GridItem small={12} medium={12}  large={10}>
              <Card>
                {children}
              </Card>
            </GridItem>
            <GridItem small={12} medium={12}  large={1}>
            </GridItem>

          </Grid>
          </div>
    );
}
