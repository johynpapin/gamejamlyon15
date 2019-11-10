export default class Level {
  constructor () {
    this.utensilsMap = new Map()
    this.ingredients = []
  }

  addUtensil (coord, utensil) {
    this.utensils.set(coord, utensil)
  }
}
