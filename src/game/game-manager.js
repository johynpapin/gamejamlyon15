import GridManager from '../grid/grid-manager'
import Level1 from '../levels/level1'
import OrdersManager from '../orders/orders-manager'

export default class GameManager {
  constructor () {
    this.level = new Level1()
    this.ordersManager = new OrdersManager(this)
    this.gridManager = new GridManager(this)
    this.achieved = 0
    this.paused = false
  }

  next () {
    if (this.paused) {
      return
    }

    if (this.achieved === this.level.maxOrders) {
      console.log('Level ended successfully')
    }

    this.ordersManager.next()
    this.gridManager.next()
  }

  notifyResolveOrder () {
    this.achieved += 1
  }

  draw (resources, stage) {
    this.ordersManager.draw(resources, stage)
    this.gridManager.draw(resources, stage)
  }
}
