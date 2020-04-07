import React from 'react';
import PropTypes from "prop-types";
import MaterialUICard from '@material-ui/core/Card';
import MaterialUICardContent from '@material-ui/core/CardContent';
import MaterialUICardHeader from '@material-ui/core/CardHeader';

//TODO: Set background color of card from GlobalVariables
export default class Strip extends React.Component
{
  constructor(props){
    super(props);
  }

  render()
  {
    const {
      children,
      headerContent,
    } = this.props;

    return(<MaterialUICard>
              <MaterialUICardContent>
                {children}
              </MaterialUICardContent>
          </MaterialUICard>
    );
  }
}

Strip.propTypes = {
  //For states

  //For rendering
  children: PropTypes.any.isRequired
};
