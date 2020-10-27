import {Map, List} from 'immutable';

function setState(state: any, newState: any) {
  return state.merge(newState);
}

export default function(state = Map(), action: any) {
  switch (action.type) {
  case 'SET_STATE':
    return setState(state, action.state);
  case 'VOTE':
      return vote(state, action.entry);
  }
  return state;
}

function vote(state: Map<any,any>, entry: any) {
  const currentPair = state.getIn(['vote', 'pair']);
  if (currentPair && currentPair.includes(entry)) {
    return state.set('hasVoted', entry);
  } else {
    return state;
  }
}
function resetVote(state: Map<any, any>) {
  const hasVoted = state.get('hasVoted');
  const currentPair = state.getIn(['vote', 'pair'], List());
  if (hasVoted && !currentPair.includes(hasVoted)) {
    return state.remove('hasVoted');
  } else {
    return state;
  }
}