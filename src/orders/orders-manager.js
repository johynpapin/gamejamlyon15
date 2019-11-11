import * as PIXI from 'pixi.js'
import Order from './order'
import Orders from './orders'

export default class OrdersManager {
  constructor (gameManager) {
    this.reinit()
    this.orders = new Orders()
    this.number = 0
    this.gameManager = gameManager
  }

  reinit () {
    this.ticks = 0
    this.threshold = Math.floor(Math.random() * 10) + 5
  }

  shift () {
    this.orders.ordering.shift().destroy()
    this.number--
  }

  createOrder () {
    const newOrder = this.gameManager.level.order[this.number]
    this.orders.ordering.push(newOrder)
    this.number += 1
  }

  resolvedOrder (order) {
    this.orders.slice(this.orders.indexOf(order), 1)
    this.number -= 1
    this.gameManager.notifyResolveOrder()
  }

  next () {
    if (this.number === 0) {
      this.createOrder()
      this.reinit()
    } else if (this.number < this.gameManager.level.maxOrders && this.number < 3) {
      if (this.ticks >= this.threshold) {
        this.createOrder()
        this.reinit()
      }
    }

    for (const ord of this.orders.ordering) {
      if (!ord) {
        continue
      }

      ord.timer--

      if (ord.timer <= 0) {

      }
    }

    this.ticks++
  }

  draw (stage, resources) {
    if (!this.container) {
      this.container = new PIXI.Container()

      this.container.sortableChildren = true

      stage.addChild(this.container)
    }

    this.orders.draw(this.container, resources)
  }
}
