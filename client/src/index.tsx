import React from 'react';
import ReactDOM from 'react-dom';
import {Route} from 'react-router';
import {HashRouter} from "react-router-dom";
import './index.css';
import {Voting} from "./components/Voting"
import reportWebVitals from './reportWebVitals';
import Results from "./components/Results"
import App from "./components/App";

const routes = <div>
<Route path="/results" component={Results}/>
<Route path="/" component={App}/>
<Route path="/voting" component={Results}/>
  </div>
ReactDOM.render(
  <React.StrictMode>
    <HashRouter>{routes}</HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
