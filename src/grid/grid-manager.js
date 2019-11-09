import * as PIXI from 'pixijs'

import Grid from './grid'

class GridManager {
  constructor (gameManager) {
    this.grid = new Grid()
    this.gameManager = gameManager
  }

  draw (stage, resources) {
    if (!this.container) {
      this.container = new PIXI.Container()
      this.stage.addChid(this.container)
    }

    this.grid.draw(this.container, resources, { x: 0, y: 0 })
  }
}
