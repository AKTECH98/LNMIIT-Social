import React from 'react';
import ReactDOM from 'react-dom';
import {LoginProvider} from '../contexts/LoginContext';
import PageHandler from './PageHandler';

//import 'normalize.css/normalize.css';
import '../styles/style.scss';

ReactDOM.render(<LoginProvider><PageHandler/></LoginProvider>, document.getElementById('app'));
