import type {TCountry, TCountryFullData} from "../../types/types.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export type TCountriesState = {
    countries: TCountry[],
    filteredCountries: TCountry[],
    countryDetails: TCountryFullData | null,
    neighbours: string[],
    isLoading: boolean,
    error: string | null
}

const initialState : TCountriesState = {
    countries: [],
    filteredCountries: [],
    countryDetails: null,
    neighbours: [],
    isLoading: false,
    error: null
}

const countrySlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {
        setCountries: (state, action: PayloadAction<TCountry[]>) => {
            state.countries = action.payload;
            state.filteredCountries = action.payload;
        },
        setFilteredCountries: (state, action: PayloadAction<TCountry[]>) => {
            state.filteredCountries = action.payload;
        },
        setCountryDetails: (state, action: PayloadAction<TCountryFullData | null>) => {
            state.countryDetails = action.payload;
        },
        setNeighbours: (state, action: PayloadAction<string[]>) => {
            state.neighbours = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    }
});

export default countrySlice.reducer;
export const { setCountries, setFilteredCountries, setCountryDetails, setNeighbours, setLoading, setError } = countrySlice.actions;