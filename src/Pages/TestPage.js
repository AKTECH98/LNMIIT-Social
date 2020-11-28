import React from 'react';

import {postRequest} from '../components/CallApi';
import Details from '../components/WidgetDetails';

export default class TestPage extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      projects: [],
      sections: [1,2],
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
          //console.log(default_projects)
          this.setState({projects: default_projects})
        }
      }
    )
  }

  display(section,index) {

    const total_sections = 2;
    const prev = (section==1)?total_sections:section-1;
    const next = (section==total_sections)?1:section+1;

    return(
      <section key = {index} id={'section'+section}>
        <a href={'#section'+prev} className="arrow__btn">‹</a>
        {
          this.state.projects.slice((section-1)*4,(section*4)).map((project,index) => (
              <div className="item" key = {index}>
              <Details
                optionText = {project}
                index = {index}
              />
              </div>
          ))
        }
        <a href={"#section"+next} className="arrow__btn">›</a>
      </section>
    )
  }

  render(){

    const url = window.location.href;
    const parser = require('url-parameter-parser');
    const res = parser(url);
    const query = res.email;

    const user_email = query.split('#')[0];
    const project1 = this.state.projects.slice(0,4);
    const project2 = this.state.projects.slice(5);

    //console.log(this.state.sections);

    return(
      <div>
        <h1>TRY</h1>
        <div className="wrapper">
        {
          this.state.sections.map((section,index)=>(
            this.display(section,index)
          ))
        }
        </div>
      </div>
    )
  }
}

