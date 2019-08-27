import React from 'react';
import {ItemSquare} from './ItemStyle'

export default function Item({indexLine, indexColumn, item}) {
  
  return (
    <ItemSquare>{item.bomb}</ItemSquare>
  )
}