import React from "react"
import ReactDOM from "react-dom/client"
import Minesweeper from "./components/Minesweeper/Minesweeper"

import "./index.modules.css"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(<Minesweeper />)
