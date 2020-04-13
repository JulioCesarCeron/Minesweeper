import React, { useState } from "react";
import id from "shortid";

import Item from "./components/Item";
import { Board } from "./models/Board";
import { PEERS } from "./util/cosntants";

function App() {
  const [blow] = useState(false);
	const [boardField, setBoardField] = useState(new Board(10, 10));
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
		const handleBoardField = boardField;
		const { cells: handlerCells } = handleBoardField;
		const cell = handlerCells[y][x];
		
		if (cell.status !== 'open'){
			return null;
		} else if (cell.mine) {
			showAllBombs();
			return 'gameover'
		} else {
			remainingCells -= 1;
			handlerCells[y][x].status = 'clear'

			// Empty cell, let's clear the whole block.
			if (cell.proximityMines === 0) {
				for (let peer of PEERS) {
					if (
						handlerCells[cell.row+peer[0]] &&
						handlerCells[cell.row+peer[0]][cell.column+peer[1]]
					) {
						checkCell((cell.row + peer[0]), (cell.column + peer[1]));
					}
				}
			}

			setBoardField({
				...handleBoardField,
				remainingCells,
				cells: handlerCells
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
						<div className="row" key={id.generate()}>
							{line.map((item, x) => (
								<Item
									key={id.generate()}
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
