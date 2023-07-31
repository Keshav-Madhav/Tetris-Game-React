import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino } from '../tetrominos';
import { STAGE_WIDTH } from '../gameHelpers';

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromino: TETROMINOS[0].shape,
        collided: false,
    });

    const rotate= (matrix, dir)=>{
        const rotatedTetro = matrix.map((_, index) =>
            matrix.map(col =>( col[index] ))
        );
        if(dir > 0) return rotatedTetro.map(row => row.reverse());
        return rotatedTetro.reverse();
    };

    const playerRotate = ( stage, dir)=>{
        const clone = JSON.parse(JSON.stringify(player));
        clone.tetromino = rotate(clone.tetromino, dir);

        setPlayer(clone);
    }

    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer(prev => ({
        ...prev,
        pos: { x: (prev.pos.x += x), y: (prev.pos.y += y)},
        collided,
        }))
    }

    const resetPlayer = useCallback(() => {
        setPlayer({
        pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
        tetromino: randomTetromino().shape,
        collided: false,
        })
    }, [])

    return [player, updatePlayerPos, resetPlayer, playerRotate];
}