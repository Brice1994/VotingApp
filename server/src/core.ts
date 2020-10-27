import { fromJS, List, Map } from "immutable";

export const INITIAL_STATE = Map();
export function setEntries(state: Map<any, any>, entries: any) {
  return state.set("entries", fromJS(entries));
}

function getWinners(vote?: Map<string, any>) {
  if (!vote) {
    return [];
  }
  const pair = vote.get("pair");
  let a = pair.get(0);
  let b = pair.get(1);
  const aVotes = vote.getIn(["tally", a]);
  const bVotes = vote.getIn(["tally", b]);
  if (aVotes > bVotes) {
    return [a];
  }
  if (aVotes < bVotes) {
    return [a];
  }
  return [a, b];
}
export function next(state: Map<any, any>) {
  const entries = state.get("entries").concat(getWinners(state.get("vote")));
  if (entries.size === 1) {
    return state
      .remove("vote")
      .remove("entries")
      .set("winner", entries.first());
  } else {
    return state.merge({
      vote: Map({ pair: entries.take(2) }),
      entries: entries.skip(2),
    });
  }
}

export function vote(voteState: any, entry: any) {
  return voteState.updateIn(
    ["tally", entry],
    0,
    (tally: any) => tally + 1
  );
}
