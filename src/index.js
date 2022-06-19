import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Parse from 'parse';
import 'react-credit-cards/es/styles-compiled.css';


Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
Parse.initialize(
  'qQ2AMgDUa2kxuxt0HEsorOw7uB5vXOhipV8Zm6CF', // This is your Application ID
  'LUBw95iUPTq6eBVPdBhmC4WKPKJgIRPniD2ditwl' // This is your Javascript key
);


ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
