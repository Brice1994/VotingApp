import { List, Map } from "immutable";
import { expect } from "chai";

import { next, setEntries, vote } from "../core";

describe("application logic", () => {
  describe("setEntries", () => {
    it("adds the entries to the state", () => {
      const state = Map();
      const entries = List.of("Trainspotting", "28 Days Later");
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(
        Map({
          entries: List.of("Trainspotting", "28 Days Later"),
        })
      );
    });
  });
  describe("next", () => {
    it("should take the next two entries under vote", () => {
      const state = Map({
        entries: List.of("Inception", "Borat", "Fight Club"),
      });
      const nextState = next(state);
      expect(nextState).to.equal(
        Map({
          vote: Map({
            pair: List.of("Inception", "Borat"),
          }),
          entries: List.of("Fight Club"),
        })
      );
    });
    it("puts winner of current vote back to entries", () => {
      const state = Map({
        vote: Map({
          pair: List.of("Trainspotting", "28 Days Later"),
          tally: Map({
            Trainspotting: 4,
            "28 Days Later": 2,
          }),
        }),
        entries: List.of("Sunshine", "Millions", "127 Hours"),
      });
      const nextState = next(state);
      expect(nextState).to.equal(
        Map({
          vote: Map({
            pair: List.of("Sunshine", "Millions"),
          }),
          entries: List.of("127 Hours", "Trainspotting"),
        })
      );
    });
    it("puts both from tied vote back to entries", () => {
      const state = Map({
        vote: Map({
          pair: List.of("Inception", "Borat"),
          tally: Map({
            Inception: 3,
            Borat: 3,
          }),
        }),
        entries: List.of("Cool Runnings", "21 Jumpstreet", "Avatar"),
      });
      const nextState = next(state);
      expect(nextState).to.equal(
        Map({
          vote: Map({
            pair: List.of("Cool Runnings", "21 Jumpstreet"),
          }),
          entries: List.of("Avatar", "Inception", "Borat"),
        })
      );
    });
    it("marks a winner when theres only 1 choice left", () => {
        const state = Map({
            vote: Map({
                pair: List.of("Inception", "Borat"),
                tally: Map({
                    Inception: "10",
                    Borat: "2"
                })
            }),
            entries: List()
        });
        const nextState = next(state);
        expect(nextState).to.be.equal(Map({
            winner: "Inception"
        }))
    });
  });
  describe("vote", () => {
    it("creates a tally for the voted entry", () => {
      const state = Map({
        pair: List.of('Trainspotting', '28 Days Later')
      });
      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.equal(Map({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          'Trainspotting': 1
        })
      }));
    });
  });
});
