import Tile from './tile'

// N : 0
// E : 1
// S : 2
// W : 3

export default class MovingTile extends Tile {
  constructor (x, y, nextCell) {
    super(x, y)
    this.targetX = nextCell.x
    this.targetY = nextCell.y
  }
}
