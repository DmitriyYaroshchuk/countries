import styled, {keyframes} from "styled-components";
import type {JSX} from "react";

const spin = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

const Wrapper = styled.div`
    width: 100%;
    padding: 6rem 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
`;

const Spinner = styled.span`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 4px solid var(--colors-ui-base);
    border-top-color: var(--colors-text);
    box-shadow: var(--shadow);
    animation: ${spin} 0.8s linear infinite;

    @media (prefers-reduced-motion: reduce) {
        animation-duration: 2.4s;
    }
`;

const Text = styled.span`
    font-size: var(--fs-md);
    font-weight: var(--fw-normal);
    letter-spacing: 0.02em;
`;

function Loader({ text = 'Loading...' } : { text?: string }) : JSX.Element {
    return (
        <Wrapper role="status" aria-live="polite">
            <Spinner aria-hidden="true"/>
            <Text>{text}</Text>
        </Wrapper>
    )
}
export default Loader;
