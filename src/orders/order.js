import * as PIXI from 'pixi.js'

export default class Order {
  constructor (recipe, currency, timer) {
    this.dish = recipe // List of ingredients/recipes
    this.earned = currency
    this.timer = timer
  }

  draw (container, resources, position) {
    if (!this.container) {
      this.container = new PIXI.Container()

      this.rectangle = new PIXI.Graphics()

      this.rectangle.beginFill(0xffff00)
      this.rectangle.lineStyle(5, 0xff0000)
      this.rectangle.drawRect(300 * position, 0, 300, 100)

      this.container.addChild(this.rectangle)
      container.addChild(this.container)
    }
  }
}
