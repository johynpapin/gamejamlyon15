import Fryer from './fryer'
import Knife from './knife'
import Peeler from './peeler'
import Pot from './pot'

export default {
  knife: {
    class: Knife,
    states: 'cut'
  },
  peeler: {
    class: Peeler,
    states: ['peel', 'peeling'],
    transitions: [[], ['cut'], ['cooked']]
  },
  pot: {
    class: Pot,
    states: 'cooked'
  },
  fryer: {
    class: Fryer,
    states: 'fry',
    transitions: [['cut'], ['peel'], ['peeling'], ['cooked']]
  }
  // blender: {
  //   class: Blender,
  //   states: 'blend'
  // },
  // pan: {
  //   class: Pan,
  //   states: 'sauteed'
  // }
}
