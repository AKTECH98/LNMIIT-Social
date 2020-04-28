import React from 'react';
import OptionList from './OptionList';

const ProjectOptions = (props) => (
  <div>
    {
      props.projects.map((project,index) => (
        <OptionList
          count = {index+1}
          key={project}
          optionText={project}
          deleteProject={props.deleteProject}
        />
      ))
    }
  </div>
);

export default ProjectOptions;