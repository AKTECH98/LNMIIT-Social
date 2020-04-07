import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";

import MaterialUIGrid from '@material-ui/core/Grid';

class GridItem extends React.Component
{
  constructor(props){
    super(props);
    this.state={
    };
  }


  render()
  {
    const {
      small,
      medium,
      large,
      children
    } = this.props;


    return(
      <MaterialUIGrid item
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
}


GridItem.propTypes = {
  //For states

  //For rendering
  small:PropTypes.number.isRequired,
  medium:PropTypes.number.isRequired,
  large:PropTypes.number.isRequired,
};

export default GridItem;
