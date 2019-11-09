import Order from './order'
import Orders from './orders'

export default class OrdersManager {
  constructor (orders) {
    this.reinit()
    this.orders = orders
    this.number = orders.ordering.length
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
}