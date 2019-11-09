import * as PIXI from 'pixi.js'
import './index.css'

import GameManager from './game/game-manager'

let type = 'WebGL'

if (!PIXI.utils.isWebGLSupported()) {
  type = 'canvas'
}

PIXI.utils.sayHello(type)

const app = new PIXI.Application()

// Make the game fill the window
app.renderer.view.style.position = 'absolute'
app.renderer.view.style.display = 'block'
app.renderer.autoResize = true
app.renderer.resize(window.innerWidth, window.innerHeight)

document.body.appendChild(app.view)

const gameManager = new GameManager()

// List of all the images
const resources = [{
  name: 'coldTile',
  url: '/assets/Cold_v1.png'
}, {
  name: 'warmTile',
  url: '/assets/Warm_v1.png'
}, {
  name: 'mainTileNeutral',
  url: '/assets/Main_Tile_Neutral_v1.png'
}, {
  name: 'potato',
  url: '/assets/Patate_v1.png'
}, {
  name: 'background',
  url: '/assets/Background_v1_640_480.png'
}]

const loader = new PIXI.Loader()

// Load the images and run the `setup` function when it's done
loader
  .add(resources)
  .load(setup)

// Setup the game
function setup (loader, resources) {
  const background = new PIXI.Sprite(resources.background.texture)

  background.x = 0
  background.y = 0
  background.width = window.innerWidth
  background.height = window.innerHeight

  app.stage.addChild(background)

  gameManager.draw(app.stage, resources)

  app.ticker.add(delta => gameLoop(resources, delta))
}

// The game loop
function gameLoop (resources, delta) {
  gameManager.next()
  gameManager.draw(app.stage, resources)
}
