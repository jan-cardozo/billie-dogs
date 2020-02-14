import { generatorFactory } from './generator-factory';

const testArray = [
  'one',
  'two',
  'three'
];

test('test single loop', () => {
  const generator = (generatorFactory(testArray))();
  expect(generator.next().value).toBe('one');
  expect(generator.next().value).toBe('two');
  expect(generator.next().value).toBe('three');
});

test('test double loop', () => {
  const generator = (generatorFactory(testArray))();
  expect(generator.next().value).toBe('one');
  expect(generator.next().value).toBe('two');
  expect(generator.next().value).toBe('three');
  expect(generator.next().value).toBe('one');
  expect(generator.next().value).toBe('two');
  expect(generator.next().value).toBe('three');
});

test('start from second position', () => {
  const generator = (generatorFactory(testArray, 1))();
  expect(generator.next().value).toBe('two');
  expect(generator.next().value).toBe('three');
  expect(generator.next().value).toBe('one');
  expect(generator.next().value).toBe('two');
  expect(generator.next().value).toBe('three');
  expect(generator.next().value).toBe('one');
});

test('start from third position', () => {
  const generator = (generatorFactory(testArray, 2))();
  expect(generator.next().value).toBe('three');
  expect(generator.next().value).toBe('one');
  expect(generator.next().value).toBe('two');
  expect(generator.next().value).toBe('three');
  expect(generator.next().value).toBe('one');
  expect(generator.next().value).toBe('two');
});
