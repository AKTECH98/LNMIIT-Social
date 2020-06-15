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
          <td>{''+project.startDate.getDate()+'-'+(project.startDate.getMonth()+1)+'-'+project.startDate.getFullYear()}</td>
          <td>{''+project.endDate.getDate()+'-'+(project.endDate.getMonth()+1)+'-'+project.endDate.getFullYear()}</td>
          <td>{project.member}</td>
        </tr>
      ))
    }
    </table>
  </div>
);

export default WidgetTableView;
