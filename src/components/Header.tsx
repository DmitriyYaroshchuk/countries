import {type JSX, useEffect, useState} from "react";
import styled from "styled-components";
import {Container} from "./Container.tsx";
import {IoMoon, IoMoonOutline} from "react-icons/io5";
import {Link} from "react-router";
import {links} from "../engine/routers.ts";

const HeaderEl = styled.header`
    box-shadow: var(--shadow);
    background-color: var(--colors-ui-base);
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 0;
`;

const Title = styled(Link).attrs({
    to: '/',
})`
    font-size: var(--fs-sm);
    font-weight: var(--fw-bold);
    text-decoration: none;
    color: var(--colors-text);
`;

const ModeSwitcher = styled.div`
    color: var(--colors-text);
    font-size: var(--fs-sm);
    cursor: pointer;
    text-transform: capitalize;
`;


function Header(): JSX.Element {
    const [theme, setTheme] = useState<string>('light');
    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <HeaderEl>
            <Container>
                <Wrapper>
                    <Title to={links.homePage}>Where is the world ?</Title>
                    <ModeSwitcher onClick={toggleTheme}>
                        {
                            theme === 'light' ? (
                                <IoMoonOutline size='14px'/>
                                ) : (
                                <IoMoon size='14px'/>
                            )
                        }
                        <span style={{ marginLeft: '0.75rem' }}>
                            {theme} Theme
                        </span>
                    </ModeSwitcher>
                </Wrapper>
            </Container>
        </HeaderEl>
    )
}
export default Header;