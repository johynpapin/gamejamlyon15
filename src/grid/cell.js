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
}
