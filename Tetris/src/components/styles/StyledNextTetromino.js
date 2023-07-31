import styled from 'styled-components';

export const StyledNextTetromino = styled.div`
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1px;
    border: 2px solid #333;
    width: 80px;
    height: 80px;
    margin: auto;
    background: #111;
`;
