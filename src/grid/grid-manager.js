import * as PIXI from 'pixi.js'
import Grid from './grid'
import MovingTile from './tiles/tile-moving'
import GridContainer from './grid-container'

export default class GridManager {
  constructor (gameManager) {
    this.gameManager = gameManager
    this.grid = new Grid(gameManager.level)
    this.ticks = 0
  }

  resolve (dict, tile) {
    const blockingTiles = tile.apply(this.grid, this.ticks)
    const dictKey = tile.x + '-' + tile.y

    if (blockingTiles === null) {
      if (dictKey in dict) {
        const tmp = dict[dictKey]
        delete dict[dictKey]
        this.resolve(dict, tmp)
      }
    } else {
      for (const blockingTile of blockingTiles) {
        dict[blockingTile.x + '-' + blockingTile.y] = tile
      }
    }
  }

  applyTiles () {
    const dict = {}

    for (let x = 0; x < this.grid.sizeX; x++) {
      for (let y = 0; y < this.grid.sizeY; y++) {
        if (this.grid.cells[x][y].tile.apply) {
          this.resolve(dict, this.grid.cells[x][y].tile)
        }
      }
    }
  }

  spawnIngredient () {
    const possibilies = this.grid.possibilies
    const newIngredient = new possibilies[Math.floor(Math.random() * possibilies.length)](this.grid.sizeX - 1, 0, this.grid)

    this.grid.cells[newIngredient.x][newIngredient.y].ingredient = newIngredient
  }

  next () {
    this.applyTiles()

    // Spawn new ingredient
    if (!this.grid.hasIngredient(this.grid.sizeX - 1, 0)) {
      this.spawnIngredient()
    }

    this.ticks++
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
    if (!(currentCell.tile instanceof MovingTile) || this.grid.isFullUtensil(currentCell.tile.targetX, currentCell.tile.targetY)) {
      while (stack.length > 0) {
        currentCell = stack.pop()
        currentCell.ingredient.hasMoved = true
      }
    } else {
      while (stack.length > 0) {
        currentCell = stack.pop()
        this.grid.cells[currentCell.tile.targetX][currentCell.tile.targetY].ingredient = currentCell.ingredient
        this.grid.cells[currentCell.tile.targetX][currentCell.tile.targetY].ingredient.x = currentCell.tile.targetX
        this.grid.cells[currentCell.tile.targetX][currentCell.tile.targetY].ingredient.y = currentCell.tile.targetY
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
      this.container = new GridContainer()

      this.container.scale.x = 4
      this.container.scale.y = 4

      stage.addChild(this.container)
    }

    this.container.x = window.innerWidth / 2 - this.container.width / 2
    this.container.y = window.innerHeight / 2 - this.container.height / 2

    this.grid.draw(this.container, resources, { x: 0, y: 0 })
  }
}
