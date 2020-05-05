import React from 'react';
import WidgetItem from './WidgetItem';

const WidgetView = (props) => (
  <div>
    {
      props.projects.map((project,index) => (
        <WidgetItem
          optionText={project.title}
          ShowDetails = {() => {props.ShowDetails(index)}}
        />
      ))
    }
  </div>
);

export default WidgetView;
