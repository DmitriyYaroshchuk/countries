import {type JSX, useEffect, useState} from "react";
import styled from "styled-components";
import Controls from "../components/Controls.tsx";
import List from "../components/List.tsx";
import Card from "../components/Card.tsx";
import Loader from "../components/Loader.tsx";
import {Button} from "../components/Button.tsx";
import {useNavigate} from "react-router";
import {useAppDispatch, useAppSelector} from "../engine/store/store.ts";
import {fetchCountriesThunk} from "../engine/thunks/fetchCountriesThunk.ts";

const PAGE_SIZE : number = 12;

const LoadMore = styled(Button)`
    margin: 0 auto 3rem;
    padding: 0 2rem;
    font-family: var(--family);
    font-size: var(--fs-md);
    font-weight: var(--fw-normal);
`;

function HomePage() : JSX.Element {
    const dispatch = useAppDispatch();
    const countries = useAppSelector((state) => state.countryReducer.countries);
    const { filteredCountries, isLoading, error } = useAppSelector((state) => state.countryReducer);

    const navigate= useNavigate();
    const toCountry = (name : string) => navigate(`/country/${encodeURIComponent(name)}`)

    const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
    const [prevFiltered, setPrevFiltered] = useState(filteredCountries);

    // Search or region changed: start again from the first page
    if (prevFiltered !== filteredCountries) {
        setPrevFiltered(filteredCountries);
        setVisibleCount(PAGE_SIZE);
    }

    const visibleCountries = filteredCountries.slice(0, visibleCount);
    const hasMore = visibleCount < filteredCountries.length;

    useEffect(() => {
        if(!countries.length && !isLoading && !error) {
            dispatch(fetchCountriesThunk())
        }
    },[countries, isLoading, error, dispatch]);

    return (
        <>
            <Controls/>
            {isLoading && <Loader/>}
            {error && <div>{error}</div>}
            <List>
                {
                    visibleCountries.map((country) => (
                        <Card
                            key={country.name.official}
                            onClick={() => toCountry(country.name.official)}
                            name={country.name.official}
                            info={[
                                {title: 'Population', description: country.population},
                                {title: 'Region', description: country.region},
                                {title: 'Capital', description: country.capital[0]}
                            ]}
                            img={country.flags.png}
                        />
                    ))
                }
            </List>
            {hasMore && (
                <LoadMore onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
                    Load more ({filteredCountries.length - visibleCount} left)
                </LoadMore>
            )}
        </>
    )
}
export default HomePage;