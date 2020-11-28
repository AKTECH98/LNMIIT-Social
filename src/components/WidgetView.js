import React from 'react';

import {postRequest} from '../components/CallApi';
import Details from '../components/WidgetDetails';

export default class WidgetView extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      sections: [1,2],
    };
  }

  display(section,index) {

    const total_sections = 2;
    const prev = (section==1)?total_sections:section-1;
    const next = (section==total_sections)?1:section+1;

    return(
      <section key = {index} id={this.props.type+section}>
        <a href={'#'+this.props.type+prev} className="arrow__btn">‹</a>
        {
          this.props.work.slice((section-1)*3,(section*3)).map((project,index) => (
            <div className="item" key = {index}>
            <Details
              optionText = {project}
              index = {index}
            />
            </div>
          ))
        }
        <a href={"#"+this.props.type+next} className="arrow__btn">›</a>
      </section>
    )
  }

  render(){
    return(
      <div>
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

