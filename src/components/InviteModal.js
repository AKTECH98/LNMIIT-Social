import React from 'react';
import Modal from 'react-modal';
import Button from './Button';

export default class InviteModal extends React.Component {
  render() {
    return (
      <Modal
        isOpen={!!this.props.request}
        onRequestClose={this.props.DiscardDetails}
        contentLabel="Project Details"
        className = "modal"
        ariaHideApp={false}
      >
        <h3 className = "modal__header">
        Do you want to send a Collab Request?
        </h3>
        <div className = "modal__details">
            <Button text = "CONFIRM" type = "button modal__button"/>
            <Button text = "Don't Send" type = "button modal__button"/>
        </div>
      </Modal>
    )
  }
};
