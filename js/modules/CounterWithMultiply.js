import {Counter} from './Counter.js'

class CounterWithMultiply extends Counter {
  constructor(initVal, multiplier) {
    super(initVal);

    this.multiplier = multiplier
  }

  multiplyCount() {
    return this.getCount() * this.multiplier
  }
}


export default CounterWithMultiply
