import React, { useCallback, useEffect, useRef, useState } from 'react'
import style from './style.module.css'
import { CounterFromStr } from '../CounterFromString'
import { GameStatusType } from '../../types/appTypes'
import { getFace } from './getFace'

interface HeaderProps{
  gameStatus:GameStatusType,
  looseGame:() => void,
  points:number,
  resetGame:() => void,
  fieldRef:any,
}

export const Header = ({fieldRef,gameStatus,looseGame,points,resetGame}:HeaderProps) => {
  const intervalRef = useRef<any>(null)
  const timerRef = useRef<number>(40)
  const [faceStatus, setFaceStatus] = useState<null | 'clicked' | 'fear'>(null)
  const [timer, setTimer] = useState(40)

  const decreaseTimer = () => {
    if(timerRef.current === 0){
       clearInterval(intervalRef.current)
       looseGame()
       return
    }
    setTimer(it  => it - 1)
    timerRef.current = timerRef.current -1
  }
  const onFaceClick = () => {
    resetGame()
  }

  const downOnField = useCallback(() => {
    setFaceStatus('fear')
  },[])

  const upOnField = useCallback(() => {
    setFaceStatus(null)
  },[])
  
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current)
      if(fieldRef?.current) fieldRef.current.removeEventListener('mousedown',downOnField)
      if(fieldRef?.current) fieldRef.current.removeEventListener('mouseup',upOnField)
      if(fieldRef?.current) fieldRef.current.removeEventListener('mouseleave',upOnField)
    }
  },[])
  useEffect(() => {
    if(gameStatus === GameStatusType.game || gameStatus === GameStatusType.default){
      if(fieldRef?.current) fieldRef.current.removeEventListener('mousedown',downOnField)
      if(fieldRef?.current) fieldRef.current.removeEventListener('mouseup',upOnField)
      if(fieldRef?.current) fieldRef.current.removeEventListener('mouseleave',upOnField)
      if(fieldRef?.current) fieldRef.current.addEventListener('mousedown',downOnField)
      if(fieldRef?.current) fieldRef.current.addEventListener('mouseup',upOnField)
      if(fieldRef?.current) fieldRef.current.addEventListener('mouseleave',upOnField)
      return
    }
    if(fieldRef?.current) fieldRef.current.removeEventListener('mousedown',downOnField)
    if(fieldRef?.current) fieldRef.current.removeEventListener('mouseup',upOnField)
    if(fieldRef?.current) fieldRef.current.removeEventListener('mouseleave',upOnField)
  },[gameStatus])
  useEffect(() => {
    switch(gameStatus){
      case GameStatusType.default:
        timerRef.current = 40
        setTimer(40)
        break;
      case GameStatusType.game:
        intervalRef.current = setInterval(decreaseTimer,1000*60)
        break;
      case GameStatusType.loose:
        clearInterval(intervalRef.current)
        break;
      case GameStatusType.win:
        clearInterval(intervalRef.current)
        break
      default:
    }
    
  },[gameStatus])
  return(
    <div className={style.container}>
      <CounterFromStr value={`${timer}`}/>
      <img 
        className={style.face}
        onClick={onFaceClick} 
        onMouseDown={() => setFaceStatus('clicked')} 
        onMouseUp={() => setFaceStatus(null)} 
        onMouseLeave={() => setFaceStatus(null)} 
        src={getFace[faceStatus || gameStatus]} 
        alt=''
      />
      <CounterFromStr value={`${points}`}/>
    </div>
  )
}