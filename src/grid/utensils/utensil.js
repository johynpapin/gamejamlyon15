import Waste from './../ingredients/waste'

export default class Utensil {
  constructor (cell, targetCells) {
    this.cell = cell
    this.targetCells = targetCells
    this.createdIngredients = []
    this.reinit()
  }

  reinit () {
    this.tics = 3
  }

  next () {
    if (this.tics === 0 && this.targetsAreFree()) {
      this.apply()

      for (let i = 0; i < this.createdIngredients.length; i++) {
        this.targetCells[i].ingredient = this.createdIngredients[i]
        this.targetCells[i].ingredient.x = this.createdIngredients.x
        this.targetCells[i].ingredient.y = this.createdIngredients.y
      }

      this.cell.ingredient = null
      this.createdIngredients = null

      this.reinit()
    } else if (this.cell.ingredient != null) {
      this.tics--
    }
  }

  apply () {
    for (const states of this.transitions) {
      if (this.cell.ingredient.containsStates(states)) {
        for (const state of this.states) {
          const newIngredient = this.cell.ingredient.clone()
          newIngredient.addState(state)
          this.createdIngredients.push(newIngredient)
        }
      } else {
        this.createdIngredients.push(new Waste())
      }
    }
    this.cell.ingredient.destroy()
  }

  targetsAreFree () {
    for (const cell of this.targetCells) {
      if (!cell.isFree()) {
        return false
      }
    }
    return true
  }

  isFree () {
    return this.cell.isFree()
  }
}
