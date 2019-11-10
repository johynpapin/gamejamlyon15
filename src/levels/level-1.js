import Level from './level'
import Potato from '../ingredients/potato'
import utensils from '../grid/utensils/utensils'

export default class Level1 extends Level {
  constructor () {
    super()
    this.sizeX = 3
    this.sizeY = 3
    this.maxOrders = 6
    this.initUtensil()
    this.initIngredients()
  }

  // 3 x 3 grid
  initUtensil () {
    const errorMsg = 'utensil out of grid boundaries'
    const key1 = { x: 1, y: 0 }
    console.assert(key1.x < this.sizeX && key1.y < this.sizeY, { key: key1, sizeX: this.sizeX, sizeY: this.sizeY, err: errorMsg })
    this.utensilsMap.set(key1, utensils.peeler.name)
  }

  // possibles ingredients for this level
  initIngredients () {
    this.ingredients.push(Potato)
  }
}
