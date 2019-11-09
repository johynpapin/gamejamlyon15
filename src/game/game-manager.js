import Order from '../orders/order'
import Orders from '../orders/orders'
import OrdersManager from '../orders/orders-manager'

import Cell from '../grid/cell'
import Grid from '../grid/grid'
import GridManager from '../grid/grid-manager'

import Ingredient from '../ingredients/ingredient'

class GameManager {
  constructor () {
    this.ordersManager = new OrdersManager(this)
    this.gridManager = new GridManager(this)
  }

  next () {
    console.log('[GameManager] next')

    this.ordersManager.next()
    this.gridManager.next()
  }

  draw (resources, stage) {
    this.ordersManager.draw(resources, stage)
    this.gridManager.draw(resources, stage)
  }
}
