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
          ViewJoinRequestsWork = {props.ViewJoinRequests}
          Request = {props.Request}
          view = {(work.admin==undefined)?props.view:(!work.admin || props.view)}
        />
        </div>
      ))
    }
  </div>
);

export default WorkView;
