import HomePage from "../pages/HomePage.tsx";
import  {type ComponentType} from "react";
import Details from "../pages/Details.tsx";
import NotFound from "../pages/NotFound.tsx";
import * as React from "react";

export const links  = {
    'homePage': '/',
    'details': '/country/:name',
    'notFound': '/404',
    'allPaths': '*'
} as const;

const components: Record<keyof typeof links, ComponentType> = {
    homePage: HomePage,
    details: Details,
    notFound: NotFound,
    allPaths: NotFound
};

export default Object.entries(links).map(([key, path]) => {
    const Component = components[key as keyof typeof links];
    return {
        path,
        element: React.createElement(Component),
    };
});
