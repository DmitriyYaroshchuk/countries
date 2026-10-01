import {configureStore} from "@reduxjs/toolkit";
import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import countrySlice from "../slices/countrySlice.ts";

export const store = configureStore({
    reducer: {
        countryReducer: countrySlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware(),
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;