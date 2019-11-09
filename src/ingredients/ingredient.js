export default class Ingredient {
  constructor (x, y) {
    this.x = x
    this.y = y
    this.states = []
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
