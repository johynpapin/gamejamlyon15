import * as PIXI from 'pixi.js'

export default class GridContainer extends PIXI.Container {
  calculateBounds () {
    this._bounds.clear()
    this._calculateBounds()

    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i]
      if (!child.visible || !child.renderable || child.notInBounds) {
        continue
      }

      child.calculateBounds()

      if (child._mask) {
        const maskObject = child._mask.maskObject || child._mask
        maskObject.calculateBounds()
        this._bounds.addBoundsMask(child._bounds, maskObject._bounds)
      } else if (child.filterArea) {
        this._bounds.addBoundsArea(child._bounds, child.filterArea)
      } else {
        this._bounds.addBounds(child._bounds)
      }
    }

    this._lastBoundsID = this._boundsID
  }
}
