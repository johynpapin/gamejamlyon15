import * as PIXI from 'pixi.js'
import utensils from './utensils'
import Utensil from './utensil'

export default class Peeler extends Utensil {
  constructor (cell, targetCells) {
    super(cell, targetCells)
    this.transitions = utensils.peeler.transitions
  }

  draw (container, resources, offset) {
    if (!this.sprite) {
      this.sprite = new PIXI.AnimatedSprite(resources.peeler.spritesheet.animations['Econome_Top_Down_v1-Sheet'])
      this.sprite.animationSpeed = 0.1
      this.sprite.zIndex = 1
      this.sprite.play()
      container.addChild(this.sprite)
    }

    this.sprite.x = this.cell.x * this.sprite.width
    this.sprite.y = this.cell.y * this.sprite.height

    this.drawLoadingBar(container, this.sprite.x, this.sprite.y)
  }
}
