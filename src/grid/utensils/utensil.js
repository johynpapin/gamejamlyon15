import * as PIXI from 'pixi.js'
import Waste from './../ingredients/waste'

export default class Utensil {
  constructor (cell, targetCell, targetOpt) {
    this.cell = cell
    this.targetCell = targetCell
    this.targetOpt = targetOpt
    this.state = null
    this.hasOtherResult = false
    // map -> [key_0, ..., key_n]: 'value'
    this.transitions = this.createTransitions()
    this.totalTicks = 3
    this.reinit()
  }

  reinit () {
    this.ticks = this.totalTicks
  }

  next () {
    if (this.ticks === 0) {
      if ((this.targetOpt == null && this.targetCell.isFree()) || (this.targetOpt != null && this.targetCell.isFree() && this.targetOpt.isFree())) {
        this.targetCell.ingredient = this.cell.ingredient
        this.targetCell.ingredient.x = this.targetCell.x
        this.targetCell.ingredient.y = this.targetCell.y
        this.cell.ingredient = null
        this.reinit()
      }
    } else if (this.cell.ingredient != null) {
      this.ticks--
    }
  }

  apply (ingredient) {
    for (const [key, value] of this.transitions) {
      if (ingredient.containsStates(key)) {
        ingredient.addState(value)
        if (this.hasOtherResult) {
          this.produce()
        }
      } else {
        ingredient.destroy()
        this.cell.ingredient = new Waste()
      }
    }
  }

  isFree () {
    return this.cell.isFree()
  }

  drawLoadingBar (container, x, y) {
    const width = 20

    if (!this.loadingBar) {
      this.loadingBar = new PIXI.Graphics()

      this.loadingBar.zIndex = 5

      container.addChild(this.loadingBar)
    }

    this.loadingBar.clear()

    const value = width * ((this.totalTicks - this.ticks) / this.totalTicks)

    this.loadingBar.lineStyle(2, 0x00ff00)
      .moveTo((32 - width) / 2, 0)
      .lineTo((32 - width) / 2 + value, 0)

    this.loadingBar.position.set(x, y + 26)
  }
}
