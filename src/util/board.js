const cell = (y, x) => ({
	column: x,
	mine: false,
	proximityMines: 0,
	row: 0,
	status: "open",
})



export const board = (size, mines) => {
	const cells = [];

	for (let y = 0; y < size; y++) {
		cells[y] = [];
		for (let x = 0; x < size; x++) {
			cells[y][x] = cell(y, x);
		}
	}

	// Assign mines
	for (let i = 0; i < mines; i++) {
		const y = Math.floor(Math.random() * cells.length);
		const x = Math.floor(Math.random() * cells[y].length);
		cells[y][x].mine = true
	}
}