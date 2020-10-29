import makeStore from "./store";
import startServer from "./server";
const entries = ["Movie 1", "Movie 2", "Movie 3", "Movie 4", "Movie 5"]
console.log("Making server!");
export const store = makeStore();
startServer(store);

store.dispatch({
    type: "SET_ENTRIES",
    entries: entries
});

store.dispatch({type: "NEXT"});