import Grid from './grid'

class GridManager {
  constructor (gameManager) {
    this.grid = new Grid()
    this.gameManager = gameManager
  }

  draw (resources, offset) {
    this.grid.draw(resources, offset)
  }
}
