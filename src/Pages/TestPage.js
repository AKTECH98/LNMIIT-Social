import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../components/Button';
import {postRequest} from '../components/CallApi';
import Details from '../components/WidgetDetails';

export default class TestPage extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      projects: [],
    };

    const url = window.location.href;
    const parser = require('url-parameter-parser');
    const res = parser(url);
    const query = res.email;
    const user_email = query.split('#')[0];

    postRequest('project/fetchprojects',
      {
        'email': user_email,
      },
      (res)=>{
        if(res.message=="SUCCESS")
        {
          let default_projects = []
          res.return_value.forEach((item)=>{
            default_projects.push({
              title : item.title,
              description: item.description,
              startDate: item.startDate,
              endDate: item.endDate,
              requirements: item.skills_required,
              member: item.members,
              mentor: item.mentor,
              colab: item.colab,
              project_link: item.link,
              project_id: item.project_id
            })
          })
          console.log(default_projects)
          this.setState({projects: default_projects})
        }
      }
    )
  }

  render(){

    const url = window.location.href;
    const parser = require('url-parameter-parser');
    const res = parser(url);
    const query = res.email;

    const user_email = query.split('#')[0];

    return(
      <div>
        <h1>TRY</h1>
        <div className="wrapper">
          <section id="section1">
            <a href="#section3" className="arrow__btn">‹</a>
            {
              this.state.projects.map((project,index) => (
                  <div className="item" key = {index}>
                  <Details
                    optionText = {project}
                    index = {index}
                  />
                  </div>
              ))
            }
            <a href="#section2" className="arrow__btn">›</a>
          </section>
          <section id="section2">
            <a href="#section1" className="arrow__btn">‹</a>
            {
              this.state.projects.map((project,index) => (
                  <div className="item" key = {index}>
                  <Details
                    optionText = {project}
                    index = {index}
                  />
                  </div>
              ))
            }
            <a href="#section3" className="arrow__btn">›</a>
          </section>
          <section id="section3">
            <a href="#section2" className="arrow__btn">‹</a>
            {
              this.state.projects.map((project,index) => (
                  <div className="item" key = {index}>
                  <Details
                    optionText = {project}
                    index = {index}
                  />
                  </div>
              ))
            }
            <a href="#section1" className="arrow__btn">›</a>
          </section>
        </div>
      </div>
    )
  }
}
