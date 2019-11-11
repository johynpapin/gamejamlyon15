import * as PIXI from 'pixi.js'

export default class Order {
  constructor (recipe, name, timer) {
    this.name = name
    this.dish = recipe // List { ingredient : state }
    this.timer = timer
  }

  draw (container, resources, position) {
    if (!this.container) {
      this.container = new PIXI.Container()

      this.rectangle = new PIXI.Graphics()

      this.rectangle.beginFill(0xffff00)
      this.rectangle.lineStyle(2, 0xff0000)
      this.rectangle.drawRect(0, 32 * position, 128, 32)

      this.container.addChild(this.rectangle)
      container.addChild(this.container)
    }
    if (this.dish !== null) {
      // const text = new PIXI.Text(this.name)
      // this.container.addChild(text)
    }
  }
}
