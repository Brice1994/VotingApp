export const INITIAL_STATE: ReadonlyMap<string,any> = new Map();

export function setEntries(state: Map<string, any>, listEntries: any): Map<string, any> {
  let newState = new Map(state);
  newState.set("listEntries", listEntries);
  return newState;
}

interface Vote {
  pair: ReadonlyArray<string>;
  tally: {[key:string]: number}
}
function getWinners(vote?: Vote): string[] {
  if(!vote){
    // no winners
    return []; 
  }
  const pair = vote.pair;
  let a = pair[0];
  let b = pair[1];
  const aVotes = vote.tally[a];
  const bVotes = vote.tally[b];
  if (aVotes > bVotes) {
    return [a];
  }
  if (aVotes < bVotes) {
    return [a];
  }
  return [a, b];
}
interface CurrentState {
  entries: string[];
  vote?: {
    pair: string[],
    tally: {[key:string]: number}
  }
}
export function next(state: CurrentState) {
  const winners = getWinners(state.vote);
  const entries = state.entries.concat(winners);
  if (entries.length === 1) {
    return {
      winner: entries[0]
    }
  } else {
    return {
      vote: {pair: entries.slice(0,2)},
      entries: entries.slice(2)
    }
  }
}
export function vote(voteState: {pair: string[], tally?: {[key:string]: number}}, entry: string) {
  let {pair, tally = {}} = voteState;
  tally[entry] = tally[entry] ? tally[entry] + 1 : 1;
  return {
    pair,
    tally
  }
}
