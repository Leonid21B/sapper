export interface GameItemType{
  type:null| 'bomb' | 'loose' | 'truebomb' ,
  open: 'flag' | 'question' | 'noopen' | null, 
  count:number,
}

export const fieldStartGame = (pos:number,bombsCount:number) => {
  const map = new Map()
  map.set(pos,true)
  let arr = new Array(16*16).fill(0)
  const obj = {type:null, open:'noopen', count:0}
  for(let i in arr){
    arr[i] = {...obj}
  }
  for(let i = 0; i < bombsCount; i++){
    const rand = Math.floor(Math.random() * 16 * 16)
    if(map.has(rand) && rand === pos){
      --i
      continue 
    }
    map.set(rand,true)
    arr[rand]['type'] = 'bomb'
    if(rand > 1 && rand % 16 !== 0) arr[rand-1]['count'] += 1
    if(rand < 16 * 16 - 1 && rand % 16 !== 15) arr[rand+1]['count'] += 1
    if(rand >= 16 ) arr[rand-16]['count'] += 1
    if(rand > 16 && rand %16 !== 0) arr[rand-17]['count'] += 1
    if(rand > 15 && rand %16 !== 15) arr[rand-15]['count'] += 1
    if(rand < 16 * 15 - 1 && rand % 16 !== 15) arr[rand+17]['count'] += 1
    if(rand < 16 * 15) arr[rand+16]['count'] += 1
    if(rand < 16 * 15 + 1 && rand % 16 !== 0) arr[rand+15]['count'] += 1
  }
  return arr
}

export const fieldStepOpen = (pos:number,arr:GameItemType[]) => {
  let newArr = JSON.parse(JSON.stringify(arr))
  if(!newArr[pos].open){
    return [() => 0, newArr]
  }
  let points = 1
  const map = new Map()
  newArr[pos]['open'] = null
  const recourcive = (p:number) => {
    
    if(newArr[p]['count'] !== 0){
      return
    }
    if(map.has(p)){
      return
    }
    points += 1
    map.set(p,true)
    if(p > 1 && p %16 !== 0) recourcive(p-1)
    if(p < 16 * 16 -1 && p %16 !== 15) recourcive(p+1)
    if(p >= 16) recourcive(p-16)
    if(p > 16 && p%16 !== 0) recourcive(p-17)
    if(p > 15 && p % 16 !== 15) recourcive(p-15)
    if(p < 16 * 15 - 1 && p % 16 !== 15) recourcive(p+17)
    if(p < 16 * 15) recourcive(p+16)
    if(p < 16 * 15 + 1 && p%16 !== 0) recourcive(p+15)
    newArr[p]['open'] = null
    return
  }
  recourcive(pos)
  return [() => points,newArr]
}

export const markField = (pos:number,arr:GameItemType[]) => {
  let newArr = JSON.parse(JSON.stringify(arr)) 
  switch(newArr[pos].open){
    case 'noopen':
      newArr[pos].open = 'flag'
      break
    case 'flag':
      newArr[pos].open = 'question'
      break
    case 'question':
      newArr[pos].open = 'noopen'
      break
    default:
  }
  return newArr
}

export const clickOnBomb = (pos:number,arr:GameItemType[]) => {
  let newArr = JSON.parse(JSON.stringify(arr)) 
  for(let i in newArr){
    if(newArr[i].type === 'bomb'){
      if(newArr[i].open === 'flag'){
        newArr[i].type = 'truebomb'
      }
      newArr[i].open = null
    }  
  }
  newArr[pos].type = 'loose'
  return newArr
}