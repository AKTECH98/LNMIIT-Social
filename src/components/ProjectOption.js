import React from 'react';
import OptionList from './OptionList';

const ProjectOptions = (props) => (
  <div>
    {
      props.projects.map((project,index) => (
        <OptionList
          count = {index+1}
          key={index}
          optionText={'Project:'+project.title+' Descrip:'+project.description+' Member:'+project.members}
          deleteProject={()=>{props.deleteProject(index)}}
        />
      ))
    }
  </div>
);

export default ProjectOptions;
