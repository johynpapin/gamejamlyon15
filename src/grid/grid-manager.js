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
    this.rotatingMovingTile = false
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
          this.grid.cells[x][y].utensil.next(this.grid)
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
    if (!this.grid.hasIngredient(this.grid.sizeX - 1, 0) && (Math.random() < 0.2)) {
      this.spawnIngredient()
    }

    this.ticks++
  }

  addMovingTile () {
    this.gameManager.paused = true
    this.addingMovingTile = true
  }

  rotateMovingTile () {
    this.gameManager.paused = true
    this.rotatingMovingTile = true
  }

  _rotateMovingTile (position) {
    const cell = this.grid.cells[position.x][position.y]

    if (cell.tile instanceof MovingTile && !cell.tile.conveyorBelt) {
      if (cell.tile.targetX < cell.tile.x) {
        cell.tile.targetX = cell.tile.x
        cell.tile.targetY = cell.tile.y - 1
      } else if (cell.tile.targetX > cell.tile.x) {
        cell.tile.targetX = cell.tile.x
        cell.tile.targetY = cell.tile.y + 1
      } else if (cell.tile.targetY < cell.tile.y) {
        cell.tile.targetX = cell.tile.x + 1
        cell.tile.targetY = cell.tile.y
      } else {
        cell.tile.targetX = cell.tile.x - 1
        cell.tile.targetY = cell.tile.y
      }
    }

    this.gameManager.paused = false
  }

  handlePointerDown (event) {
    const position = event.data.getLocalPosition(this.container)

    position.x = Math.floor(position.x / 32)
    position.y = Math.floor(position.y / 32)

    if (
      position.x >= 0 && position.x < this.grid.sizeX &&
        position.y >= 0 && position.y < this.grid.sizeY
    ) {
      if (this.rotatingMovingTile) {
        this.rotatingMovingTile = false

        this._rotateMovingTile(position)
        return
      }

      if (this.addingMovingTile) {
        this.addingMovingTile = false

        const cell = this.grid.cells[position.x][position.y]
        if (cell.tile instanceof TileNeutral && cell.utensil === null) {
          cell.tile.destroy()

          cell.tile = new MovingTile(position.x, position.y, {
            x: position.x - 1,
            y: position.y
          })
        }

        this.gameManager.paused = false
      }
    }
  }

  draw (delta, container, resources) {
    if (!this.container) {
      this.container = new GridContainer(this)
      this.container.scale.set(1.5)
      this.container.sortableChildren = true

      this.trash = new PIXI.AnimatedSprite(resources.trash.spritesheet.animations['Trashbin_v1-Sheet'])
      this.trash.scale.set(1.5)
      this.trash.animationSpeed = 0.1
      this.trash.play()

      this.output = new PIXI.AnimatedSprite(resources.output.spritesheet.animations['Assiette_v1-Sheet'])
      this.output.scale.set(1.5)
      this.output.animationSpeed = 0.1
      this.output.angle = 180
      this.output.pivot.x = this.output.width
      this.output.pivot.y = this.output.height
      this.output.play()

      container.addChild(this.container)
      container.addChild(this.trash)
      container.addChild(this.output)
    }

    this.container.x = 640 / 2 - this.container.width / 2
    this.container.y = 480 / 2 - this.container.height / 2

    this.trash.x = this.container.x - this.trash.width
    this.trash.y = this.container.y + this.container.height - this.trash.height

    this.output.x = this.container.x - this.output.width - this.output.width / 2
    this.output.y = this.container.y + this.container.height - this.output.height * 3 - this.output.height / 2

    this.grid.draw(delta, this.container, resources)
  }
}
