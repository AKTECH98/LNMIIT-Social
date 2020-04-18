import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';


import Card from './Strip'
import Button from './Button'
import Grid from './Grid'
import GridItem from './GridItem'


export default class Header extends React.Component {
    render() {
        return (
            <Card>
                <Grid>
                <GridItem large={10} medium={10} small={12}>
                  LNMIIT SOCIAL
                </GridItem>
                <GridItem large={2} medium={2} small={12}>
                  <Link to='/SignUp'>
                    <Button text='SignUp'/>
                  </Link>
                  <Link to='/Login'>
                    <Button text='Login'/>
                  </Link>
                </GridItem>
                </Grid>
            </Card>
        )
    }

}
