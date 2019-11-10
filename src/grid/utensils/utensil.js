import Waste from './../ingredients/waste'

export default class Utensil {
  constructor (cell, targetCell, targetOpt) {
    this.cell = cell
    this.targetCell = targetCell
    this.targetOpt = targetOpt
    this.state = null
    this.hasOtherResult = false
    // map -> [key_0, ..., key_n]: 'value'
    this.transitions = this.createTransitions()
    this.reinit()
  }

  reinit () {
    this.tics = 3
  }

  next () {
    if (this.tics === 0) {
      if ((this.targetOpt == null && this.targetCell.isFree()) || (this.targetOpt != null && this.targetCell.isFree() && this.targetOpt.isFree())) {
        this.targetCell.ingredient = this.cell.ingredient
        this.targetCell.ingredient.x = this.targetCell.x
        this.targetCell.ingredient.y = this.targetCell.y
        this.cell.ingredient = null
        this.reinit()
      }
    } else if (this.cell.ingredient != null) {
      this.tics--
    }
  }

  apply (ingredient) {
    for (const [key, value] of this.transitions) {
      if (ingredient.containsStates(key)) {
        ingredient.addState(value)
        if (this.hasOtherResult) {
          this.produce()
        }
      } else {
        ingredient.destroy()
        this.cell.ingredient = new Waste()
      }
    }
  }

  isFree () {
    return this.cell.isFree()
  }
}
