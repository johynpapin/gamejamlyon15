import GridManager from '../grid/grid-manager'
import Level1 from '../levels/level1'
import Level2 from '../levels/level2'
import OrdersManager from '../orders/orders-manager'

export default class GameManager {
  constructor () {
    this.level = new Level1()
    this.ordersManager = new OrdersManager(this)
    this.gridManager = new GridManager(this)
    this.achieved = 0
    this.paused = false
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
        this.ordersManager.orders.splice(indice, 1)
        this.ordersManager.orders.number -= 1
        this.notifyResolveOrder()
        return true
      }
    }
    return false
  }

  next () {
    if (this.paused) {
      return
    }

    if (this.achieved === this.level.maxOrders) {
      console.log('Level ended successfully')
      console.log(' Go to next level')
      this.level = new Level2()
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
