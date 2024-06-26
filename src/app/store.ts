import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userSlice from "./features/userSlice.ts";


const rootReducer = combineReducers({
    user : userSlice
});

export const store = configureStore({
    reducer : rootReducer,
    devTools : true
})
