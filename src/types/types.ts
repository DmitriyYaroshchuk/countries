import type {ReactNode} from "react";


export type TSearchProps = {
    search: string,
    setSearch: (search: string) => void,
}

export type TMainProps = {
    children: ReactNode;
}

export type TOption = {
    value: string;
    label: string;
};

export type TCustomSelectProps = {
    options: TOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export type TCardInfoItem = {
    title: string;
    description: string | number;
};

export type TCardProps = {
    img: string;
    name: string;
    info: TCardInfoItem[];
    onClick?: () => void;
};

export type TCountry = {
    flags: {
        png: string;
        svg: string;
        alt: string;
    };
    name: {
        common: string;
        official: string;
        nativeName: {
            [languageCode: string]: {
                official: string;
                common: string;
            };
        };
    };
    capital: string[];
    region: string;
    population: number;
};

export type TCurrency = {
    code: string;
    name: string;
    symbol: string;
}


export type TCountryFullData =  {
    cca3: string;
    name: {
        common: string;
        official: string;
        nativeName: {
            [key: string]: {
                common: string;
                official: string;
            };
        };
    };
    flags: {
        png: string;
        svg: string;
        alt: string;
    };
    capital: string[];
    population: number;
    region: string;
    subregion?: string;
    tld?: string[];
    currencies?: {
        [code: string]: TCurrency;
    };
    languages?: {
        [key: string]: string;
    };
    borders?: string[];
}

type TV5Names = {
    common: string;
    official: string;
    native?: {
        [languageCode: string]: {
            common: string;
            official: string;
        };
    };
};

export type TV5Country = {
    names: TV5Names;
    codes?: {
        alpha_3: string;
    };
    capitals?: { name: string }[];
    flag?: {
        url_png: string;
        url_svg: string;
        description: string;
    };
    population?: number;
    region?: string;
    subregion?: string;
    tlds?: string[];
    currencies?: TCurrency[];
    languages?: {
        iso639_3: string;
        name: string;
    }[];
    borders?: string[];
};

export type TV5Response = {
    data: {
        objects: TV5Country[];
        meta: {
            total: number;
        };
    };
};
