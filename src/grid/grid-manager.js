import Grid from './grid'

class GridManager {
  constructor () {
    this.grid = new Grid()
  }

  draw (resources, offset) {
    this.grid.draw(resources, offset)
  }
}
