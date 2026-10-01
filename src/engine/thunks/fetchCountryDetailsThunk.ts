import type {PayloadAction, ThunkAction} from "@reduxjs/toolkit";
import type {TCountryFullData, TV5Response} from "../../types/types.ts";
import type {AppDispatch, RootState} from "../store/store.ts";
import {setCountryDetails, setError, setLoading} from "../slices/countrySlice.ts";
import {api, searchByCountry} from "../config.ts";
import adaptV5Country from "../adaptV5Country.ts";

export const fetchCountryDetailsThunk = (countryName : string) : ThunkAction<void, RootState, undefined, PayloadAction<TCountryFullData | null>> => {
    return async (dispatch: AppDispatch)=> {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const { data } = await api.get<TV5Response>(searchByCountry(countryName));
            const country = data.data.objects[0];
            dispatch(setCountryDetails(country ? adaptV5Country(country) : null));
        } catch (error) {
            console.error('Error fetching country data: ', error);
            dispatch(setError('Error fetching country data'));
            dispatch(setCountryDetails(null));
        } finally {
            dispatch(setLoading(false));
        }
    }
};
