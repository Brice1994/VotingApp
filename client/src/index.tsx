import React from "react";
import ReactDOM from "react-dom";
import { Route } from "react-router";
import { HashRouter } from "react-router-dom";
import "./index.css";
import { VotingContainer } from "./components/Voting";
import reportWebVitals from "./reportWebVitals";
import App from "./components/App";
import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import { Provider } from "react-redux";
import remoteActionMiddleware from "./remote_action_middleware";
import io from "socket.io-client";

import {setState} from './action_creators';

// eslint-disable-next-line no-restricted-globals
const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', (state:any) =>
  store.dispatch(setState(state))
);

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);
store.dispatch({
  type: "SET_STATE",
  state: {
    vote: {
      pair: ["Sunshine", "28 Days Later"],
      tally: { Sunshine: 2 },
    },
  },
});



const routes = (
  <div>
    <Route path="/" component={App} />
    <Route path="/voting" component={VotingContainer} />
  </div>
);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>{routes}</HashRouter>
    </Provider>,
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
