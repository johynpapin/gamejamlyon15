export default class Level {
  constructor () {
    this.tileMap = new Map()
  }

  add (coord, tile) {
    this.tileMap.set(coord, tile)
  }
}
