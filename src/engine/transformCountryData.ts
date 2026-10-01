import type {TCountryFullData} from "../types/types.ts";

function transformCountryData(country: TCountryFullData) {
    const {
        name,
        flags,
        capital,
        population,
        region,
        subregion,
        tld,
        currencies,
        languages,
        borders,
    } = country;

    const officialName = name?.official ?? name?.common ?? "";
    const nativeName =
        name?.nativeName
            ? (() => {
                const object = Object.values(name.nativeName)[0];
                return object?.official || object?.common || officialName;
            })()
            : officialName;
    const flagUrl = flags?.svg ?? flags?.png ?? "";
    const capitalName = Array.isArray(capital) ? capital.join(", ") : (capital ?? "-");
    const toplevelDomain = Array.isArray(tld) ? tld : [];
    const populationName = population ?? 0;
    const regionName = region ?? "-";
    const subregionName = subregion ?? "-";

    const currencyList =
        currencies ?
            Object.entries(currencies).map(([code, currency]) => ({
                code,
                name: currency?.name ?? code,
                symbol: currency?.symbol ?? ""
            })) : [];
    const languageList = languages ? Object.values(languages) : [];
    const bordersList = borders ? borders : [];

    return {
        name: officialName,
        nativeName,
        flag: flagUrl,
        capital: capitalName,
        population: populationName,
        region: regionName,
        subregion: subregionName,
        tld: toplevelDomain,
        currency: currencyList,
        language: languageList,
        borders: bordersList,
    }
}
export default transformCountryData;