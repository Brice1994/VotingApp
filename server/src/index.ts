const makeStore = require("./store");
const startServer = require("./server");

console.log("Making server!");
export const store = makeStore();
startServer(store);

store.dispatch({
    type: "SET_ENTRIES",
    entries: require("./tet.json")
});

store.dispatch({type: "NEXT"});