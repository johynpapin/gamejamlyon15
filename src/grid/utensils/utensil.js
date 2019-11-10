class Utensil {
  constructor (x, y) {
    this.x = x
    this.y = y
    this.state = null
    this.hasOtherResult = false
    // map -> []: ''
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
        // create new ingredient waste
      }
    }
  }
}
