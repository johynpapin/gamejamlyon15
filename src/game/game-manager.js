import GridManager from '../grid/grid-manager'
import Level1 from '../levels/level1'
import Level2 from '../levels/level2'
import OrdersManager from '../orders/orders-manager'
import Menu from '../menu/menu'
import * as PIXI from 'pixi.js'

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
    /* let boo = true
    for (const indice in this.level.order) {
      console.log(this.level.order[indice].dish[0].states)
      if (ingredient instanceof this.level.order[indice].dish[0].ingredient) {
        for (const state1 of this.level.order[indice].dish[0].states) {
          if (boo) {
            boo = false
            console.log(ingredient.states)
            for (const state2 of ingredient.states) {
              if (state1 === state2) {
                boo = true
                console.log(state1, state2)
                break
              }
            }
          } else {
            return false
          }
        }
        const ord = this.ordersManager.orders.ordering.splice(indice, 1)
        this.ordersManager.orders.number -= 1
        this.notifyResolveOrder()
        ord[0].destroy()
        return true
      }
    } */
    this.notifyResolveOrder()
    this.ordersManager.shift()

    return true
  }

  next () {
    if (this.nextLevel) {
      return
    }

    if (this.gameOver) {
      return
    }

    if (this.paused) {
      return
    }

    if (this.achieved === this.level.maxOrders) {
      console.log('Level ended successfully')
      console.log(' Go to next level')
      this.nextLevel = true
      this.paused = true
      this.level = new Level2()
    }

    this.ordersManager.next()
    this.gridManager.next()
  }

  notifyResolveOrder () {
    this.achieved++
  }

  draw (delta, stage, resources) {
    this.ordersManager.draw(stage, resources)
    this.gridManager.draw(delta, stage, resources)
    this.menu.draw(stage, resources)

    if (this.gameOver && !this.text) {
      const style = new PIXI.TextStyle({
        dropShadow: true,
        dropShadowAlpha: 0.4,
        dropShadowBlur: 7,
        dropShadowDistance: 7,
        fill: 'white',
        fontSize: 66,
        fontWeight: 'bold',
        stroke: 'white'
      })
      this.text = new PIXI.Text('Game Over', style)

      stage.addChild(this.text)
    }

    if (this.nextLevel && !this.text) {
      const style = new PIXI.TextStyle({
        dropShadow: true,
        dropShadowAlpha: 0.4,
        dropShadowBlur: 7,
        dropShadowDistance: 7,
        fill: 'white',
        fontSize: 66,
        fontWeight: 'bold',
        stroke: 'white'
      })
      this.text = new PIXI.Text('Well done!', style)

      stage.addChild(this.text)
    }

    if (this.text) {
      this.text.anchor.set(0.5)
      this.text.x = stage.width / 2
      this.text.y = stage.height / 2
    }
  }
}
