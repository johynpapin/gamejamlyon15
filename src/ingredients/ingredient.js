export default class Ingredient {
  constructor (x, y) {
    this.x = x
    this.y = y
    this.hasMoved = false
  }

  move (dx, dy) {
    this.x += dx
    this.y += dy
  }
}
