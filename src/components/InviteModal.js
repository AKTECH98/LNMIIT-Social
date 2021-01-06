import React from 'react';
import Modal from 'react-modal';
import Button from './Button';
import {postRequest} from './CallApi'

export default class InviteModal extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      success: false
    }
  }

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
            <Button onClick=
              {()=>{
                postRequest('project/requesttojoin',
                    {
                      'email':window.localStorage.getItem('email'),
                      'password': window.localStorage.getItem('password'),
                      'project_id': this.props.project_id
                    },
                    (res)=>{
                      if(res.message=="FAILURE")
                      {
                        var x = document.getElementById("snackbar");
                        x.className = "show";
                        setTimeout(function(){ x.className = x.className.replace("show", ""); },2000);
                        
                        this.setState(()=>({success:false}))
                        console.log(this.state.success)
                      }
                      else
                      {
                        var x = document.getElementById("snackbar");
                        x.className = "show";
                        setTimeout(function(){ x.className = x.className.replace("show", ""); },2000);
                        this.setState(()=>({success:true}))
                        console.log(this.state.success)
                      }
                      this.props.DiscardDetails()

                    }
                  )

                  console.log(this.state.success)
                
              }}
              text = "CONFIRM" type = "button modal__button"/>
            <Button onClick={this.props.DiscardDetails} text = "Don't Send" type = "button modal__button"/>
            {
              (this.state.success)?
              <div id="snackbar">Request Sent to Author</div>
              :
              <div id="snackbar">Request Was Not Sent</div>
            }
        </div>
      </Modal>
    )
  }
};
