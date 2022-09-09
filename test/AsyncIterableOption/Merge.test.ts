import * as assert from 'assert'
import * as _ from '../../src/AsyncIterableOption/Merge'
import * as AI from '../../src/AsyncIterable'
import * as AIO from '../../src/AsyncIterableOption'
import * as IX from '@reactivex/ix-es5-cjs/asynciterable'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/lib/function'

const deepStrictEqual =
  <A, B extends A>(expected: ReadonlyArray<B>) =>
  async (fa: AsyncIterable<A>) => {
    assert.deepStrictEqual(await IX.toArray(fa), expected)
  }

const fromArray = <A>(a: Array<A>): AIO.AsyncIterableOption<A> => AIO.fromAsyncIterable(AI.fromArray(a))

describe('AsyncIterableOption#Merge', () => {
  describe('ChainWithIndex', () => {
    const C_ = _.ChainWithIndex
    const fa = fromArray([1, 2])
    it.concurrent('chain', async () => {
      await pipe(
        C_.chain(fa, (a) => fromArray([a, a * 3])),
        deepStrictEqual([1, 2, 3, 6].map(O.some))
      )
    })
    it.concurrent('chainWithIndex', async () => {
      await pipe(
        C_.chainWithIndex(fa, (i, a) => fromArray([a, a + i])),
        deepStrictEqual([1, 2, 1, 3].map(O.some))
      )
    })
  })

  it.concurrent('getSemigroup', async () => {
    const S_ = _.getSemigroup<number>()

    await pipe(S_.concat(fromArray([1, 2]), fromArray([3, 4])), deepStrictEqual([1, 3, 2, 4].map(O.some)))
  })

  describe('getMonoid', () => {
    const M_ = _.getMonoid<number>()

    it.concurrent('concat', async () => {
      await pipe(M_.concat(fromArray([1, 2]), fromArray([3, 4])), deepStrictEqual([1, 3, 2, 4].map(O.some)))
    })

    it.concurrent('empty', async () => {
      await pipe(M_.empty, deepStrictEqual([]))
    })
  })

  it.concurrent('chain', async () => {
    await pipe(
      fromArray([1, 2]),
      _.chain((a) => fromArray([a, a * 3])),
      deepStrictEqual([1, 2, 3, 6].map(O.some))
    )
  })

  it.concurrent('chainWithIndex', async () => {
    await pipe(
      fromArray([1, 2]),
      _.chainWithIndex((i, a) => fromArray([a, a + i])),
      deepStrictEqual([1, 2, 1, 3].map(O.some))
    )
  })

  it.concurrent('flatten', async () => {
    await pipe(fromArray([fromArray([1, 2]), fromArray([3, 4])]), _.flatten, deepStrictEqual([1, 3, 2, 4].map(O.some)))
  })

  it.concurrent('chainFirst', async () => {
    await pipe(
      fromArray([1, 2]),
      _.chainFirst((a) => fromArray([a, a + 1])),
      deepStrictEqual([1, 2, 1, 2].map(O.some))
    )
  })

  it.concurrent('bind', async () => {
    await pipe(
      fromArray([{ v: 1 }, { v: 2 }]),
      _.bind('foo', ({ v }) => fromArray([v, v + 1])),
      deepStrictEqual(
        [
          { v: 1, foo: 1 },
          { v: 2, foo: 2 },
          { v: 1, foo: 2 },
          { v: 2, foo: 3 }
        ].map(O.some)
      )
    )
  })
})
