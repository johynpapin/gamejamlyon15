export default class Tile {
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  destroy () {
    // TODO: bad
    this.sprite.visible = false
  }
}
