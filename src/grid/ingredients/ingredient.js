import TileConnector from '../tiles/tile-connector'
import MovingTile from '../tiles/tile-moving'

export default class Ingredient {
  constructor (x, y, grid) {
    this.grid = grid
    this.xValue = x
    this.yValue = y
    this.x = x
    this.y = y
    this.hasMoved = false
    this.states = ['raw']
    this.spriteLoaded = false
    this.dragging = false
    this.draggingData = null
    this.deltas = 0
  }

  get x () {
    return this.xValue
  }

  set x (value) {
    if (this.lastX !== value) {
      this.deltas = 0
    }

    this.lastX = this.xValue

    if (!this.lastX) {
      this.lastX = 0
    }

    this.xValue = value
  }

  get y () {
    return this.yValue
  }

  set y (value) {
    if (this.lastY !== value) {
      this.deltas = 0
    }

    this.lastY = this.yValue

    if (!this.lastY) {
      this.lastY = 0
    }

    this.yValue = value
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
    this.states.push(state)
  }

  clone () {
    const newIngredient = new this.constructor(this.x, this.y, this.grid)
    newIngredient.states = [...this.states]
    return newIngredient
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
    if (this.grid.cells[this.x][this.y].tile instanceof MovingTile && this.grid.cells[this.x][this.y].tile.conveyorBelt) {
      this.sprite.alpha = 0.75
      this.draggingData = event.data
      this.dragging = true
    }
  }

  onDragEnd (event) {
    if (this.dragging) {
      const position = this.draggingData.getLocalPosition(this.sprite.parent)

      position.x = Math.floor(position.x / this.sprite.width)
      position.y = Math.floor(position.y / this.sprite.height)

      if (
        position.x >= 0 && position.x < this.grid.sizeX &&
        position.y >= 0 && position.y < this.grid.sizeY &&
        this.grid.isFree(position.x, position.y) &&
        this.grid.cells[position.x][position.y].tile instanceof TileConnector
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

  draw (delta) {
    this.deltas += delta

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

    const targetX = this.x * this.sprite.width + this.sprite.width / 2
    const targetY = this.y * this.sprite.height + this.sprite.height / 2

    const lastTargetX = this.lastX * this.sprite.width + this.sprite.width / 2
    const lastTargetY = this.lastY * this.sprite.height + this.sprite.height / 2

    if (this.deltas > 60) {
      this.sprite.x = targetX
      this.sprite.y = targetY
    } else {
      this.sprite.x = lastTargetX - ((lastTargetX - targetX) / 60) * this.deltas
      this.sprite.y = lastTargetY - ((lastTargetY - targetY) / 60) * this.deltas % 60
    }

    console.log(targetX, lastTargetX, this.sprite.x)
  }
}
