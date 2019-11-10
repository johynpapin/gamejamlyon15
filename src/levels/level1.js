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
    const errorMsg = 'utensil out of grid boundaries'

    const key1 = { x: 1, y: 0 }
    console.assert(key1.x < this.sizeX && key1.y < this.sizeY,
      { key: key1, sizeX: this.sizeX, sizeY: this.sizeY, err: errorMsg })
    utensilsMap.set(key1, utensils.peeler.class)

    const key2 = { x: 1, y: 2 }
    console.assert(key2.x < this.sizeX && key2.y < this.sizeY,
      { key: key2, sizeX: this.sizeX, sizeY: this.sizeY, err: errorMsg })
    utensilsMap.set(key2, utensils.fryer.class)

    return utensilsMap
  }

  initIngredients () {
    const possibles = [ingredients.potato]

    return possibles
  }
}
