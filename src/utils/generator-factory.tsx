const generatorFactory = (iterable: Array<string>, start: number = 0) => {
  return function* () {
    const len = iterable.length;
    for (let i = start; ; i++) {
      yield iterable[i % len];
    }
  }
}

export { generatorFactory }
