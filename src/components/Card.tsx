import styled from "styled-components";
import type {JSX} from "react";
import type {TCardProps} from "../types/types.ts";

const Wrapper = styled.article`
    border-radius: var(--radii);
    background-color: var(--colors-ui-base);
    box-shadow: var(--shadow);
    cursor: pointer;
    overflow: hidden;
`;
const CardImage = styled.img`
    max-width: 100%;
    width: 100%;
    height: 150px;
    object-fit: cover;
    object-position: center;
    box-shadow: var(--shadow);
`;
const CardBody = styled.div`
    padding: 1rem 1.5rem 2rem;
    
`;
const CardTitle = styled.h3`
    margin: 0;
    font-size: var(--fs-md);
`;
const CardList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 1rem 0 0;
`;
const CardListItem = styled.li`
    font-size: var(--fs-sm);
    line-height: 1.5;
    font-weight: var(--fw-light);
    
    & > b {
        font-weight: var(--fw-bold);
    }
`;

function Card({ img, name, info, onClick } : TCardProps) : JSX.Element {
    return (
        <Wrapper onClick={onClick}>
            {img && <CardImage src={img} alt={name}/>}
            <CardBody>
                <CardTitle>{name}</CardTitle>
                <CardList>
                    {
                        info.map((element) => (
                            <CardListItem key={element.title}>
                                <b>{element.title}:</b>
                                {element.description}
                            </CardListItem>
                        ))
                    }
                </CardList>
            </CardBody>
        </Wrapper>
    )
}
export default Card;