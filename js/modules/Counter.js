class Counter {
  static THIS_IS_STATIC_PROP = 'test static'
  #currentCount;

  constructor(initialValue) {
    this.#currentCount = initialValue;
    this.publicCount = initialValue;
  }

  incrementCount() {
    this.#currentCount++
    return this.#currentCount
  }
  decrementCount() {
    this.#currentCount--
    return this.#currentCount
  }
  resetCount() {
    this.#currentCount = 0
    return this.#currentCount
  }
  getCount(){
    return this.#currentCount
  }
  setCount(count){
    this.#currentCount = count;
    return this.#currentCount
  }
}

export {
  Counter
}