import React,{useContext} from 'react';
import PropTypes from "prop-types";
import MaterialUICard from '@material-ui/core/Card';
import MaterialUICardContent from '@material-ui/core/CardContent';
import MaterialUICardHeader from '@material-ui/core/CardHeader';

import {ColorsContext} from '../WebsiteMainFiles/GlobalVariables.js';

function Strip (props)
{
    const {
      children,
      headerContent,
    } = props;

    const cardStyle={
      background:useContext(ColorsContext).foreground
    }
    return(<MaterialUICard style={cardStyle}>
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
