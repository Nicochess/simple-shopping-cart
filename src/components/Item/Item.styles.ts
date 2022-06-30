import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 1px solid lightblue;
    border-radius: 5px;

    img {
        max-height: 250px;
        width: 100%;
        object-fit: contain;
    }

    div {
        font-family: Arial, Helvetica, sans-serif;
        padding: 1rem;
        height: 100%;
    }

    button {
        margin: 0 0 10px;
    }
`   