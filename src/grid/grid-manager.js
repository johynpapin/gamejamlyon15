import * as PIXI from 'pixijs'
import Level1 from '../levels/level-1'

import Grid from './grid'

class GridManager {
  constructor (gameManager) {
    this.gameManager = gameManager
    this.grid = new Grid(new Level1())
  }

  draw (stage, resources) {
    if (!this.container) {
      this.container = new PIXI.Container()
      this.stage.addChid(this.container)
    }

    this.grid.draw(this.container, resources, { x: 0, y: 0 })
  }
}
