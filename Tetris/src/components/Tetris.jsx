import React, {useState} from 'react';
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';
import { checkCollision, createStage } from '../gameHelpers';

import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';


function Tetris() {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer);

    console.log('re-render');

    const movePlayer = dir =>{
        if(!checkCollision(player, stage, {x: dir, y:0})){
            updatePlayerPos({x: dir, y: 0})
        }
    }

    const startGame = ()=>{
        setDropTime(1000);
        setStage(createStage());
        resetPlayer();
        setGameOver(false);
    }

    const drop = ()=>{
        if(!checkCollision(player, stage, {x: 0 , y: 1})){
            updatePlayerPos({x: 0, y: 1, collided: false});
        }
        else{
            if(player.pos.y < 1){
                console.log("Gameover");
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({x: 0,  y: 0, collided: true});
        }
    }

    const keyup =({keyCode}) =>{
        if(!gameOver){
            if(keyCode === 40 || keyCode === 83){
                setDropTime(1000);
            }
        }
    }

    const dropPlayer = ()=>{
        setDropTime(null);
        drop();
    }

    const move = ({keyCode})=>{
        if(!gameOver){
            if(keyCode === 37 || keyCode === 65){ //left arr or a to move left
                movePlayer(-1); 
            } 
            else if(keyCode === 39 || keyCode === 68){ //right arr or d to move right
                movePlayer(1);
            }
            else if(keyCode === 40 || keyCode === 83){ //down arr or d to drop
                dropPlayer();
            }
            else if(keyCode === 78 || keyCode === 81){ // n or q to rotate to anti clock rotate
                playerRotate(stage, 1);
            }
            else if(keyCode === 77 || keyCode === 69){ // m or e to rotate to clock rotate
                playerRotate(stage, -1);
            }
        }
    }

    useInterval(()=>{
        drop();
    }, dropTime);

    return (
        <StyledTetrisWrapper role="button" tabIndex ="0" onKeyDown={e=>move(e)} onKeyUp={keyup}>
            <StyledTetris>
                <Stage stage={stage}/>
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text="Game OVer"/>
                    ) : (
                        <div>
                            <Display text="Score"/>
                            <Display text="Rows"/>
                            <Display text="Level"/>
                        </div>
                    )}
                    
                    <StartButton callBack={startGame}/>
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris;