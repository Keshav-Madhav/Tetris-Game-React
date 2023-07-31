import React from 'react';
import { StyledNextTetromino } from './styles/StyledNextTetromino';
import Cell from './Cell';

function NextTetromino({ nextTetromino }) {
    const grid = Array.from(Array(4), () => new Array(4).fill(0));
    nextTetromino.forEach((row, y) =>
        row.forEach((value, x) => {
            if (value !== 0) {
                grid[y][x] = value;
            }
        })
    );

    return (
        <StyledNextTetromino>
            {grid.map(row => row.map((cell, x) => <Cell key={x} type={cell} />))}
        </StyledNextTetromino>
    );
}

export default NextTetromino;
