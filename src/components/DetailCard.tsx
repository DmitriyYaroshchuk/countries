import styled from "styled-components";
import {type JSX, useEffect} from "react";
import type {TCountryFullData} from "../types/types.ts";
import {useNavigate} from "react-router";
import transformCountryData from "../engine/transformCountryData.ts";
import {fetchNeighboursThunk} from "../engine/thunks/fetchNeighboursThunk.ts";
import {useAppDispatch, useAppSelector} from "../engine/store/store.ts";
import {setNeighbours} from "../engine/slices/countrySlice.ts";

const Wrapper = styled.section`
    margin-top: 3rem;
    width: 100%;
    display: grid;
    grid-template-columns: 100%;
    gap: 2rem;

    @media (min-width: 767px) {
        grid-template-columns: minmax(100px, 400px) 1fr;
        align-items: center;
        gap: 5rem;
    }
    @media (min-width: 1024px) {
        grid-template-columns: minmax(400px, 600px) 1fr;
    }
`;
const InfoImage = styled.img`
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
`;
const InfoTitle = styled.h1`
    margin: 0;
    font-weight: var(--fw-normal);
`;

const ListGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    @media (min-width: 1024px) {
        flex-direction: row;
        gap: 4rem;
    }

`;
const List = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;
const ListItem = styled.li`
    line-height: 1.8;

    & > b {
        font-weight: var(--fw-bold);
    }
`;
const Meta = styled.div`
    margin-top: 3rem;
    display: flex;
    gap: 1.5rem;
    flex-direction: column;
    align-items: flex-start;

    & > b {
        font-weight: var(--fw-bold);
    }

    @media (min-width: 767px) {
        flex-direction: row;
        align-items: center;
    }
`;
const TagGroup = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
`;
const Tag = styled.span`
    padding: .5rem 1rem;
    background-color: var(--colors-ui-base);
    box-shadow: var(--shadow);
    line-height: 1.5;
    cursor: pointer;
`;

function DetailCard(props: TCountryFullData): JSX.Element {

    const {
        name,
        nativeName,
        flag,
        capital,
        population,
        region,
        subregion,
        tld,
        currency,
        language,
        borders
    } = transformCountryData(props);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const neighbours = useAppSelector((state) => state.countryReducer.neighbours);
    const toCountry = (name: string) => navigate(`/country/${encodeURIComponent(name)}`)

    const hasBorders = borders.length > 0;

    useEffect(() => {
        if (hasBorders) {
            dispatch(fetchNeighboursThunk(props.cca3));
        } else {
            dispatch(setNeighbours([]));
        }
    }, [props.cca3, hasBorders, dispatch]);

    return (
        <Wrapper>
            {flag && (<InfoImage src={flag} alt={name}/>)}
            <div>
                <InfoTitle>{}</InfoTitle>
                <ListGroup>
                    <List>
                        <ListItem>
                            <b>Native name:</b> {nativeName || "-"}
                        </ListItem>
                        <ListItem>
                            <b>Population:</b>{population}
                        </ListItem>
                        <ListItem>
                            <b>Region:</b>{region}
                        </ListItem>
                        <ListItem>
                            <b>Sub Region:</b>{subregion}
                        </ListItem>
                        <ListItem>
                            <b>Capital:</b>{capital}
                        </ListItem>
                    </List>
                    <List>
                        <ListItem>
                            <b>Top Level Domain</b>{' '}
                            {
                                tld.map((domain) => (
                                    <span key={domain}>{domain}</span>
                                ))
                            }
                        </ListItem>
                        <ListItem>
                            <b>Currency</b>{' '}
                            {
                                currency && currency.length
                                    ? currency.map(
                                        (object) => `${object.name}${object.symbol ? ` (${object.symbol})` : ""}`
                                    ).join(",")
                                    : "—"
                            }
                        </ListItem>
                        <ListItem>
                            <b>Languages</b>{' '}
                            {
                                language && language.length ?
                                    language.join(', ') :
                                    "-"
                            }
                        </ListItem>
                        {
                            borders && borders.length > 0 && (
                                <ListItem>
                                    <b>Borders:</b> {borders.join(', ')}
                                </ListItem>
                            )
                        }
                    </List>
                </ListGroup>
                <Meta>
                    <b>Border Countries</b>
                    {
                        !neighbours.length ?
                            <span>There are no countries</span> :
                            <TagGroup>
                                {
                                    neighbours.map((neighbour) =>
                                        <Tag
                                            key={neighbour}
                                            onClick={() => toCountry(neighbour)}
                                        >
                                            {neighbour}
                                        </Tag>
                                    )
                                }
                            </TagGroup>
                    }
                </Meta>
            </div>
        </Wrapper>
    )
}

export default DetailCard;