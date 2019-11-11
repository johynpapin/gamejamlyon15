import * as PIXI from 'pixi.js'
import Waste from './../ingredients/waste'

export default class Utensil {
  constructor (cell, targetCells) {
    this.cell = cell
    this.targetCells = targetCells
    this.createdIngredients = []
    this.totalTicks = 3
    this.reinit()
  }

  reinit () {
    this.ticks = this.totalTicks
  }

  next (grid) {
    if (this.ticks === 0 && this.targetsAreFree()) {
      this.apply(grid)

      for (let i = 0; i < this.createdIngredients.length; i++) {
        this.targetCells[i].ingredient = this.createdIngredients[i]
        this.targetCells[i].ingredient.x = this.targetCells[i].x
        this.targetCells[i].ingredient.y = this.targetCells[i].y
      }

      this.cell.ingredient.destroy()
      this.cell.ingredient = null
      this.createdIngredients = null

      this.reinit()
    } else if (this.cell.ingredient !== null) {
      this.ticks--
    }
  }

  apply (grid) {
    for (const [key, value] of this.transitions) {
      if (this.cell.ingredient.containsStates(key)) {
        for (const state of value) {
          const newIngredient = this.cell.ingredient.clone()
          newIngredient.addState(state)
          this.createdIngredients.push(newIngredient)
        }
        return
      }
    }
    this.createdIngredients.push(new Waste(this.cell.x, this.cell.y, grid))
  }

  targetsAreFree () {
    for (const cell of this.targetCells) {
      if (!cell.isFree()) {
        return false
      }
    }
    return true
  }

  isFree () {
    return this.cell.ingredient === null
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
