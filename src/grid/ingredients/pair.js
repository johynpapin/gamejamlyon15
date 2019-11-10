import Ingredient from './ingredient'

export default class Pair extends Ingredient {
  constructor (x, y, firstIngredient = null, secondIngredient = null) {
    super(x, y)
    this.leftSon = firstIngredient
    this.rightSon = secondIngredient
    this.leafs = []
  }

  findLeaf () {
    if (this.leftSon === null && this.rightSon === null) {
      this.leafs.push(this)
    } else if (this.leftSon === null) {
      this.rightSon.findLeaf()
    } else if (this.rightSon === null) {
      this.leftSon.findLeaf()
    } else {
      this.leftSon.findLeaf()
      this.rightSon.findLeaf()
    }
  }
}
