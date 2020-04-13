import { Cell } from "./Cell";
import { PEERS } from "../util/cosntants";

export class Board {
	cells: Cell[][] = [];

	public remainingCells = 0;
	public mineCount = 0;

	constructor(size: number, mines: number) {
		for (let y = 0; y < size; y++) {
			this.cells[y] = [];
			for (let x = 0; x < size; x++) {
				this.cells[y][x] = new Cell(y, x);
			}
		}

		// Assign mines
		for (let i = 0; i < mines; i++) {
			this.getRandomCell().mine = true
		}

		// Count mines
		for (let y = 0; y < size; y++) {
			for (let x = 0; x < size; x++) {
				let adjacentMines = 0;
				for (let peer of PEERS) {
					if (
						this.cells[y+peer[0]]
						&& this.cells[y+peer[0]][x+peer[1]]
						&& this.cells[y+peer[0]][x+peer[1]].mine
					) {
						adjacentMines++;
					}
				}
				this.cells[y][x].proximityMines = adjacentMines;

				if (this.cells[y][x].mine) {
					this.mineCount++;
				}
			}
		}
		
		this.remainingCells = (size * size) - this.mineCount
	}

	getRandomCell(): Cell {
		const y = Math.floor(Math.random() * this.cells.length);
		const x = Math.floor(Math.random() * this.cells[y].length);
		return this.cells[y][x];
	}
}