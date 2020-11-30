import React from 'react';
import WidgetDetails from './WidgetDetails';
import {postRequest} from '../components/CallApi'

const WorkView = (props) => (
  <div className = "Widget__View">
    {
      props.works.map((work,index) => (
        <div key = {index}>
        <WidgetDetails
          optionText = {work}
          index = {index}
          DeleteWork = {props.Delete}
          EditWork = {props.Edit}
          Request = {props.Request}
          view = {props.view}
        />
        </div>
      ))
    }
  </div>
);

export default WorkView;
