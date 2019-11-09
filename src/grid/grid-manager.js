import * as PIXI from 'pixi.js'
import Level1 from '../levels/level-1'

import Grid from './grid'

import MovingTile from './tiles/moving-tile'

export default class GridManager {
  constructor (gameManager) {
    this.gameManager = gameManager
    this.grid = new Grid(gameManager.level)
  }

  spawnIngredient () {
    const possibilies = this.grid.possibilies()
    this.grid.ingredients.push(new possibilies[Math.floor(Math.random() * possibilies.length)](this.grid.sizeX - 1, 0))
  }

  next () {
    this.checkConnectors()

    for (const ingredient of this.grid.ingredients) {
      const cell = this.grid.cells[ingredient.x][ingredient.y]
      if (cell.tile.targetX < 0) {
        this.grid.cells[ingredient.x][ingredient.y].ingredient = null
        continue
      }
      if (cell.tile instanceof MovingTile) {
        if (this.grid.isFree(cell.tile.targetX, cell.tile.targetY)) {
          this.grid.cells[ingredient.x][ingredient.y].ingredient = null
          ingredient.x = cell.tile.targetX
          ingredient.y = cell.tile.targetY
          this.grid.cells[ingredient.x][ingredient.y].ingredient = ingredient
          ingredient.hasMoved = true
          // TODO IF FREEUSTENSIL
        } else if (this.grid.hasIngredient(cell.tile.targetX, cell.tile.targetY)) {
          this.chainIngredient(cell)
        }
      }
    }

    // Spawn new ingredient
    if (!this.grid.hasIngredient(this.grid.sizeX - 1, 0)) {
      this.spawnIngredient()
    }
  }

  checkConnectors () {
    for (let y = 0; y < this.grid.sizeY - 1; y++) {
      const movingCell = this.grid.cells[this.grid.sizeX - 1][y]
      const connectorCell = this.grid.cells[this.grid.sizeX - 2][y]

      if (connectorCell.tile.connected) {
        console.log('connected')
        movingCell.tile.targetX = connectorCell.x
        movingCell.tile.targetY = connectorCell.y
      } else {
        movingCell.tile.targetX = movingCell.tile.x
        movingCell.tile.targetY = movingCell.tile.y + 1
      }
    }
  }

  chainIngredient (cell) {
    const cycle = false
    const cycleCell = cell
    let currentCell = cell
    const stack = []

    while ((currentCell.tile instanceof MovingTile) && !this.grid.isFullUtensil(currentCell.tile.targetX, currentCell.tile.targetY) && !this.grid.isFree(currentCell.tile.targetX, currentCell.tile.targetY)) {
      stack.push(currentCell)
      currentCell = this.grid.cells[currentCell.tile.targetX][currentCell.tile.targetY]
    }
    if (this.grid.isFullUtensil(currentCell.tile.targetX, currentCell.tile.targetY) || !(currentCell.tile instanceof MovingTile)) {
      while (stack.length > 0) {
        currentCell = stack.pop()
        this.grid.cells[currentCell.ingredient.x][currentCell.ingredient.y].ingredient.hasMoved = true
      }
    } else {
      while (stack.length > 0) {
        currentCell = stack.pop()
        this.grid.cells[currentCell.tile.targetX][currentCell.targetY].ingredient = currentCell.ingredient
        this.grid.cells[currentCell.tile.targetX][currentCell.targetY].ingredient.x = currentCell.tile.targetX
        this.grid.cells[currentCell.tile.targetX][currentCell.targetY].ingredient.y = currentCell.tile.targetY
        this.grid.cells[currentCell.tile.targetX][currentCell.tile.targetY].ingredient.hasMoved = true
      }
      if (cycle) {
        this.grid.cells[cycleCell.tile.targetX][cycleCell.tile.targetY].ingredient = cycleCell.ingredient
      } else {
        this.grid.cells[cycleCell.ingredient.x][cycleCell.ingredient.y].ingredient = null
      }
    }
  }

  draw (stage, resources) {
    if (!this.container) {
      this.container = new PIXI.Container()

      this.container.scale.x = 4
      this.container.scale.y = 4

      stage.addChild(this.container)
    }

    this.container.x = window.innerWidth / 2 - this.container.width / 2
    this.container.y = window.innerHeight / 2 - this.container.height / 2

    this.grid.draw(this.container, resources, { x: 0, y: 0 })
  }
}
