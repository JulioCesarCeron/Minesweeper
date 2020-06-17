import React, { useState } from 'react';

import './Minesweeper.modules.css';
import Item from '../Item/Item';
import { Board } from '../../models/Board';
import { PEERS } from '../../util/cosntants';


const Minesweeper = () => {
	const [blow, setBlow] = useState(false);
	const [boardField, setBoardField] = useState(new Board(10, 10));
	let { remainingCells } = boardField;

	const restart = () => {
		setBoardField(new Board(10, 15));
		setBlow(false);
	}

	const showAllBombs = () => {
		const handlerCells = boardField.cells;
		for (const row of handlerCells) {
			for (const cell of row) {
				if (cell.status === 'open') {
					cell.status = 'clear';
				}
			}
		}

		setBoardField({
			...boardField,
			cells: handlerCells
		});
	}

	const checkCell = (y, x) => {
		const { cells } = boardField;
		const cell = cells[y][x];
		
		if (cell.status !== 'open'){
			return null;
		} else if (cell.mine) {
			showAllBombs();
			return 'gameover'
		} else {
			remainingCells -= 1;
			cells[y][x].status = 'clear'

			// Empty cell, let's clear the whole block.
			if (cell.proximityMines === 0) {
				for (let peer of PEERS) {
					if (
						cells[cell.row+peer[0]] &&
						cells[cell.row+peer[0]][cell.column+peer[1]]
					) {
						checkCell((cell.row + peer[0]), (cell.column + peer[1]));
					}
				}
			}

			setBoardField({
				...boardField,
				remainingCells,
				cells
			});

			if (remainingCells === 0) {
				return 'win';
			}

			return null;
		}
	}

	const setFlag = (y, x) => {
		const { cells } = boardField;
		cells[y][x].status = cells[y][x].status === 'flag' ? 'open' : 'flag';

		setBoardField({
			...boardField,
			cells
		});
	}

  const touchField = (y, x, e) => {
		if (e.button === 2) {
			setFlag(y, x);
			return;
		}

		const checkValue = checkCell(y, x); 
		
		if (checkValue === 'gameover') {
			setBlow(true);
		};

		if (checkValue === 'win') {
			alert('You Win =)');
			setBlow(true);
		};
	}

  return (
		<div className="wrapper">
			<div className="header-content">
				{blow && <h1 className="game-over" >GAME OVER</h1>}
			</div>
			<div className="container">
				{boardField.cells.map((line, y) =>  (
						<div className="row" key={`y-${y}`}>
							{line.map((item, x) => (
								<Item
									key={`y-${y}-x-${x}`}
									indexLine={y}
									indexColumn={x}
									item={item}
									onTouchField={touchField}
								/>
							))}
						</div>
					))}
			</div>
			<div className="group-button">
				{blow && <button className="btn btn-3" onClick={() => restart()} >RETRY</button>}
			</div>
		</div>
  );
};

export default Minesweeper;