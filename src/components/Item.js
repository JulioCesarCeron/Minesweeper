import React from "react";

import bomb from "../assets/bomb-explosion.svg";

const Item = ({
	onTouchField,
	indexLine,
	indexColumn,
	item,
}) => {
  const bombImg = <img className="img" src={bomb} alt='bomb' />;
	const isBomb = item.mine;
	const isClear = item.status === 'clear';

  return (
    <div
			className={`item ${isClear ? 'item-clear' : 'item-hidden'}`}
      onClick={() => onTouchField(indexLine, indexColumn)}
    >

			{isClear && (
				<>
					{item.mine ? (
						bombImg
					) : (
						item.proximityMines === 0 ? '' : item.proximityMines
					)}
				</>
			)}
      {item.active === 1 && (isBomb ? bombImg : item.bomb)}
    </div>
  );
}

export default Item;