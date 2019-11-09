import MovingTile from './moving-tile'

class TileConnector extends MovingTile {
  constructor (x, y, nextCell) {
    super(x, y, nextCell)
    this.connected = false
  }

  switchConnect () {
    this.connect = !this.connected
  }
}
