import {type JSX} from "react";
import Header from "./components/Header.tsx";
import Main from "./components/Main.tsx";
import {Route, Routes} from "react-router";
import routers from "./engine/routers.ts";

function App(): JSX.Element {
    return (
        <>
            <Header/>
            <Main>
                <Routes>
                    {
                        routers.map((route) =>
                            <Route
                                key={route.path}
                                path={route.path}
                                element={route.element}
                            />
                        )
                    }
                </Routes>
            </Main>
        </>
    )
}

export default App;
