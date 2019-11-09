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
      stage.addChild(this.container)
    }

    this.grid.draw(this.container, resources, { x: 0, y: 0 })
  }
}
