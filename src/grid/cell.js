export default class Cell {
  constructor (x, y, tile) {
    this.x = x
    this.y = y
    this.tile = tile
    this.utensil = null
    this.ingredient = null
  }

  addUtensil (Utensil) {
    console.log(this, 'nope')
    this.utensil = new Utensil(this)
  }

  next () {
    if (this.ingredient != null) {
      this.utensil.apply(this.ingredient)
    }
  }

  draw (container, resources, offset) {
    if (this.tile !== null) {
      this.tile.draw(container, resources, offset)
    }

    if (this.utensil !== null) {
      this.utensil.draw(container, resources, offset)
    }

    if (this.ingredient !== null) {
      this.ingredient.draw(container, resources, offset)
    }
  }
}
