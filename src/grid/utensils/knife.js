import * as PIXI from 'pixi.js'
import Utensil from './utensil'
import utensils from './utensils'

export default class Knife extends Utensil {
  constructor (cell, targetCell, targetOpt) {
    super(cell, targetCell, targetOpt)
    this.state = utensils.knife.state
    this.hasOtherResult = false
  }

  createTransitions () {
    const transitions = new Map()

    return transitions
  }

  draw (container, resources) {
    if (!this.sprite) {
      this.sprite = new PIXI.AnimatedSprite(resources.knife.spritesheet.animations['Couteau_Top_Down_v1-Sheet'])
      this.sprite.animationSpeed = 0.1
      this.sprite.play()
      container.addChild(this.sprite)
    }

    this.sprite.x = this.x * this.sprite.width
    this.sprite.y = this.y * this.sprite.height
  }
}
