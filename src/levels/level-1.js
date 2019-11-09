import Level from './level'
import * as tile from '../tile'

class Level1 extends Level {
  constructor () {
    super()
    this.initTile()
  }

  initTile () {
    this.tileMap.set({ x: 1, y: 0 }, new tile.TileCold())
    this.tileMap.set({ x: 1, y: 2 }, new tile.TileWarm())
  }
}
