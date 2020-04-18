import React from 'react';

import MaterialUIGrid from '@material-ui/core/Grid';

const Grid = (props) =>{
    
  const{
    children  
  }=props;

  return(
    <MaterialUIGrid 
    container
    spacing={0}                    
    alignItems="center"
    >
      {children}
    </MaterialUIGrid>
  );
};

export default Grid;
