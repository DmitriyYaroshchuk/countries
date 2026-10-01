import {type JSX, useEffect} from "react";
import {Navigate, useNavigate, useParams} from "react-router";
import {links} from "../engine/routers.ts";
import {IoArrowBack} from "react-icons/io5";
import {Button} from "../components/Button.tsx";
import DetailCard from "../components/DetailCard.tsx";
import Loader from "../components/Loader.tsx";
import {useAppDispatch, useAppSelector} from "../engine/store/store.ts";
import {fetchCountryDetailsThunk} from "../engine/thunks/fetchCountryDetailsThunk.ts";

function Details(): JSX.Element {
    const { name } = useParams<{ name?: string }>();
    const countryName = name ? decodeURIComponent(name) : '';
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { countryDetails: country, isLoading, error } = useAppSelector(state => state.countryReducer);


    useEffect(() => {
        if (countryName) {
            dispatch(fetchCountryDetailsThunk(countryName));
        }
    }, [countryName, dispatch]);

    if (!countryName) return <Navigate to={links.notFound} replace/>;
    if (isLoading) return <Loader/>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <Button onClick={() => navigate(-1)}>
                <IoArrowBack/>
                Back
            </Button>
            {country && (<DetailCard {...country}/>)}
        </div>
    )
}

export default Details;