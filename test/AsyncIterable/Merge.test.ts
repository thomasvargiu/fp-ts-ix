import * as assert from 'assert'
import * as _ from '../../src/AsyncIterable/Merge'
import * as AI from '../../src/AsyncIterable'
import * as IX from '@reactivex/ix-es5-cjs/asynciterable'
import { pipe } from 'fp-ts/lib/function'

const deepStrictEqual =
  <A, B extends A>(expected: ReadonlyArray<B>) =>
  async (fa: AsyncIterable<A>) => {
    assert.deepStrictEqual(await IX.toArray(fa), expected)
  }

describe('AsyncIterable#Merge', () => {
  describe('ChainWithIndex', () => {
    const C_ = _.ChainWithIndex
    const fa = AI.fromArray([1, 2])
    it.concurrent('chain', async () => {
      await pipe(
        C_.chain(fa, (a) => AI.fromArray([a, a * 3])),
        deepStrictEqual([1, 2, 3, 6])
      )
    })
    it.concurrent('chainWithIndex', async () => {
      await pipe(
        C_.chainWithIndex(fa, (i, a) => AI.fromArray([a, a + i])),
        deepStrictEqual([1, 2, 1, 3])
      )
    })
  })

  it.concurrent('getSemigroup', async () => {
    const S_ = _.getSemigroup<number>()

    await pipe(S_.concat(AI.fromArray([1, 2]), AI.fromArray([3, 4])), deepStrictEqual([1, 3, 2, 4]))
  })

  describe('getMonoid', () => {
    const M_ = _.getMonoid<number>()

    it.concurrent('concat', async () => {
      await pipe(M_.concat(AI.fromArray([1, 2]), AI.fromArray([3, 4])), deepStrictEqual([1, 3, 2, 4]))
    })

    it.concurrent('empty', async () => {
      await pipe(M_.empty, deepStrictEqual([]))
    })
  })

  it.concurrent('chain', async () => {
    await pipe(
      AI.fromArray([1, 2]),
      _.chain((a) => AI.fromArray([a, a * 3])),
      deepStrictEqual([1, 2, 3, 6])
    )
  })

  it.concurrent('chainWithIndex', async () => {
    await pipe(
      AI.fromArray([1, 2]),
      _.chainWithIndex((i, a) => AI.fromArray([a, a + i])),
      deepStrictEqual([1, 2, 1, 3])
    )
  })

  it.concurrent('flatten', async () => {
    await pipe(AI.fromArray([AI.fromArray([1, 2]), AI.fromArray([3, 4])]), _.flatten, deepStrictEqual([1, 3, 2, 4]))
  })

  it.concurrent('chainFirst', async () => {
    await pipe(
      AI.fromArray([1, 2]),
      _.chainFirst((a) => AI.fromArray([a, a + 1])),
      deepStrictEqual([1, 2, 1, 2])
    )
  })

  it.concurrent('bind', async () => {
    await pipe(
      AI.fromArray([{ v: 1 }, { v: 2 }]),
      _.bind('foo', ({ v }) => AI.fromArray([v, v + 1])),
      deepStrictEqual([
        { foo: 1, v: 1 },
        { foo: 2, v: 2 },
        { foo: 2, v: 1 },
        { foo: 3, v: 2 }
      ])
    )
  })
})
