import GridManager from '../grid/grid-manager'
import Level1 from '../levels/level1'
import OrdersManager from '../orders/orders-manager'
import Menu from '../menu/menu'

export default class GameManager {
  constructor () {
    this.level = new Level1()
    this.ordersManager = new OrdersManager(this)
    this.gridManager = new GridManager(this)
    this.menu = new Menu(this)
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

  draw (stage, resources) {
    this.ordersManager.draw(stage, resources)
    this.gridManager.draw(stage, resources)
    this.menu.draw(stage, resources)
  }
}
