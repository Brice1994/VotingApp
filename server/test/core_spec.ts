import { expect } from "chai";

import { next, setEntries, vote } from "../src/core";

describe("application logic", () => {
  describe("setEntries", () => {
    it("adds the entries to the state", () => {
      const state = {};
      const entries = new Set(["Trainspotting", "28 Days Later"]);
      const nextState = setEntries(state, entries);

      let next = { entries: new Set(["Trainspotting", "28 Days Later"]) };
      expect(nextState).to.deep.equal(next);
    });
  });
  describe("vote", () => {
    it("removes the voted entry from entries", () => {
      const state = {
        entries: new Set(["Jimmy Johns", "Macdonalds"])
      }
      const nextState = vote(state.entries, "Jimmy Johns");
      expect(nextState).to.deep.equal(new Set(["Macdonalds"]));
    });
  });
});
