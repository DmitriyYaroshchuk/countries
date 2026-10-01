import axios from "axios";

const BASE_URL : string = 'https://api.restcountries.com/countries/v5' as const;
// Free plan returns at most 100 objects per request
export const PAGE_LIMIT : number = 100;

const LIST_FIELDS : string = 'names.common,names.official,codes.alpha_3,capitals,flag.url_png,flag.url_svg,flag.description,population,region';

export const api = axios.create({
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_RESTCOUNTRIES_API_KEY}`
    }
});

export const allCountries = (offset : number) : string => `${BASE_URL}?limit=${PAGE_LIMIT}&offset=${offset}&response_fields=${LIST_FIELDS}`;
export const searchByCountry = (name : string) : string => BASE_URL + '/names.official/' + encodeURIComponent(name);
export const neighboursByCode = (code : string) : string => BASE_URL + '/borders/' + code + '?response_fields=names.common,names.official';
