export const INITIAL_STATE: {entries?: string[], vote?: any, tally?: any} = {};

export function setEntries(state: {entries?: string[]}, entries: string[]): {} {
  let newState = {...state};
  newState.entries = entries;
  return newState;
}

function getWinners(vote?: any): string[] {
  if(!vote){
    // no winners
    return []; 
  }
  const pair = vote.pair;
  if(pair.length == 1){
    return [pair[0]];
  }
  let a = pair[0];
  let b = pair[1];
  if(!vote.tally){
    return [];
  }
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
  entries?: string[];
  vote?: {
    pair: ReadonlyArray<string>,
    tally: {[key:string]: number}
  }
}
export function next(state: CurrentState) {
  if(!state.entries){
    return state;
  }
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

export function vote(entries: Set<string>, entry: string){
  const newEntries = new Set(entries);
  newEntries.delete(entry);
  return newEntries;
}
// export function vote(voteState: {
//   pair: ReadonlyArray<string>;
//   tally?: {[key:string]: number}
// }, entry: string) {
//   let {pair, tally = {}} = voteState;
//   tally[entry] = tally[entry] ? tally[entry] + 1 : 1;
//   return {
//     pair,
//     tally
//   }
// }
