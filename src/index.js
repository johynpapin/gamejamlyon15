import * as PIXI from 'pixi.js'
import './index.css'

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

// List of all the images
const resources = [{
  name: 'arrowDown',
  url: '/assets/Arrow_Down.png'
}, {
  name: 'arrowL',
  url: '/assets/Arrow_L.png'
}, {
  name: 'arrowR',
  url: '/assets/Arrow_R.png'
}, {
  name: 'arrowUp',
  url: '/assets/Arrow_Up.png'
}, {
  name: 'cold',
  url: '/assets/Cold_v1.png'
}, {
  name: 'econome',
  url: '/assets/Econome_v1.png'
}, {
  name: 'friteuse',
  url: '/assets/Friteuse_v1.png'
}, {
  name: 'marmite',
  url: '/assets/Marmite_v1.png'
}, {
  name: 'mixer',
  url: '/assets/Mixer_v1.png'
}, {
  name: 'orderAngleL',
  url: '/assets/Order_Angle_L.png'
}, {
  name: 'orderAngleR',
  url: '/assets/Order_Angle_R.png'
}, {
  name: 'mainTileNeutral',
  url: '/assets/Main_Tile_Neutral_v1.png'
}]

const loader = new PIXI.Loader()

// Load the images and run the `setup` function when it's done
loader
  .add(resources)
  .load(setup)

// Setup the game
function setup (loader, resources) {
  const orderAngleL = new PIXI.Sprite(resources.orderAngleL.texture)

  console.log(orderAngleL)

  orderAngleL.x = app.renderer.width / 2
  orderAngleL.y = app.renderer.height / 2

  app.stage.addChild(orderAngleL)

  app.ticker.add(delta => gameLoop(delta))
}

// The game loop
function gameLoop (delta) {
}
