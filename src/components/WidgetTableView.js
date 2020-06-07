import React from 'react';

const WidgetTableView = (props) => (
  <div>
    <table>
      <tr>
        <th>Project Name</th>
        <th>Mentor</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Number of members</th>
      </tr>
    {
      props.projects.map((project,index) => (
        <tr>
          <td>{project.title}</td>
          <td>{project.mentor}</td>
          <td>{project.startDate.toString()}</td>
          <td>{project.endDate.toString()}</td>
          <td>{project.member}</td>
        </tr>
      ))
    }
    </table>
  </div>
);

export default WidgetTableView;
