import React from 'react';

export default class TestPage extends React.Component {
  render(){
    return (
      <div>
        <h1>Notification Button</h1>

        <a href="#" className="notification">
          <span>Inbox</span>
          <span class="badge">3</span>
        </a>
      </div>
    )
  }
}