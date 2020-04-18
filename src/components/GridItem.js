import React from 'react';
import PropTypes from "prop-types";

import MaterialUIGrid from '@material-ui/core/Grid';

function GridItem(props)
{
    const {
      small,
      medium,
      large,
      children
    } = props;


    return(
      <MaterialUIGrid 
      item
      zeroMinWidth
      xs={small}
      sm={medium}
      md={medium}
      lg={large}
      xl={large}
      >
        {children}
      </MaterialUIGrid>
    );
}


GridItem.propTypes = {
  //For states

  //For rendering
  small:PropTypes.number.isRequired,
  medium:PropTypes.number.isRequired,
  large:PropTypes.number.isRequired,
};

export default GridItem;
