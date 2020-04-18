import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";

import MaterialUIGrid from '@material-ui/core/Grid';

function Grid(props)
{
    const{
      children
    }=props;

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


Grid.propTypes = {
  //For states

  //For rendering
};

export default Grid;
