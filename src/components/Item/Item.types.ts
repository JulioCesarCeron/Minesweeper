import type { Cell } from "../../models"

export type ItemProps = {
  onTouchField: (
    y: number,
    x: number,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void
  indexLine: number
  indexColumn: number
  item: Cell
}
