export function setState(state: any) {
    return {
      type: 'SET_STATE',
      state
    };
  }
  
  export function vote(entry: any) {
    return {
      type: 'VOTE',
      entry
    };
  }