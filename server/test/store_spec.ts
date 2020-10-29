import {expect} from "chai";

import makeStore from "../src/store";


describe("store", () => {
    it("is a store configured with the correct reducer", () => {
        const store = makeStore();
        expect(store.getState()).to.deep.equal({entries: new Set()});

        store.dispatch({
            type: "SET_ENTRIES",
            entries: new Set(["Borat", "Inception"])
        });
        expect(store.getState()).to.deep.equal({
            entries: new Set(["Borat", "Inception"])
        })
    })
})