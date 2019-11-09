import * as PIXI from 'pixi.js'
import Level1 from '../levels/level-1'

import Grid from './grid'

import MovingTile from '../ingredient/tiles/moving-tile'

export default class GridManager {
  constructor (gameManager) {
    this.gameManager = gameManager
    this.grid = new Grid(new Level1())
  }

  spawnIngredient () {

  }

  next () {
    for (const ingredient of this.grid.ingredients) {
      const cell = this.grid.cells[ingredient.x][ingredient.y]
      if (cell.tile instanceof MovingTile) {
        if (this.grid.isFree(cell.tile.targetX, cell.tile.targetY)) {
          ingredient.x = cell.tile.targetX
          ingredient.y = cell.tile.targetY
          ingredient.hasMoved = true
          // TODO IF FREEUSTENSIL
        } else if (this.grid.hasIngredient(cell.tile.targetX, cell.tile.targetY)) {

        }
      }
    }

    // Spawn new ingredient
    if (!this.grid.hasIngredient(this.grid.sizeX - 1, 0)) {
      this.spawnIngredient()
    }
  }

  chainIngredient(cell) {
    let cycle_cell = cell
    let current_cell = cell
    let stack = []

    while(!this.grid.isFullUtensil(current_cell.tile.targetX, current_cell.tile.targetY) && !this.grid.isFree(current_cell.tile.targetX, current_cell.tile.targetY)) {
      stack.push(current_cell)
      current_cell = this.grid.cell[targetX][targetY]
    }
    if (this.grid
  }

  draw (stage, resources) {
    if (!this.container) {
      this.container = new PIXI.Container()
      stage.addChild(this.container)
    }

    this.grid.draw(this.container, resources, { x: 0, y: 0 })
  }
}
