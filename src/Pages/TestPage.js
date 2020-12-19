import React from 'react';
import { Link} from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Header from '../components/Header';
import Dropdown from '../components/Dropdown';
import PhotoSelector from '../components/PhotoSelector';
import DatePicker from '../components/DatePicker';
import Button from '../components/Button';
import {postRequest} from '../components/CallApi'

export default class TestPage extends React.Component {
  render(){
    return(
      <div>
        Developer Construction
      </div>
    )
  }
}
