export default class Ingredient {
  constructor (x, y) {
    this.x = x
    this.y = y
    this.hasMoved = false
    this.states = []
  }

  containsStates (requiredStates) {
    for (const state of requiredStates) {
      if (!this.states.includes(state)) {
        return false
      }
    }
    return true
  }

  addState (state) {
    this.state.push(state)
  }

  destroy () {
    if (this.sprite) {
      // TODO: bad
      this.sprite.visible = false
    }
  }
}
