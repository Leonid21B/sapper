import React from 'react'
import style from './style.module.css'
import arrWithImages from './getImage'

interface CounterPropsType{
  value:string,
}

export const CounterFromStr = ({value}:CounterPropsType) => {
  const getArrayByStr = (val:string) => {
    const arr = val.split('').map(it => parseInt(it))
    return [...(new Array(3 - arr.length)).fill(0),...arr]
  }
  return(
    <div className={style.container}>
      {getArrayByStr(value).map((item => <img className={style.image} src={arrWithImages[item]} alt=''/>))}
    </div>
  )
}