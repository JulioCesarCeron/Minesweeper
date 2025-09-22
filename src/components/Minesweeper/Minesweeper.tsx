import React, { useState } from "react"

import "./Minesweeper.modules.css"
import { Item } from "../Item"
import { Board } from "../../models"
import { PEERS } from "../../util/constants"

const Minesweeper = () => {
  const [blow, setBlow] = useState(false)
  const [boardField, setBoardField] = useState<Board>(new Board(10, 10))

  let { remainingCells } = boardField

  const restart = () => {
    setBoardField(new Board(10, 15))
    setBlow(false)
  }

  const showAllBombs = () => {
    const handlerCells = boardField.cells
    for (const row of handlerCells) {
      for (const cell of row) {
        if (cell.status === "open") {
          cell.status = "clear"
        }
      }
    }

    const newBoard = new Board(
      boardField.cells.length,
      boardField.cells[0].length
    )
    newBoard.cells = handlerCells
    setBoardField(newBoard)
  }

  const checkCell = (y: number, x: number) => {
    const { cells: handlerCells } = boardField
    const cell = handlerCells[y][x]

    if (cell.status !== "open") {
      return null
    } else if (cell.mine) {
      showAllBombs()
      return "gameover"
    } else {
      remainingCells -= 1
      handlerCells[y][x].status = "clear"

      // Empty cell, let's clear the whole block.
      if (cell.proximityMines === 0) {
        for (let peer of PEERS) {
          if (
            handlerCells[cell.row + peer[0]] &&
            handlerCells[cell.row + peer[0]][cell.column + peer[1]]
          ) {
            checkCell(cell.row + peer[0], cell.column + peer[1])
          }
        }
      }

      const newBoard = new Board(
        boardField.cells.length,
        boardField.cells[0].length
      )
      newBoard.cells = handlerCells
      newBoard.remainingCells = remainingCells
      setBoardField(newBoard)

      if (remainingCells === 0) {
        return "win"
      }

      return null
    }
  }

  const setFlag = (y: number, x: number) => {
    const { cells: handlerCells } = boardField
    handlerCells[y][x].status =
      handlerCells[y][x].status === "flag" ? "open" : "flag"

    const newBoard = new Board(
      boardField.cells.length,
      boardField.cells[0].length
    )
    newBoard.cells = handlerCells

    setBoardField(newBoard)
  }

  const touchField = (y: number, x: number, e: React.MouseEvent) => {
    if (e.button === 2) {
      setFlag(y, x)
      return
    }

    const checkValue = checkCell(y, x)

    if (checkValue === "gameover") {
      setBlow(true)
    }

    if (checkValue === "win") {
      alert("You Win =)")
      setBlow(true)
    }
  }

  return (
    <div className="wrapper">
      <div className="header-content">
        {blow && <h1 className="game-over">GAME OVER</h1>}
      </div>
      <div className="container">
        {boardField.cells.map((line, y) => (
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
        {blow && (
          <button className="btn btn-3" onClick={() => restart()}>
            RETRY
          </button>
        )}
      </div>
    </div>
  )
}

export { Minesweeper }
