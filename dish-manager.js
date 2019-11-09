export default class DishManager {
  constructor (tree, orders) {
    this.recipes = []
    this.dish = order.dish
    this.deforastation(tree)
  }

  deforestation (tree) {
    if (tree === null) {} else if (tree.leftSon === null && tree.rightSon === null) {
      this.recipes.push(tree) // tree is a leaf
    } else {
      this.deforestation(tree.leftSon)
      this.deforestation(tree.rightSon)
    }
  }

  equal() {

  }
}
