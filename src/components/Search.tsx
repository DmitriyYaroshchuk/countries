import type {JSX} from "react";
import {IoSearch} from "react-icons/io5";
import styled from "styled-components";
import type {TSearchProps} from "../types/types.ts";

const InputContainer = styled.div`
    background-color: var(--colors-ui-base);
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    
    border-radius: var(--radii);
    box-shadow: var(--shadow);
    width: 100%;
    margin-bottom: 1rem;
    
    @media (min-width: 767px) {
        margin-bottom: 0;
        max-width: 310px;
        width: 100%;
    }
` ;

const Input = styled.input.attrs({
    type: 'search',
    placeholder: 'Search for a country...',
})`
    margin-left: 2rem;
    border: none;
    outline: none;
    color: var(--colors-text);
    background-color: var(--colors-ui-base);
`;


function Search({ search, setSearch } : TSearchProps) :JSX.Element {
    return  (
        <InputContainer>
            <IoSearch size={20}/>
            <Input value={search} onChange={(event) => setSearch(event.target.value)}/>
        </InputContainer>
    )
}
export default Search;