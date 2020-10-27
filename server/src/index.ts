import makeStore from "./store";
import startServer from "./server";

console.log("Making server!");
export const store = makeStore();
startServer(store);

store.dispatch({
    type: "SET_ENTRIES",
    entries: require("./test.json")
});

store.dispatch({type: "NEXT"});