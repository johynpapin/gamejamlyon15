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

      console.log(this.createdIngredients)

      for (let i = 0; i < this.createdIngredients.length; i++) {
        this.targetCells[i].ingredient = this.createdIngredients[i]
        this.targetCells[i].ingredient.x = this.createdIngredients.x
        this.targetCells[i].ingredient.y = this.createdIngredients.y
      }

      this.cell.ingredient.destroy()
      this.cell.ingredient = null
      this.createdIngredients = null

      this.reinit()
    } else if (this.cell.ingredient !== null) {
      this.tics--
    }
  }

  apply () {
    console.log('on apply')
    for (const [key, value] of this.transitions) {
      if (this.cell.ingredient.containsStates(key)) {
        for (const state of value) {
          const newIngredient = this.cell.ingredient.clone()
          newIngredient.addState(state)
          this.createdIngredients.push(newIngredient)
        }
        return
      } else {
        this.createdIngredients.push(new Waste())
      }
    }
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
    return this.cell.ingredient === null
  }
}
