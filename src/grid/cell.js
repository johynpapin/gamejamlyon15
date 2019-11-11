export default class Cell {
  constructor (x, y, tile) {
    this.x = x
    this.y = y
    this.tile = tile
    this.utensil = null
    this.ingredient = null
  }

  addUtensil (Utensil, targetCell, targetOpt) {
    this.utensil = new Utensil(this, targetCell, targetOpt)
  }

  isFree () {
    return this.ingredient == null
  }

  draw (container, resources) {
    if (this.tile !== null) {
      this.tile.draw(container, resources)
    }

    if (this.utensil !== null) {
      this.utensil.draw(container, resources)
    }

    if (this.ingredient !== null) {
      this.ingredient.draw(container, resources)
    }
  }
}
