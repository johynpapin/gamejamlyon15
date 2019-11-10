export default class Ingredient {
  constructor (x, y, grid) {
    this.grid = grid
    this.x = x
    this.y = y
    this.hasMoved = false
    this.states = []
    this.spriteLoaded = false
    this.dragging = false
    this.draggingData = null
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

  clone () {
    return { ...this, states: [...this.states] }
  }

  destroy () {
    if (this.sprite) {
      // TODO: bad
      this.sprite.visible = false
    }
  }

  initDrag () {
    this.sprite.interactive = true

    this.sprite.notInBounds = true

    this.sprite
      .on('mousedown', this.onDragStart.bind(this))
      .on('touchstart', this.onDragStart.bind(this))

    // events for drag end
      .on('mouseup', this.onDragEnd.bind(this))
      .on('mouseupoutside', this.onDragEnd.bind(this))
      .on('touchend', this.onDragEnd.bind(this))
      .on('touchendoutside', this.onDragEnd.bind(this))

    // events for drag move
      .on('mousemove', this.onDragMove.bind(this))
      .on('touchmove', this.onDragMove.bind(this))
  }

  onDragStart (event) {
    this.sprite.alpha = 0.75
    this.draggingData = event.data
    this.dragging = true
  }

  onDragEnd (event) {
    if (this.dragging) {
      const position = this.draggingData.getLocalPosition(this.sprite.parent)

      position.x = Math.floor(position.x / this.sprite.width)
      position.y = Math.floor(position.y / this.sprite.height)

      if (
        position.x >= 0 && position.x < this.grid.sizeX &&
        position.y >= 0 && position.y < this.grid.sizeY &&
        this.grid.isFree(position.x, position.y)
      ) {
        this.grid.cells[this.x][this.y].ingredient = null
        this.x = position.x
        this.y = position.y
        this.grid.cells[position.x][position.y].ingredient = this
      }

      this.sprite.alpha = 1
      this.dragging = false
    }
  }

  onDragMove () {
  }

  draw () {
    if (!this.spriteLoaded) {
      this.spriteLoaded = true
      this.sprite.zIndex = 2
      this.initDrag()
    }

    if (this.dragging) {
      const newPosition = this.draggingData.getLocalPosition(this.sprite.parent)

      this.sprite.x = newPosition.x
      this.sprite.y = newPosition.y
      return
    }

    this.sprite.x = this.x * this.sprite.width + this.sprite.width / 2
    this.sprite.y = this.y * this.sprite.height + this.sprite.height / 2
  }
}
