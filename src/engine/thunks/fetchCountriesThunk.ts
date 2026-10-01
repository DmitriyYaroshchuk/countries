import type {PayloadAction, ThunkAction} from "@reduxjs/toolkit";
import type {AppDispatch, RootState} from "../store/store.ts";
import type {TCountry, TV5Country, TV5Response} from "../../types/types.ts";
import {setCountries, setError, setLoading} from "../slices/countrySlice.ts";
import {allCountries, api, PAGE_LIMIT} from "../config.ts";
import adaptV5Country from "../adaptV5Country.ts";

export const fetchCountriesThunk = () : ThunkAction<void, RootState, undefined, PayloadAction<TCountry[]>> => {
    return async (dispatch : AppDispatch)=> {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const countries : TV5Country[] = [];
            let total = Infinity;

            while (countries.length < total) {
                const { data } = await api.get<TV5Response>(allCountries(countries.length));
                countries.push(...data.data.objects);
                total = data.data.meta.total;
                if (data.data.objects.length < PAGE_LIMIT) break;
            }

            dispatch(setCountries(countries.map(adaptV5Country)));
        } catch (error) {
            console.error('Error fetching countries data: ', error);
            dispatch(setError('Error fetching countries data'));
        } finally {
            dispatch(setLoading(false));
        }
    }
};
