import {type JSX, useEffect, useState} from "react";
import Search from "./Search.tsx";
import type {TOption} from "../types/types.ts";
import CustomSelect from "./CustomSelect.tsx";
import styled from "styled-components";
import {setFilteredCountries} from "../engine/slices/countrySlice.ts";
import {useAppDispatch, useAppSelector} from "../engine/store/store.ts";


const options: TOption[] = [
    { value: 'Africa', label: 'Africa' },
    { value: 'America', label: 'America' },
    { value: 'Asia', label: 'Asia' },
    { value: 'Europe', label: 'Europe' },
    { value: 'Oceania', label: 'Oceania' }
];

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    
    @media (min-width: 767px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
`

function Controls() : JSX.Element {
    const dispatch = useAppDispatch();
    const countries = useAppSelector((state) => state.countryReducer.countries);

    const [search, setSearch] = useState<string>('');
    const [region, setRegion] = useState<string>('');

    useEffect(() => {
        let data = [...countries];

        if (region) {
            data = data.filter((c) => c.region.includes(region));
        }

        if (search) {
            data = data.filter((c) => c.name.official.toLowerCase().includes(search.toLowerCase()));
        }

        dispatch(setFilteredCountries(data));
    }, [countries, search, region, dispatch]);
    return (
        <Wrapper>
            <Search search={search} setSearch={setSearch}/>
            <CustomSelect options={options} value={region} onChange={setRegion} placeholder="Filter by Region"/>
        </Wrapper>
    )
}
export default Controls;