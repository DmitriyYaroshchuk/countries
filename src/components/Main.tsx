import type {JSX} from "react";
import styled from "styled-components";
import {Container} from "./Container.tsx";
import type {TMainProps} from "../types/types.ts";

const Wrapper = styled.div`
    padding: 2rem 0;
    
    @media (min-width: 767px) {
        padding: 4rem 0;
    }
`

function Main({ children } : TMainProps) : JSX.Element {
    return (
        <Wrapper>
            <Container>{children}</Container>
        </Wrapper>
    )
}
export default Main;