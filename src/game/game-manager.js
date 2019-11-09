import OrdersManager from '../orders/orders-manager'

import GridManager from '../grid/grid-manager'

import Level1 from '../levels/level-1'

export default class GameManager {
  constructor () {
    this.ordersManager = new OrdersManager(this)
    this.gridManager = new GridManager(this)
    this.level = new Level1()
    this.achieved = 0
  }

  next () {
    console.log('[GameManager] next')

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
