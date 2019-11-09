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
app.renderer.backgroundColor = 0xadff4d
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
  url: '/assets/bp0.png'
}, {
  name: 'arrowTop',
  url: '/assets/Arrow_Up.png'
}, {
  name: 'arrowRight',
  url: '/assets/Arrow_R.png'
}, {
  name: 'arrowDown',
  url: '/assets/Arrow_Down.png'
}, {
  name: 'arrowLeft',
  url: '/assets/Arrow_L.png'
}, {
  name: 'rollDown',
  url: '/assets/Roll_Basic_v1.png'
}, {
  name: 'rollLeft',
  url: '/assets/Roll_Horizontal_v1.png'
}]

const loader = new PIXI.Loader()

// Load the images and run the `setup` function when it's done
loader
  .add(resources)
  .load(setup)

// Setup the game
function setup (loader, resources) {
  gameManager.draw(app.stage, resources)

  app.ticker.add(delta => drawLoop(resources, delta))

  setInterval(gameLoop, 1000)
}

function drawLoop (resources, delta) {
  gameManager.draw(app.stage, resources)
}

// The game loop
function gameLoop (resources, delta) {
  gameManager.next()
}
