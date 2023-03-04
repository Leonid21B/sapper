import React, { useState } from 'react'
import style from './style.module.css'
import { getFieldImg } from './getFieldImg'
import { GameItemType } from '../GameField/functions/gameFieldFunctions'

interface FieldItemProps extends GameItemType{
  disabled:boolean,
  index:number,
  action: (n:number,p:'left'|'right')=> void
}

export const FieldItem = ({action,disabled,index,type,count,open}:FieldItemProps) => {
  const [isClicked,setClicked] = useState<null | 'clicked'>(null)
  const handleDown = () => {
    if(!disabled && open !== null){
      setClicked('clicked')
    }
  }
  const handleUp = () => {
    if(isClicked !== null) setClicked(null)
  }
  const onClick = (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.preventDefault()
    if(e.type === "contextmenu") action(index,'right')
    if(e.type === "click") action(index,'left')
  }
  return(
    <img 
      onContextMenu={onClick}
      onClick={onClick} 
      onMouseDown={handleDown}
      onMouseUp={handleUp}
      onMouseLeave={handleUp}
      className={style.image} 
      src={getFieldImg[isClicked || open || type || ((count < 9 && count >= 0) ? count.toString() as '0' : '0')]} 
      alt=''/>
  )
}