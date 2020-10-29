export const INITIAL_STATE: {entries?: Set<string>} = {entries:new Set()};

export function setEntries(state: {entries?: Set<string>}, entries: Set<string>): {} {
  let newState = {...state};
  newState.entries = entries;
  return newState;
}

interface CurrentState {
  entries?: Set<string>;
  vote?: {
    pair: ReadonlyArray<string>,
    tally: {[key:string]: number}
  }
}
export function next(state: CurrentState) {
  if(!state.entries){
    return state;
  }
  if(state.entries.size > 1){
    return state;
  }else {
    return {
      winner: Array.from(state.entries)[0]
    }
  }
}

export function vote(entries?: Set<string>, entry: string = ""){
  const newEntries = new Set(entries);
  newEntries.delete(entry);
  return newEntries;
}
