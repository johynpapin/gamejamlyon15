export default class Ingredient {
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  move (dx, dy) {
    this.x += dx
    this.y += dy
  }

  destroy () {
    if (this.sprite) {
      // TODO: bad
      this.sprite.visible = false
    }
  }
}
