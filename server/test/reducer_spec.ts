import { expect } from "chai";

import reducer from "../src/reducer";
describe("reducer", () => {
  it("handles SET_ENTRIES", () => {
    const initialState = undefined;
    const action = { type: "SET_ENTRIES", entries: new Set(["Trainspotting"]) };
    const nextState = reducer(initialState, action);
    expect(nextState).to.have.key("entries");
    expect(nextState.entries).to.deep.equal(new Set(["Trainspotting"]));
  });
  it("has an initial state", () => {
    const action = { type: "SET_ENTRIES", entries: new Set(["Trainspotting"]) };
    const nextState = reducer(undefined, action);
    expect(nextState).to.deep.equal({
      entries: new Set(["Trainspotting"]),
    });
  });

  it("can be used with reduce", () => {
    const actions = [
      {
        type: "SET_ENTRIES",
        entries: new Set(["Movie A", "Movie B", "Movie C"]),
      },
      { type: "NEXT" },
      { type: "VOTE", entry: "Movie A" },
      { type: "VOTE", entry: "Movie B" },
      { type: "NEXT" },
    ];
    const finalState = actions.reduce(reducer, {});
    expect(finalState).to.deep.equal({
      winner: "Movie C",
    });
  });
});
