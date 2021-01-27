import React from "react";
import {postRequest} from '../components/CallApi'
import Request from '../components/Requests';
import Button from "../components/Button";

import Header from '../components/Header';
import ColabDetails from '../components/ColabDetails';

export default class FullColab extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      loader: true,
      admin: false,
      colab_id: '',
      requestload: false,
      users: []
    }
  }

  componentDidMount(){
    const url = window.location.href;
    const parser = require('url-parameter-parser');
    const res = parser(url);
    
    this.setState({colab_id:res.colabID})

    postRequest('project/getinterestedmembers',
      {
        'email':window.localStorage.getItem('email'),
        'password': window.localStorage.getItem('password'),
        'project_id': res.colabID
      },
      (res)=>{
        if(res.message=="SUCCESS")
        {
          this.setState({users:res.users,admin:true})
        }
        else
        {
          this.setState({admin:false})
        }

        this.setState({loader:false})
      }
    )
  }

  render() {
    return (
      <div>
        <Header logout = {true}/>
        {
          (this.state.loader)?
            <center><div className = "loader--square"><div/><div/></div></center>
          :
            <div className = "collaboration">
            
              <ColabDetails/>  

              <div className = "colab--requests">
              { 
                (this.state.admin)?
                  <div>
                  <Request users = {this.state.users} id = {this.state.colab_id}/>
                  </div>
                :
                  (this.state.requestload)?
                    <center><p><i className="fa fa-spinner fa-spin"></i>Sending Request...</p></center>
                  :
                  <Button text = "Send Colab Request" type = "button colab--button"
                    onClick = {
                      ()=>{
                        this.setState({requestload:true})
                        postRequest('project/requesttojoin',
                            {
                              'email':window.localStorage.getItem('email'),
                              'password': window.localStorage.getItem('password'),
                              'project_id': this.state.colab_id
                            },
                            (res)=>{
                              if(res.message=="FAILURE")
                              {
                                window.alert("Request Not Sent")
                                this.setState({requestload:false})
                              }
                              else
                              {
                                window.alert("Request Sent")
                                this.setState({requestload:false})
                              }
                            }
                          )
                      }}
                  />
              }
              </div>
            </div>
        }
      </div>
    );
  }
}
