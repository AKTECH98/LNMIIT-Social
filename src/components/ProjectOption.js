import React from 'react';
import OptionList from './OptionList';

const ProjectOptions = (props) => (
  <div>
    {
      props.projects.map((project,index) => (
        <OptionList
          count = {index+1}
          key={index}
          optionText={project.title}
          ShowDetails = {() => {props.ShowDetails(index)}}
        />
      ))
    }
  </div>
);

export default ProjectOptions;
