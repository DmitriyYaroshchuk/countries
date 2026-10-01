import type {TCountryFullData, TCurrency, TV5Country} from "../types/types.ts";

// Maps a REST Countries v5 object onto the legacy (v3.1) shape the app works with
function adaptV5Country(country: TV5Country): TCountryFullData {
    const {names, codes, capitals, flag, population, region, subregion, tlds, currencies, languages, borders} = country;

    return {
        cca3: codes?.alpha_3 ?? '',
        name: {
            common: names?.common ?? '',
            official: names?.official ?? names?.common ?? '',
            nativeName: names?.native ?? {},
        },
        flags: {
            png: flag?.url_png ?? '',
            svg: flag?.url_svg ?? '',
            alt: flag?.description ?? '',
        },
        capital: capitals?.map((capital) => capital.name) ?? [],
        population: population ?? 0,
        region: region ?? '',
        subregion,
        tld: tlds,
        currencies: currencies?.reduce<Record<string, TCurrency>>((acc, currency) => {
            acc[currency.code] = currency;
            return acc;
        }, {}),
        languages: languages?.reduce<Record<string, string>>((acc, language) => {
            acc[language.iso639_3] = language.name;
            return acc;
        }, {}),
        borders,
    };
}

export default adaptV5Country;
