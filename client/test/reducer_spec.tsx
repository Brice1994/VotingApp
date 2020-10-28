import { Map, fromJS, List } from "immutable";
import reducer from "../src/reducer";
import { expect } from "chai";
import 'mocha';
describe("reducer", () => {
  it("handles SET_STATE", () => {
    const initialState = Map();
    const action = {
      type: "SET_STATE",
      state: Map({
        vote: Map({
          pair: List.of("Borat", "Inception"),
          tally: Map({ Inception: 1 }),
        }),
      }),
    };
    const nextState = reducer(initialState, action);
    expect(JSON.stringify(nextState)).to.equal(JSON.stringify(fromJS({
      vote: {
        pair: ["Borat", "Inception"],
        tally: { Inception: 1 },
      },
    }))
    );
  });
  it("handles SET_STATE with plain JS payload", () => {
    // const initialState = Map();
    // const action = {
    //   type: "SET_STATE",
    //   state: {
    //     vote: {
    //       pair: ["Borat", "Inception"],
    //       tally: {Borat: 1}
    //     }
    //   }
    // }
    // const nextState = reducer(initialState, action);
    // expect(nextState).to.equal(fromJS({
    //   vote: {
    //     pair: ["Borat", "Inception"],
    //     tally: {Borat: 1}
    //   }
    // }))
  });
  it("handles SET_STATE without initial state", () => {
    // const action = {
    //   type: 'SET_STATE',
    //   state: {
    //     vote: {
    //       pair: ['Trainspotting', '28 Days Later'],
    //       tally: {Trainspotting: 1}
    //     }
    //   }
    // };
    // const nextState = reducer(undefined, action);
    // expect(nextState).to.equal(fromJS({
    //   vote: {
    //     pair: ['Trainspotting', '28 Days Later'],
    //     tally: {Trainspotting: 1}
    //   }
    // }));
  });
});
