import React from "react";
import classesNames from 'classnames';

import bomb from "../../assets/bomb-explosion.svg";
import './item.modules.css'; 


const Item = ({
	onTouchField,
	indexLine,
	indexColumn,
	item,
}) => {
  const bombImg = <img className="img" src={bomb} height="35px" width="35px" alt='bomb' />;
	const isBomb = item.mine;
	const isClear = item.status === 'clear';

  return (
    <div
			className={classesNames('item', {
				'item-clear': isClear,
				'item-hidden': !isClear,
				'item-bomb': (isClear && isBomb)
			})}
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