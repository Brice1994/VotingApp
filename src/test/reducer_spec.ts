import { Map, fromJS, List } from "immutable";
import chai from "chai";
import { expect } from "chai";
const chaiImmutable = require("chai-immutable");
import { is } from "immutable";

chai.use(chaiImmutable);

import reducer from "../reducer";
describe("reducer", () => {
  it("handles SET_ENTRIES", () => {
    const initialState = Map();
    const action = { type: "SET_ENTRIES", entries: List.of("Trainspotting") };
    const nextState = reducer(initialState, action);
    expect(nextState).to.have.key("entries");
    expect(nextState.get("entries")).to.equal(fromJS(["Trainspotting"]));
  });
  it("handles NEXT", () => {
    const initialState = fromJS({
      entries: ["Trainspotting", "28 Days Later"],
    });
    const action = { type: "NEXT" };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(
      fromJS({
        vote: {
          pair: ["Trainspotting", "28 Days Later"],
        },
        entries: [],
      })
    );
  });
  it("handles VOTE", () => {
    const initialState = fromJS({
      vote: {
        pair: ["Inception", "28 Days Later"],
      },
      entries: [],
    });
    const action = { type: "VOTE", entry: "Inception" };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(
      fromJS({
        vote: {
          pair: ["Inception", "28 Days Later"],
          tally: { Inception: 1 },
        },
        entries: [],
      })
    );
  });
  it("has an initial state", () => {
    const action = { type: "SET_ENTRIES", entries: List.of("Trainspotting") };
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(
      fromJS({
        entries: ["Trainspotting"],
      })
    );
  });
  it("can be used with reduce", () => {
    const actions = [
      { type: "SET_ENTRIES", entries: ["Trainspotting", "28 Days Later"] },
      { type: "NEXT" },
      { type: "VOTE", entry: "Trainspotting" },
      { type: "VOTE", entry: "28 Days Later" },
      { type: "VOTE", entry: "Trainspotting" },
      { type: "NEXT" },
    ];
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(
      fromJS({
        winner: "Trainspotting",
      })
    );
  });
});
