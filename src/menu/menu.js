import Button from './button'
import * as PIXI from 'pixi.js'

export default class Menu {
  constructor (gameManager) {
    this.gameManager = gameManager

    this.pauseButton = new Button({
      label: 'Pause',
      width: 64,
      height: 32,
      fontSize: 14,
      onTap: () => {
        this.gameManager.paused = !this.gameManager.paused
        this.pauseButton.update({
          label: this.gameManager.paused ? 'Play' : 'Pause'
        })
      }
    })

    this.movingTile = new Button({
      label: 'Add a moving tile',
      width: 128,
      height: 32,
      fontSize: 14,
      onTap: () => {
        this.gameManager.gridManager.addMovingTile()
      }
    })

    this.movingTile.y = 50
  }

  draw (container, resources) {
    if (!this.container) {
      this.container = new PIXI.Container()

      this.container.addChild(this.pauseButton)

      this.container.addChild(this.movingTile)

      container.addChild(this.container)
    }

    this.container.x = 640 - this.container.width
    this.container.y = 25
  }
}
