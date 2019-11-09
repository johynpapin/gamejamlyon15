class Utensil {
  constructor (x, y) {
    this.x = x
    this.y = y
    this.state = null
    this.hasOtherResult = false
  }

  use (ingredient) {
    ingredient.addState(this.state)

    if (this.hasOtherResult) {
      this.produce()
    }
  }
}
