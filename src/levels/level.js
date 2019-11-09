export default class Level {
  constructor () {
    this.tileMap = new Map()
    this.ingredients = []
  }

  add (coord, tile) {
    this.tileMap.set(coord, tile)
  }
}
