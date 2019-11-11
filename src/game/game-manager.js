import GridManager from '../grid/grid-manager'
import Level1 from '../levels/level1'
import Level2 from '../levels/level2'
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
    this.gameOver = false
  }

  check (ingredient) {
    let boo = true
    for (const indice in this.level.order) {
      console.log(this.level.order[indice].dish[0].states)
      if (ingredient instanceof this.level.order[indice].dish[0].ingredient) {
        for (const state1 of this.level.order[indice].dish[0].states) {
          if (boo) {
            boo = false
            console.log(ingredient.states)
            for (const state2 of ingredient.states) {
              console.log(state1, state2)
              console.log(state1, state2)
              if (state1 === state2) {
                boo = true
              }
            }
          } else {
            return false
          }
        }
        console.log('\n')
        console.log('ICICIEIEFFEI')
        this.ordersManager.orders.splice(indice, 1)
        this.ordersManager.orders.number -= 1
        this.notifyResolveOrder()
        return true
      }
    }
    return false
  }

  next () {
    if (this.gameOver) {
      console.log('Game over looser')
      return
    }

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

  draw (stage, resources) {
    this.ordersManager.draw(stage, resources)
    this.gridManager.draw(stage, resources)
    this.menu.draw(stage, resources)
  }
}
