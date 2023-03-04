import React, { useEffect, useRef } from 'react'
import style from './MainPage.module.css'
import { Header } from '../../components/Header'
import { useGameController } from '../../hooks/useGameController'
import { GameField } from '../../components/GameField'

const bomsCount = 20

export const MainPage = () => {
  const fieldRef = useRef<HTMLInputElement>(null)
  const gameController = useGameController()
  useEffect(() => {
    if(gameController.points === 16*16 - bomsCount){
      gameController.winGame()
    }
  },[gameController.points])
  return(
    <>
      <Header fieldRef={fieldRef} resetGame={gameController.resetGame} gameStatus={gameController.gameStatus} looseGame={gameController.looseGame} points={gameController.points}/>
      <GameField fieldRef={fieldRef} bombsCount={bomsCount} incrementPoints={gameController.incrementPoints} looseGame={gameController.looseGame} startGame={gameController.startGame}  gameStatus={gameController.gameStatus}/>
    </>
  )
}