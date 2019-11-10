class Utensil {
  constructor (x, y) {
    this.x = x
    this.y = y
    this.state = null
    this.hasOtherResult = false
    this.transitions = new Map()
  }

  apply (ingredient) {
    // // TODO: test with transitions table
    ingredient.addState(this.state)

    if (this.hasOtherResult) {
      this.produce()
    }
  }
}
