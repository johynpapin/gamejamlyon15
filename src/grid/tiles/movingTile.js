import Tile from './tile'

// N : 0
// E : 1
// S : 2
// W : 3

export default class movingTile extends Tile {
  constructor (x, y, entry, exit) {
    super(x, y)
    this.entry = entry
    this.exit = exit
  }
}
