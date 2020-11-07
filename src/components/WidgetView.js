import React from 'react';
import Button from './Button';
import WidgetItem from './WidgetItem';

const WidgetView = (props) => (
  <div className = "widget__list">
  {
    props.titles.map((title,index) => (
      <div key = {index}>
        <WidgetItem title = {title}/>
      </div>
    ))
  }
  </div>
);

export default WidgetView;