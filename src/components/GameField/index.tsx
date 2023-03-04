import React, { useEffect, useState } from 'react'
import style from './style.module.css'
import { GameStatusType } from '../../types/appTypes'
import { FieldItem } from '../FieldItem'
import { GameItemType, clickOnBomb, fieldStartGame, fieldStepOpen, markField } from './functions/gameFieldFunctions'

interface GameFieldProps{
  gameStatus:GameStatusType,
  startGame:() => void,
  looseGame:() => void,
  incrementPoints:(val:number) => void,
  bombsCount:number,
  fieldRef:any ,

}


export const GameField = ({fieldRef,startGame,gameStatus,looseGame,incrementPoints,bombsCount}:GameFieldProps) => {
  const [gameMatrix,setGameMatrix] = useState<GameItemType[]>((new Array(16*16)).fill({}).map(item => {return{count:0,type:null,open:'noopen'}}))
  const gameStep = (pos:number,type:'left'|'right') => {
    if(gameStatus === GameStatusType.default && type === 'left'){
      const arr = fieldStartGame(pos,bombsCount)
      const [points,matrix] = fieldStepOpen(pos,arr)     
      setGameMatrix(matrix)   
      startGame()
      incrementPoints(points())
      return
    }
    if(gameStatus === GameStatusType.game && gameMatrix[pos].type !== 'bomb' && type === 'left'){
      const [points,matrix] = fieldStepOpen(pos,gameMatrix) 
      setGameMatrix(matrix) 
      incrementPoints(points())   
      return
    }
    if(gameStatus === GameStatusType.game && type === 'right'){
      setGameMatrix(markField(pos,gameMatrix))
      return
    }
    if(gameStatus === GameStatusType.game && gameMatrix[pos].type === 'bomb' && type === 'left'){
      looseGame()
      setGameMatrix(clickOnBomb(pos,gameMatrix))
      return
    }
  }
  useEffect(() => {
    if(gameStatus === GameStatusType.default){
      setGameMatrix((new Array(16*16)).fill({}).map(item => {return{count:0,type:null,open:'noopen'}}))
    }
    
  },[gameStatus])
  return(
    <div ref={fieldRef} className={style.container}>
      {gameMatrix.map((item,index)=> 
        <FieldItem 
          disabled={gameStatus !== GameStatusType.game && gameStatus !== GameStatusType.default}  
          action={gameStep} 
          index={index} 
          type={item.type} 
          open={item.open} 
          count={item.count}/>) }
    </div>
  )
}