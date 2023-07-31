import React from 'react';
import { StyledCell } from './styles/StyledCell';
import { TETROMINOS } from '../tetrominos';

function Cell({type}) {
    return (
        <StyledCell type= {type} color= {TETROMINOS[type].color}/>
    );
};

export default React.memo(Cell);