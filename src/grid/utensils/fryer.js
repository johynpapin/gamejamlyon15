import * as PIXI from 'pixi.js'
import Utensil from './utensil'
import utensils from './utensils'

export default class Fryer extends Utensil {
  constructor (cell, targetCell, targetOpt) {
    super(cell, targetCell, targetOpt)
    this.state = utensils.fryer.state
    this.hasOtherResult = false
  }

  createTransitions () {
    const transitions = new Map()

    transitions.set([utensils.knife.state], this.state)
    transitions.set([utensils.peeler.state], this.state)
    transitions.set([utensils.pot.state], this.state)

    return transitions
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
