import type {PayloadAction, ThunkAction} from "@reduxjs/toolkit";
import type {AppDispatch, RootState} from "../store/store.ts";
import {api, neighboursByCode} from "../config.ts";
import type {TV5Response} from "../../types/types.ts";
import {setNeighbours} from "../slices/countrySlice.ts";

// Does not toggle the global isLoading: Details would unmount DetailCard and trigger this fetch again
export const fetchNeighboursThunk = (code: string) : ThunkAction<void, RootState, undefined, PayloadAction<string[]>> => {
    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await api.get<TV5Response>(neighboursByCode(code));
            const neighbours = data.data.objects.map((country) => country.names?.official ?? country.names?.common ?? '');
            dispatch(setNeighbours(neighbours));
        } catch (error) {
            console.error('Error fetching neighbours data: ', error);
            dispatch(setNeighbours([]));
        }
    }
};
