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
      const newState = {...state};
      newState.entries = vote(state.entries, action.entry);
      return newState;
    default:
      return state;
  }
}
