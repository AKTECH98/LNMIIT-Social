import React,{useContext} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

import Header from '../../components/Header'
import TextField from '../../components/TextField';
import Card from '../../components/Strip';
import PasswordField from '../../components/PasswordField';
import Grid from '../../components/Grid';
import GridItem from '../../components/GridItem';
import Button from '../../components/Button';
import ColorPicker from '../../components/ColorPicker';

import ProfileTemplate from '../../templates/ProfileTemplate';

import {ColorsContext} from '../../WebsiteMainFiles/GlobalVariables';

export default function MyProfile(props)
{
  const textDefault=useContext(ColorsContext).textDefault;
  const setTextDefault=useContext(ColorsContext).setTextDefault;
  const textSuccess=useContext(ColorsContext).textSuccess;
  const setTextSuccess=useContext(ColorsContext).setTextSuccess;
  const textFailure=useContext(ColorsContext).textFailure;
  const setTextFailure=useContext(ColorsContext).setTextFailure;
  const objectDefault=useContext(ColorsContext).objectDefault;
  const setObjectDefault=useContext(ColorsContext).setObjectDefault;
  const objectSuccess=useContext(ColorsContext).objectSuccess;
  const setObjectSuccess=useContext(ColorsContext).setObjectSuccess;
  const objectFailure=useContext(ColorsContext).objectFailure;
  const setObjectFailure=useContext(ColorsContext).setObjectFailure;
  const background=useContext(ColorsContext).background;
  const setBackground=useContext(ColorsContext).setBackground;
  const foreground=useContext(ColorsContext).foreground;
  const setForeground=useContext(ColorsContext).setForeground;


  return(
      <ProfileTemplate>
          <Grid>
              <h1>About Me</h1>
              <GridItem small={12} medium={12} large={12}>
                  <TextField
                      defaultValue=''
                      label='Full Name'
                  />
              </GridItem>
              <GridItem small={12} medium={12} large={12}>
                  <TextField
                      defaultValue=''
                      multiline
                      label='Description'
                  />
              </GridItem>
              <h1>Reset pwd</h1>
              <GridItem small={12} medium={12} large={12}>
                  <PasswordField
                      defaultValue=''
                      label='Current Password'
                    />
              </GridItem>
              <GridItem small={12} medium={12} large={12}>
                  <PasswordField
                      defaultValue=''
                      label='New Password'
                    />
              </GridItem>
              <GridItem small={12} medium={12} large={12}>
                  <PasswordField
                      defaultValue=''
                      label='Confirm New Password'
                    />
              </GridItem>
              <h1>Themes</h1>
              <GridItem small={12} medium={12} large={12}>
                <ColorPicker
                  label="Text Default Value"
                  defaultValue={textDefault}
                  returnValue={setTextDefault}
                />
              </GridItem>
          </Grid>
      </ProfileTemplate>
    );
}
