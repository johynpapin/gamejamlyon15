import Fryer from './fryer'
import Knife from './knife'
import Peeler from './peeler'
import Pot from './pot'

export default {
  knife: {
    class: Knife,
    // 'cut'
    transitions: new Map()
  },
  peeler: {
    class: Peeler,
    transitions: new Map(
      [
        [['raw'], ['peel', 'peeling']],
        [['cut'], ['peel', 'peeling']],
        [['cooked'], ['peel', 'peeling']]
      ]
    )
  },
  pot: {
    class: Pot,
    // 'cooked'
    transitions: new Map()
  },
  fryer: {
    class: Fryer,
    transitions: new Map(
      [
        [['cut'], ['fry']],
        [['peel'], ['fry']],
        [['peeling'], ['fry']],
        [['cooked'], ['fry']]
      ]
    )
  }
  // blender: {
  //   class: Blender,
  //   'blend'
  //   transitions: new Map()
  // },
  // pan: {
  //   class: Pan,
  //   'sauteed'
  //   transitions: new Map()
  // }
}
