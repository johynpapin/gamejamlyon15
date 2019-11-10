export default class Orders {
  constructor (list = []) {
    this.ordering = list
  }

  draw (container, resources) {
    for (const orderId in this.ordering) {
      this.ordering[orderId].draw(container, resources, orderId)
    }
  }
}
