export default class Cell {
  constructor (x, y, tile, utensil) {
    this.x = x
    this.y = y
    this.tile = tile
    this.utensil = utensil
    this.ingredient = null
  }

  draw (container, resources, offset) {
    if (this.tile !== null) {
      this.tile.draw(container, resources, offset)
    }

    if (this.utensil !== null) {
      this.utensil.draw(container, resources, offset)
    }
  }
}
