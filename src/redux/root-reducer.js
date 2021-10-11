import { combineReducers } from "redux";

import appDataReducer from "./reducers/app-data.reducer";
import suggestionsFilter from "./reducers/filters.reducer";
import sortByReducer from "./reducers/sortBy.reducer";


const rootReducer = combineReducers({
    appData: appDataReducer,
    suggestionsFilter: suggestionsFilter,
    sortByFilter: sortByReducer
})
export default rootReducer;