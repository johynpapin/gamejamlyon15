import * as PIXI from 'pixi.js'
import Utensil from './utensil'
import utensils from './utensils'

export default class Peeler extends Utensil {
  constructor (cell, targetCell, targetOpt) {
    super(cell, targetCell, targetOpt)
    this.state = utensils.peeler.state
    this.hasOtherResult = true
  }

  createTransitions () {
    const transitions = new Map()

    transitions.set([utensils.knife.state], this.state)
    transitions.set([utensils.pot.state], this.state)

    return transitions
  }

  produce (ingredient) {
    // TODO: create new ingredient ?
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
