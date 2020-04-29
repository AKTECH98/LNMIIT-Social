import React from 'react';
import Modal from 'react-modal';

import AddProject from './AddProject';

const ProjectModal = (props) => (
  <Modal
    isOpen={!!props.addProject}
    onRequestClose={props.submitProject}
    contentLabel="Project Details"
    className = "modal"
    ariaHideApp={false}
  >
    <h3 className = "modal__title">Project Details</h3>
    <AddProject
        handleAddProject={props.handleAddProject}
        projects={props.projects}
    />
    <button className = "button" onClick={props.submitProject}>Submit</button>
  </Modal>
);

export default ProjectModal;
