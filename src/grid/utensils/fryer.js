import * as PIXI from 'pixi.js'
import utensils from './utensils'
import Utensil from './utensil'

export default class Fryer extends Utensil {
  constructor (cell, targetCells) {
    super(cell, targetCells)
    this.transitions = utensils.fryer.transitions
  }

  draw (container, resources, offset) {
    if (!this.utensilContainer) {
      this.sprite = new PIXI.AnimatedSprite(resources.fryer.spritesheet.animations['Friteuse_Top_Down_v1-Sheet'])
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
