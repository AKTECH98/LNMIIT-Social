import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";

import MaterialUIGrid from '@material-ui/core/Grid';

class Grid extends React.Component
{
  constructor(props){
    super(props);
    this.state={
    };
  }


  render()
  {
    const {
      children
    } = this.props;

    return(
      <MaterialUIGrid container
                      spacing={0}
                      justify="center"
                      alignItems="center"
      >
      {children}
      </MaterialUIGrid>
    );
  }
}


Grid.propTypes = {
  //For states

  //For rendering
};

export default Grid;
