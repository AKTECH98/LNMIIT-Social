import React from 'react';

import {ColorsContext,ColorsProvider} from '../globals/Colors.js';
import {UserContext,UsersProvider} from '../globals/User.js';

export {ColorsContext,UserContext};


export function Providers(props){
  return(
    <ColorsProvider>
      <UsersProvider>
        {props.children}
      </UsersProvider>
    </ColorsProvider>
  );
}
