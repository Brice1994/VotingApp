import {Map} from 'immutable';

function setState(state: any, newState: any) {
  return state.merge(newState);
}

export default function(state = Map(), action: any) {
  switch (action.type) {
  case 'SET_STATE':
    return setState(state, action.state);
  }
  return state;
}