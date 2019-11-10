import * as PIXI from 'pixi.js'
import utensils from './utensils'
import Utensil from './utensil'
import Waste from './../ingredients/waste'

export default class Peeler extends Utensil {
  constructor (cell, targetCell, targetOpt) {
    super(cell, targetCell, targetOpt)
    this.targetOpt = targetOpt
    this.stackIngredient = null
    this.state = utensils.peeler.state
    this.stateOpt = utensils.peeler.stateOpt
  }

  createTransitions () {
    const transitions = new Map()

    transitions.set([utensils.knife.state], [this.state, this.stateOpt])
    transitions.set([utensils.pot.state], [this.state, this.stateOpt])

    return transitions
  }

  next () {
    if (this.tics === 0 && this.targetOpt.isFree() && this.targetCell.isFree()) {
      this.apply()

      this.targetCell.ingredient = this.cell.ingredient
      this.targetCell.ingredient.x = this.targetCell.x
      this.targetCell.ingredient.y = this.targetCell.y

      this.targetOpt.ingredient = this.stackIngredient
      this.targetOpt.ingredient.x = this.targetOpt.x
      this.targetOpt.ingredient.y = this.targetOpt.y

      this.cell.ingredient = null
      this.stackIngredient = null

      this.reinit()
    } else if (this.cell.ingredient != null) {
      this.tics--
    }
  }

  apply () {
    console.log('on apply')
    for (const [key, value] of this.transitions) {
      if (this.cell.ingredient.containsStates(key)) {
        this.cell.ingredient.addState(value[0])
        this.stackIngredient = this.cell.ingredient.clone()
        this.stackIngredient.addState(value[1])
      } else {
        this.cell.ingredient.destroy()
        this.cell.ingredient = new Waste()
      }
    }
  }

  draw (container, resources, offset) {
    if (!this.sprite) {
      this.sprite = new PIXI.Sprite(resources.peeler.texture)
      container.addChild(this.sprite)
    }

    this.sprite.x = this.cell.x * this.sprite.width
    this.sprite.y = this.cell.y * this.sprite.height
  }
}
