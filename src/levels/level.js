class Level {
  constructor (sizeX, sizeY) {
    this.sizeX = sizeX
    this.sizeY = sizeY
    this.tileMap = new Map()
  }

  add (coord, tile) {
    this.tileMap.set(coord, tile)
  }
}
