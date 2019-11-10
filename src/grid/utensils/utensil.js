import Waste from './../ingredients/waste'

export default class Utensil {
  constructor (cell, targetCell) {
    this.cell = cell
    this.targetCell = targetCell
    this.state = null
    // map -> [key_0, ..., key_n]: 'value'
    this.transitions = this.createTransitions()
    this.reinit()
  }

  reinit () {
    this.tics = 3
  }

  next () {
    if (this.tics === 0 && this.targetCell.isFree()) {
      this.apply()
      this.targetCell.ingredient = this.cell.ingredient
      this.targetCell.ingredient.x = this.targetCell.x
      this.targetCell.ingredient.y = this.targetCell.y
      this.cell.ingredient = null
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
      } else {
        this.cell.ingredient.destroy()
        this.cell.ingredient = new Waste()
      }
    }
  }

  isFree () {
    return this.cell.isFree()
  }
}
