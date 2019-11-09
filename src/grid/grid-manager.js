import * as PIXI from 'pixi.js'
import Level1 from '../levels/level-1'

import Grid from './grid'

export default class GridManager {
  constructor (gameManager) {
    this.gameManager = gameManager
    this.grid = new Grid(new Level1())
  }

  spawnIngredient () {

  }

  next () {
    for (const ingredient of this.grid.ingredients) {

    }

    // Spawn new ingredient
    if (!this.grid.hasIngredient(this.grid.sizeX - 1, 0)) {
      this.spawnIngredient()
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
