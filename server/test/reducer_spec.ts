import { expect } from "chai";

import reducer from "../src/reducer";
describe("reducer", () => {
  it("handles SET_ENTRIES", () => {
    const initialState = undefined;
    const action = { type: "SET_ENTRIES", entries: ["Trainspotting"] };
    const nextState = reducer(initialState, action);
    expect(nextState).to.have.key("entries");
    expect(nextState.entries).to.deep.equal(["Trainspotting"]);
  });
  it("handles NEXT", () => {
    const initialState = {
      entries: ["Trainspotting", "28 Days Later"],
    };
    const action = { type: "NEXT" };
    const nextState = reducer(initialState, action);
    expect(nextState).to.deep.equal({
      vote: {
        pair: ["Trainspotting", "28 Days Later"],
      },
      entries: [],
    });
  });
  it("handles VOTE", () => {
    const initialState = {
      vote: {
        pair: ["Trainspotting", "28 Days Later"],
      },
      entries: [],
    };
    const action = { type: "VOTE", entry: "Trainspotting" };
    const nextState = reducer(initialState, action);

    expect(nextState).to.deep.equal({
      vote: {
        pair: ["Trainspotting", "28 Days Later"],
        tally: { Trainspotting: 1 },
      },
      entries: [],
    });
  });
  it("has an initial state", () => {
    const action = { type: "SET_ENTRIES", entries: ["Trainspotting"] };
    const nextState = reducer(undefined, action);
    expect(nextState).to.deep.equal({
      entries: ["Trainspotting"],
    });
  });

  it("can be used with reduce", () => {
    const actions = [
      {
        type: "SET_ENTRIES",
        entries: ["Trainspotting", "28 Days Later"],
      },
      { type: "NEXT" },
      { type: "VOTE", entry: "Trainspotting" },
      { type: "VOTE", entry: "28 Days Later" },
      { type: "VOTE", entry: "Trainspotting" },
      { type: "NEXT" },
    ];
    const finalState = actions.reduce(reducer, {});
    expect(finalState).to.deep.equal({
      winner: "Trainspotting",
    });
  });
});
