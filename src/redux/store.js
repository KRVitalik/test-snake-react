import { configureStore } from "@reduxjs/toolkit";
import { createAction, createReducer } from "@reduxjs/toolkit";

export const plyer = createAction('plyer/current');

const myReducer = createReducer({}, {
    [plyer]: (state, action) => state = action.payload,
});

export const store = configureStore({
    reducer: {
        myPlyer: myReducer,
    },
})