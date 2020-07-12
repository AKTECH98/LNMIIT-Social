import React from 'react';
import WidgetDetails from './WidgetDetails';


const WorkView = (props) => (
  <div className = "Widget__View">
    {
      props.works.map((project,index) => (
        <div key = {index}>
        <WidgetDetails
          optionText = {project}
        />
        </div>
      ))
    }
  </div>
);

export default WorkView;
