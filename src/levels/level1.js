import ingredients from '../grid/ingredients/ingredients'
import utensils from '../grid/utensils/utensils'

export default class Level1 {
  constructor () {
    this.sizeX = 3
    this.sizeY = 3
    this.maxOrders = 6
    this.utensilsMap = this.initUtensils()
    this.ingredients = this.initIngredients()
  }

  initUtensils () {
    const utensilsMap = new Map()

    const key1 = {
      cell: { x: 1, y: 0 },
      targetCell: { x: 1, y: 1 },
      targetOpt: { x: 2, y: 0 }
    }
    utensilsMap.set(key1, utensils.peeler.class)

    const key2 = {
      cell: { x: 1, y: 2 },
      targetCell: { x: 0, y: 2 },
      targetOpt: null
    }
    utensilsMap.set(key2, utensils.fryer.class)

    return utensilsMap
  }

  initIngredients () {
    const possibles = [ingredients.potato]

    return possibles
  }
}
