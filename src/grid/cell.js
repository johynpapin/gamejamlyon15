export default class Cell {
  constructor (x, y, tile, utensil) {
    this.x = x
    this.y = y
    this.tile = tile
    this.utensil = utensil
  }

  set tile (tile) {
    this.tile = tile
  }

  set utensil (utensil) {
    this.utensil = utensil
  }

  draw (resources, offset) {
    if (this.tile !== null) {
      this.tile.draw(resources, offset)
    }

    if (this.utensil !== null) {
      this.utensil.draw(resources, offset)
    }
  }
}
