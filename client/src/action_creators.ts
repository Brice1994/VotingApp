export function setState(state: any) {
    return {
      type: 'SET_STATE',
      state
    };
  }
  
  export function vote(entry: any) {
    return {
      meta: {remote: true},
      type: 'VOTE',
      entry
    };
  }

  export function next() {
    return {
      meta: {remote: true},
      type: "NEXT"
    }
  }