import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { movieReducer } from "./reducers/movieReducer";
import { listReducer } from "./reducers/listReducer";

const rootReducer = combineReducers({
    movieReducer,
    listReducer,
});


export default createStore(rootReducer, applyMiddleware(thunk));