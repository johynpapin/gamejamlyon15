import * as PIXI from 'pixi.js'
import Grid from './grid'
import MovingTile from './tiles/tile-moving'
import TileNeutral from './tiles/tile-neutral'
import GridContainer from './grid-container'

export default class GridManager {
  constructor (gameManager) {
    this.gameManager = gameManager
    this.grid = new Grid(this, gameManager.level)
    this.ticks = 0
    this.addingMovingTile = false
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

  nextUtensils () {
    for (let x = 0; x < this.grid.sizeX; x++) {
      for (let y = 0; y < this.grid.sizeY; y++) {
        if (this.grid.cells[x][y].utensil != null) {
          this.grid.cells[x][y].utensil.next()
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

    this.nextUtensils()

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

  addMovingTile () {
    this.addingMovingTile = true
  }

  handlePointerDown (event) {
    if (!this.addingMovingTile) {
      return
    }

    this.addingMovingTile = false

    const position = event.data.getLocalPosition(this.container)

    position.x = Math.floor(position.x / 32)
    position.y = Math.floor(position.y / 32)

    if (
      position.x >= 0 && position.x < this.grid.sizeX &&
        position.y >= 0 && position.y < this.grid.sizeY
    ) {
      const cell = this.grid.cells[position.x][position.y]
      if (cell.tile instanceof TileNeutral && cell.utensil === null) {
        cell.tile.destroy()

        cell.tile = new MovingTile(position.x, position.y, {
          x: position.x - 1,
          y: position.y
        })
      }
    }
  }

  draw (container, resources) {
    if (!this.container) {
      this.container = new GridContainer(this)
      this.container.scale.set(1.5)
      this.container.sortableChildren = true

      this.trash = new PIXI.AnimatedSprite(resources.trash.spritesheet.animations['Trashbin_v1-Sheet'])
      this.trash.scale.set(1.5)
      this.trash.animationSpeed = 0.1
      this.trash.play()

      container.addChild(this.container)
      container.addChild(this.trash)
    }

    this.container.x = 640 / 2 - this.container.width / 2
    this.container.y = 480 / 2 - this.container.height / 2

    this.trash.x = this.container.x - this.trash.width
    this.trash.y = this.container.y + this.container.height - this.trash.height

    this.grid.draw(this.container, resources)
  }
}
