import React from 'react';
import Modal from 'react-modal';
import Button from './Button';
import {postRequest} from './CallApi'

export default class ViewProjectRequestsModal extends React.Component {
  constructor(props)
    {
      super(props)
      this.state={
        users:[]
      }
    }
  render() {
    
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.close}
        contentLabel="Requests to join"
        className = "modal"
        ariaHideApp={false}
      >
      {postRequest('project/getinterestedmembers',
                    {
                      'email':window.localStorage.getItem('email'),
                      'password': window.localStorage.getItem('password'),
                      'project_id': this.props.project_id
                    },
                    (res)=>{
                      if(res.message=="SUCCESS")
                      {
                        this.setState({users:res.users})
                      }
                    }
                  )
                
        }
        <h3 className = "modal__header">
        Requests to join the project with id
        </h3>
        <table>
            <tr>
                {
                  
                  this.state.users.map((email)=>
                    <tr>
                      <td>
                        {email}
                      </td>
                      <td>
                        <button onClick={
                          postRequest('project/invitetojoin',
                            {
                              'email':window.localStorage.getItem('email'),
                              'password': window.localStorage.getItem('password'),
                              'project_id': this.props.project_id,
                              'user':email
                            },
                            (res)=>{
                              if(res.message=="SUCCESS")
                              {
                                alert("SUCCESS")
                              }
                            }
                        )}>Confirm</button>
                      </td>
                    </tr>
                  )
                }
              
              
            </tr>
        </table>
        <button onClick={this.props.close}>Close</button>
      </Modal>
    )
  }
};
