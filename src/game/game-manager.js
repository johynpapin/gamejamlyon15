import GridManager from '../grid/grid-manager'
import Level1 from '../levels/level1'
import OrdersManager from '../orders/orders-manager'

export default class GameManager {
  constructor () {
    this.level = new Level1()
    this.ordersManager = new OrdersManager(this)
    this.gridManager = new GridManager(this)
    this.achieved = 0
  }

  check (ingredient) {
    let boo = true
    for (const indice in this.level.orders) {
      if (ingredient.instanceof(this.level.order[indice].ingredient)) {
        for (const state1 of this.level.order[indice].state) {
          if (boo) {
            boo = false
            for (const state2 of this.ingredient.states) {
              if (state1 === state2) {
                boo = true
              }
            }
          } else {
            return false
          }
        }
        this.level.order.splice(indice, 1)
        return true
      }
    }
    return false
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
