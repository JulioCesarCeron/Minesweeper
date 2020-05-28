import React from "react";
import classesNames from 'classnames';

import bombIcon from "../../assets/bomb-explosion.svg";
import flagIcon from "../../assets/flag.svg";
import './item.modules.css'; 


const Item = ({
	onTouchField,
	indexLine,
	indexColumn,
	item,
}) => {
	const bombImg = <img className="img" src={bombIcon} height="35px" width="35px" alt='bomb' />;
	const flagImg = <img className="img" src={flagIcon} height="35px" width="35px" alt='bomb' />;
	const isBomb = item.mine;
	const isClear = item.status === 'clear';
	const isFlag = item.status === 'flag';

  return (
    <div
			className={classesNames('item', {
				'item-clear': isClear,
				'item-hidden': !isClear,
				'item-bomb': (isClear && isBomb)
			})}
			onMouseDown={(e) => onTouchField(indexLine, indexColumn, e)}
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
			{isFlag && flagImg}
    </div>
  );
}

export default Item;