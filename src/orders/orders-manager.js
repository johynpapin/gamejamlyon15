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
    this.tics = 0
    this.threshold = Math.floor(Math.random() * 30) + 20
  }

  createOrder () {
    const newOrder = new Order(null, null, null)
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
    } else if (this.number < 3) {
      if (this.tics >= this.treshold) {
        this.createOrder()
        this.reinit()
      }
    }

    this.tics = this.tics + 1
  }

  draw (stage, resources) {

  }
}
