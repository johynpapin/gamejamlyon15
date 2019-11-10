import Level from './level'
import Potato from '../ingredients/potato'
import TileCold from '../grid/tiles/tile-cold'
import TileWarm from '../grid/tiles/tile-warm'

export default class Level1 extends Level {
  constructor () {
    super()
    this.sizeX = 3
    this.sizeY = 3
    this.maxOrders = 6
    this.initTile()
    this.initIngredients()
  }

  // 3 x 3 grid
  initTile () {
    const errorMsg = 'tile out of grid boundaries'
    const key1 = { x: 1, y: 0 }
    console.assert(key1.x < this.sizeX && key1.y < this.sizeY, { key: key1, sizeX: this.sizeX, sizeY: this.sizeY, err: errorMsg })
    this.tileMap.set(key1, new TileCold(key1.x, key1.y))
    const key2 = { x: 1, y: 2 }
    console.assert(key2.x < this.sizeX && key2.y < this.sizeY, { key: key2, sizeX: this.sizeX, sizeY: this.sizeY, err: errorMsg })
    this.tileMap.set(key2, new TileWarm(key2.x, key2.y))
  }

  // possibles ingredients for this level
  initIngredients () {
    this.ingredients.push(Potato)
  }
}
