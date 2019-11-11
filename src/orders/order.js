import * as PIXI from 'pixi.js'

export default class Order {
  constructor (recipe, name, timer) {
    this.name = name
    this.dish = recipe // List { ingredient : state }
    this.timer = timer
  }

  destroy () {
    this.container.visible = false
  }

  draw (container, resources, position) {
    if (!this.container) {
      this.text = new PIXI.Text(this.name)
      this.container = new PIXI.Container()

      this.rectangle = new PIXI.Graphics()

      this.rectangle.beginFill(0xffff00)
      this.rectangle.lineStyle(2, 0xff0000)
      this.rectangle.drawRect(0, 32 * position, 128, 32)

      this.container.addChild(this.rectangle)
      container.addChild(this.container)
      this.container.addChild(this.text)
    }

    this.text.x = 0
    this.text.y = 32 * position
    if (this.timer < 0) {
      this.timer = 0
    }
    this.text.text = this.name + ' ' + this.timer

    this.rectangle.clear()
    this.rectangle.beginFill(0xffff00)
    this.rectangle.lineStyle(2, 0xff0000)
    this.rectangle.drawRect(0, 32 * position, 128, 32)
  }
}
