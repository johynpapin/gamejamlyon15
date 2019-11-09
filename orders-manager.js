class OrdersManager {
  constructor (tics = 0, orders) {
    this.tics = tics
    this.orders = orders
    this.number = orders.ordering.length
  }
}
