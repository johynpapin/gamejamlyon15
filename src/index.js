import * as PIXI from 'pixi.js'
import './index.css'

import GameManager from './game/game-manager'

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

let type = 'WebGL'

if (!PIXI.utils.isWebGLSupported()) {
  type = 'canvas'
}

PIXI.utils.sayHello(type)

const app = new PIXI.Application({
  antialias: false,
  width: 640,
  height: 480
})

const ratio = 640 / 480

// Make the game fill the window
// app.renderer.backgroundColor = 0xadff4d
app.renderer.backgroundColor = 0x332222
app.renderer.view.style.position = 'absolute'
app.renderer.view.style.display = 'block'

document.body.appendChild(app.view)

const gameManager = new GameManager()

// List of all the images
const resources = [{
  name: 'mainTileNeutral',
  url: '/assets/texture_package/Main_Tile_Neutral_v2-Sheet.json'
}, {
  name: 'potato',
  url: '/assets/Patate_v1.png'
}, {
  name: 'peeler',
  url: '/assets/Econome_Top_Down_v1.png'
}, {
  name: 'fryer',
  url: '/assets/Friteuse_Top_Down_v1.png'
}, {
  name: 'knife',
  url: '/assets/Couteau_v1.png'
}, {
  name: 'pot',
  url: '/assets/Marmite_v1.png'
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
  name: 'rollLeft',
  url: '/assets/texture_package/Roll_left_v1-Sheet.json'
}, {
  name: 'rollDown',
  url: '/assets/Roll_Basic_v1.png'
}, {
  name: 'rollTurn',
  url: '/assets/texture_package/Roll_Turn_v2-Sheet.json'
}, {
  name: 'launcher',
  url: '/assets/texture_package/Sp_Launcher_v1-Sheet.json'
}, {
  name: 'background',
  url: '/assets/texture_package/Background.json'
}, {
  name: 'trash',
  url: '/assets/texture_package/Trashbin_v1-Sheet.json'
}]

const loader = new PIXI.Loader()

// Load the images and run the `setup` function when it's done
loader
  .add(resources)
  .load(setup)

// Setup the game
function setup (loader, resources) {
  const background = new PIXI.AnimatedSprite(resources.background.spritesheet.animations['Background_v1-Sheet'])

  background.height = window.innerHeight
  background.width = window.innerWidth
  background.alpha = 0.1

  background.animationSpeed = 0.025
  background.play()

  app.stage.addChild(background)

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

function scaleScene () {
  let w = window.innerWidth
  let h = window.innerWidth / ratio

  if (window.innerWidth / window.innerHeight >= ratio) {
    w = window.innerHeight * ratio
    h = window.innerHeight
  }

  app.stage.scale.set(window.innerWidth / w)
  app.renderer.resize(w, h)
}

// scaleScene()
