import React, { useState } from "react";

import Item from "./components/Item";
import { PEERS } from "./util/cosntants";
import { Board } from "./models/Board";


function App() {
  const [blow] = useState(false);
	const [boardField, setBoardField] = useState(new Board(10, 10));
	console.log('boardField', boardField);
	let { remainingCells } = boardField;

	const restart = () => {
		setBoardField(new Board(10, 15));
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

  const touchField = (y, x) => {
		const checkValue = checkCell(y, x); 
		
		if (checkValue === 'gameover') {
			alert('Game Over =(')
		};

		if (checkValue === 'win') {
			alert('You Win =)')
		};
	}

  return (
		<div className="wrapper">
			{blow && <h3 style={{ marginTop: 0 }} >Fim do Jogo</h3>}
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
					<button onClick={() => restart()} >restart</button>
			</div>
		</div>
  );
}

export default App;
