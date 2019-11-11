import ingredients from '../grid/ingredients/ingredients'
import utensils from '../grid/utensils/utensils'
import Order from '../orders/order'
import Potato from '../grid/ingredients/potato'

export default class Level1 {
  constructor () {
    this.sizeX = 3
    this.sizeY = 3
    this.maxOrders = 2
    this.orders()
    this.utensilsMap = this.initUtensils()
    this.ingredients = this.initIngredients()
  }

  orders () {
    const order1 = new Order([{ ingredient: Potato, states: ['peel', 'fry'] }], 'frite', 100)
    const order2 = new Order([{ ingredient: Potato, states: ['fry'] }], 'chips', 100)
    this.order = [order1, order2]
  }

  initUtensils () {
    const utensilsMap = new Map()

    const key1 = {
      cell: [1, 0],
      targetCells: [[1, 1], [0, 0]]
    }
    utensilsMap.set(key1, utensils.peeler.class)

    const key2 = {
      cell: [1, 2],
      targetCells: [[0, 2]]
    }
    utensilsMap.set(key2, utensils.fryer.class)

    return utensilsMap
  }

  initIngredients () {
    const possibles = [ingredients.potato]

    return possibles
  }
}
