import * as PIXI from 'pixi.js'
import Level1 from '../levels/level-1'

import Grid from './grid'

export default class GridManager {
  constructor (gameManager) {
    this.gameManager = gameManager
    this.grid = new Grid(new Level1())
  }

  draw (stage, resources) {
    if (!this.container) {
      this.container = new PIXI.Container()
      stage.addChild(this.container)
    }

    this.grid.draw(this.container, resources, { x: 0, y: 0 })
  }

  next () {

  }
}
