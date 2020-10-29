function setState(state: any, newState: any) {
  return {
    ...state,
    ...newState
  }
}

export default function(state = {}, action: any) {
  switch (action.type) {
  case 'SET_STATE':
    return resetVote(setState(state, action.state));
  case 'VOTE':
      return vote(state, action.entry);
  }
  return state;
}

function vote(state: {vote?: {pair: string[]}}, entry: string) {
  if(!state.vote){
    return state;
  }
  if(!state.vote.pair){
    return state;
  }
  const currentPair = state.vote.pair;
  if (currentPair && currentPair.includes(entry)) {
    return {
      ...state,
      hasVoted: entry
    }
  } else {
    return state;
  }
}
function resetVote(state: {vote: {pair: string[]}, hasVoted?: string}) {
  const hasVoted = state.hasVoted;
  const currentPair = state.vote.pair;
  if (hasVoted && !currentPair.includes(hasVoted)) {
    const copy = {...state};
    delete copy.hasVoted;
    return copy;
  } else {
    return state;
  }
}