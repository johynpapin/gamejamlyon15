import Fryer from './fryer'
import Knife from './knife'
import Peeler from './peeler'
import Pot from './pot'

export default {
  knife: {
    class: Knife,
    state: 'cut'
  },
  peeler: {
    class: Peeler,
    state: 'peel'
  },
  pot: {
    class: Pot,
    state: 'cooked'
  },
  fryer: {
    class: Fryer,
    state: 'fry'
  }
  // blender: {
  //   class: Blender,
  //   state: 'blend'
  // },
  // pan: {
  //   class: Pan,
  //   state: 'sauteed'
  // }
}
