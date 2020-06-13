import React from 'react';

import Header from '../../components/Header';
import ProjectWidget from '../../components/ProjectWidget';


export default class ProjectsPage extends React.Component {

  render(){
    return(
      <div>
        <Header />
        <ProjectWidget />
      </div>
    )
  }
}
