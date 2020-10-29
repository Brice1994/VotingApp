import { setEntries, next, vote, INITIAL_STATE } from "./core";

interface Action {
  entries?: any;
  entry?: any;
  type: "SET_ENTRIES" |"NEXT" | "VOTE" | string;
}

export default function reducer(state = INITIAL_STATE, action: Action): any {
  switch (action.type) {
    case "SET_ENTRIES":
      return setEntries(state, action.entries);
    case "NEXT":
      return next(state);
    case "VOTE":
      if(!state.vote){
        return;
      }
      const newState = {...state};
      newState.vote = vote(state.vote, action.entry);
      return newState;
    default:
      return state;
  }
}
