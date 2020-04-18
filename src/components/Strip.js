import React from 'react';
import PropTypes from "prop-types";

import MaterialUICard from '@material-ui/core/Card';
import MaterialUICardContent from '@material-ui/core/CardContent';

const Strip =  (props) => {
    
  const {
    children
  } = props;

  return(
    <MaterialUICard>
      <MaterialUICardContent>
        {children}
      </MaterialUICardContent>
    </MaterialUICard>
  );
}

Strip.propTypes = {
  //For states

  //For rendering
  children: PropTypes.any.isRequired
};

export default Strip;
