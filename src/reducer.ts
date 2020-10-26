import { setEntries, next, vote, INITIAL_STATE } from "./core";

interface Action {
  entries?: any;
  entry?: any;
  type: "SET_ENTRIES" |"NEXT" | "VOTE" | string;
}

export default function reducer(state = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case "SET_ENTRIES":
      return setEntries(state, action.entries);
    case "NEXT":
      return next(state);
    case "VOTE":
      return vote(state, action.entry);
    default:
      return state;
  }
}
