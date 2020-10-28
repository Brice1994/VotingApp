import { expect } from "chai";

import { next, vote } from "../src/core";

export function setEntries(
  state: Map<string, any>,
  listEntries: any
): Map<string, any> {
  let newState = new Map(state);
  newState.set("listEntries", listEntries);
  return newState;
}

describe("application logic", () => {
  describe("setEntries", () => {
    it("adds the entries to the state", () => {
      const state = new Map();
      const entries = ["Trainspotting", "28 Days Later"];
      const nextState = setEntries(state, entries);

      let curr = Object.fromEntries(nextState);
      let next = { listEntries: ["Trainspotting", "28 Days Later"] };
      expect(curr).to.deep.equal(next);
    });
  });
  describe("next", () => {
    it("should take the next two entries under vote", () => {
      const state = { entries: ["Inception", "Borat", "Fight Club"] };
      const nextState = next(state);
      expect(nextState).to.deep.equal({
        vote: {
          pair: ["Inception", "Borat"],
        },
        entries: ["Fight Club"],
      });
    });
    it("puts winner of current vote back to entries", () => {
      const state = {
        vote: {
          pair: ["Trainspotting", "28 Days Later"],
          tally: {
            Trainspotting: 4,
            "28 Days Later": 2,
          },
        },
        entries: ["Sunshine", "Millions", "127 Hours"],
      };
      const nextState = next(state);
      expect(nextState).to.deep.equal({
        vote: {
          pair: ["Sunshine", "Millions"],
        },
        entries: ["127 Hours", "Trainspotting"],
      });
    });
    it("puts both from tied vote back to entries", () => {
      const state = {
        vote: {
          pair: ["Inception", "Borat"],
          tally: { Inception: 3, Borat: 3 },
        },
        entries: ["Cool Runnings", "21 Jumpstreet", "Avatar"],
      };
      const nextState = next(state);
      expect(nextState).to.deep.equal({
        vote: {
          pair: ["Cool Runnings", "21 Jumpstreet"],
        },  
        entries: ["Avatar", "Inception", "Borat"]
      });
    });
    it("marks a winner when theres only 1 choice left", () => {
      const state = {
        vote: {
          pair: ["Inception", "Borat"],
          tally: {
            Inception: 10,
            Borat: 2,
          },
        },
        entries: [],
      };
      const nextState = next(state);
      expect(nextState).to.deep.equal({ winner: "Inception" });
    });
  });
  describe("vote", () => {
    it("creates a tally for the voted entry", () => {
      const state = {
        pair: ["Trainspotting", "28 Days Later"],
      };
      const nextState = vote(state, "Trainspotting");
      expect(nextState).to.deep.equal(
        {
          pair: ["Trainspotting", "28 Days Later"],
          tally: {Trainspotting: 1}
        }
      );
    });
  });
});
