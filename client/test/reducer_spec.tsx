import { Map, fromJS, List } from "immutable";
import reducer from "../src/reducer";
import { expect } from "chai";
describe("reducer", () => {
    it("handles SET_STATE with plain JS payload", () => {
        const initialState = Map();
        const action = {
          type: "SET_STATE",
          state: {
            vote: {
              pair: ["Borat", "Inception"],
              tally: {Borat: 1}
            }
          }
        }
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
          vote: {
            pair: ["Borat", "Inception"],
            tally: {Borat: 1}
          }
        }))
      });
      it('handles SET_STATE without initial state', () => {
        const action = {
          type: 'SET_STATE',
          state: {
            vote: {
              pair: ['Trainspotting', '28 Days Later'],
              tally: {Trainspotting: 1}
            }
          }
        };
        const nextState = reducer(undefined, action);
      
        expect(nextState).to.equal(fromJS({
          vote: {
            pair: ['Trainspotting', '28 Days Later'],
            tally: {Trainspotting: 1}
          }
        }));
      });
})