import { GameStatusType } from './../types/appTypes';
import { useState } from 'react';

interface GameControllerType{
  gameStatus:GameStatusType,
  points:number,
  incrementPoints:(val:number) => void
  startGame:() => void,
  looseGame:() => void,
  resetGame:() => void,
  winGame:() => void,
}
export const useGameController = ():GameControllerType => {
  const [gameStatus,setGameStatus] = useState<GameStatusType>(GameStatusType.default)
  const [points,setPoints] = useState<number>(0)

  const incrementPoints = (val = 1) => {
    setPoints(it => it + val)
  }
  
  const startGame = () => {
    setGameStatus(GameStatusType.game)
    
  }

  const looseGame = () => {
    setGameStatus(GameStatusType.loose)
  } 
  
  const resetGame = () => {
    setGameStatus(GameStatusType.default)
    setPoints(0)
  }
  const winGame = () => {
    setGameStatus(GameStatusType.win)
  }
  return {gameStatus,points,incrementPoints,startGame,looseGame,resetGame,winGame}
}