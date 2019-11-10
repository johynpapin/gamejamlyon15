import Waste from './../ingredients/waste'

export default class Utensil {
  constructor (cell) {
    this.cell = cell
    console.log(this.cell)
    this.state = null
    this.hasOtherResult = false
    // map -> [key_0, ..., key_n]: 'value'
    this.transitions = this.createTransitions()
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
    return this.cell.ingredient == null
  }
}
