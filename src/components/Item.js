import React from "react";
import { ItemSquare, ImgBomb} from "./ItemStyle";
import bomb from "../assets/bomb-explosion.svg";

export default function Item({ onTouchField, indexLine, indexColumn, item }) {
  const bombImg = <ImgBomb src={bomb} alt='bomb' />;
  const isBomb = item.bomb === 1;
  const activeBombStyle = isBomb && item.active === 1;
  return (
    <ItemSquare
      onClick={() => onTouchField(indexLine, indexColumn)}
      isBomb={activeBombStyle}
    >
      {item.active === 1 && (isBomb ? bombImg : item.bomb)}
    </ItemSquare>
  );
}
