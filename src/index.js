import * as PIXI from 'pixi.js'
import './index.css'
import { Howl } from 'howler'

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
  url: '/assets/texture_package/Econome_Top_Down.json'
}, {
  name: 'fryer',
  url: '/assets/texture_package/Friteuse_Top_Down.json'
}, {
  name: 'knife',
  url: '/assets/texture_package/Couteau_Top_Down.png'
}, {
  name: 'pot',
  url: '/assets/Marmite_v1.png'
}, {
  name: 'arrowLeft',
  url: '/assets/texture_package/Directionnal_Tile_v1-Sheet.json'
}, {
  name: 'rollLeft',
  url: '/assets/texture_package/Roll_left_v1-Sheet.json'
}, {
  name: 'rollTurn',
  url: '/assets/texture_package/Roll_Turn_v2-Sheet.json'
}, {
  name: 'launcher',
  url: '/assets/texture_package/Sp_Launcher_v1-Sheet.json'
}, {
  name: 'output',
  url: '/assets/texture_package/Assiette_v1-Sheet.json'
}, {
  name: 'background',
  url: '/assets/texture_package/Background.json'
}, {
  name: 'trash',
  url: '/assets/texture_package/Trashbin_v1-Sheet.json'
}, {
  name: 'waste',
  url: '/assets/Space_Caca.png'
}]

const loader = new PIXI.Loader()

// Load the images and run the `setup` function when it's done
loader
  .add(resources)
  .load(setup)

const mainContainer = new PIXI.Container()

// Setup the game
function setup (loader, resources) {
  const background = new PIXI.AnimatedSprite(resources.background.spritesheet.animations['Background_v1-Sheet'])

  background.alpha = 0.1

  background.animationSpeed = 0.025
  background.play()

  mainContainer.addChild(background)

  gameManager.draw(0, mainContainer, resources)

  app.stage.addChild(mainContainer)

  app.ticker.add(delta => drawLoop(resources, delta))

  setInterval(gameLoop, 1000)
}

function drawLoop (resources, delta) {
  gameManager.draw(delta, app.stage, resources)
}

// The game loop
function gameLoop () {
  gameManager.next()
}

function scaleScene () {
  let w = window.innerWidth
  let h = window.innerWidth / ratio

  if (window.innerWidth / window.innerHeight >= ratio) {
    w = window.innerHeight * ratio
    h = window.innerHeight
  }

  mainContainer.scale.x = w / 640
  mainContainer.scale.y = h / 480
  app.renderer.resize(w, h)
}

scaleScene()

window.addEventListener('resize', scaleScene)

// Audio

const sound = new Howl({
  src: ['/assets/sky-factory-zone-Music/sky-factory-zone.mp3'],
  loop: true
})

sound.play()
