import React from 'react';
import WidgetDetails from './WidgetDetails';

const WorkView = (props) => (
  <div className = "Widget__View">
    { 
      props.works.map((work,index) => (
        <div key = {index}>
        <WidgetDetails
          optionText = {work}
          index = {index}
          EditWork = {props.Edit}
          Request = {props.Request}
          view = {!work.admin}
          badges = {work.badges}
        />
        </div>
      ))
    }
  </div>
);

export default WorkView;
