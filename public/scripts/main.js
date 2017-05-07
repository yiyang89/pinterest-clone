import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './react/appclass';

// Front end rendering and logic
// Use React and jQuery

// Globals
var username = myUser;
var accessTokenFromServer = token;

ReactDOM.render(<AppComponent servertoken={accessTokenFromServer} username={username}/>, document.getElementById('app'));
