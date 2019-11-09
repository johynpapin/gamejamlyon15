import * as PIXI from 'pixi.js'

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
const images = []

// Load the images and run the `setup` function when it's done
PIXI.loader()
  .add(images)
  .load(setup)

// Setup the game
function setup () {
  app.ticker.add(delta => gameLoop(delta))
}

// The game loop
function gameLoop (delta) {

}
