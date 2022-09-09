import * as assert from 'assert'
import * as _ from '../../src/ReaderAsyncIterableEither/Switch'
import * as AI from '../../src/AsyncIterable'
import * as AIE from '../../src/AsyncIterableEither'
import * as RAIE from '../../src/ReaderAsyncIterableEither'
import * as IX from '@reactivex/ix-es5-cjs/asynciterable'
import { pipe } from 'fp-ts/lib/function'
import * as E from 'fp-ts/Either'

const deepStrictEqual =
  <A, B extends A>(expected: ReadonlyArray<B>) =>
  async (fa: AsyncIterable<A>) => {
    assert.deepStrictEqual(await IX.toArray(fa), expected)
  }

const fromArray =
  <R, E, A>(a: Array<A>): RAIE.ReaderAsyncIterableEither<R, E, A> =>
  (_r: R) =>
    AIE.fromAsyncIterable(AI.fromArray(a))
const run =
  <R>(r: R) =>
  <E, A>(fa: RAIE.ReaderAsyncIterableEither<R, E, A>) =>
    fa(r)

describe('ReaderAsyncIterableEither#Switch', () => {
  describe('ChainWithIndex', () => {
    const C_ = _.ChainWithIndex
    const fa = fromArray([1, 2])
    it.concurrent('chain', async () => {
      await pipe(
        C_.chain(fa, (a) => fromArray([a, a + 1])),
        run({}),
        deepStrictEqual([2, 3].map(E.right))
      )
    })
    it.concurrent('chainWithIndex', async () => {
      await pipe(
        C_.chainWithIndex(fa, (i, a) => fromArray([a, a + i])),
        run({}),
        deepStrictEqual([2, 3].map(E.right))
      )
    })
  })

  it.concurrent('getSemigroup', async () => {
    const S_ = _.getSemigroup<unknown, unknown, number>()

    await pipe(S_.concat(fromArray([1, 2]), fromArray([3, 4])), run({}), deepStrictEqual([1, 2, 3, 4].map(E.right)))
  })

  describe('getMonoid', () => {
    const M_ = _.getMonoid<unknown, unknown, number>()

    it.concurrent('concat', async () => {
      await pipe(M_.concat(fromArray([1, 2]), fromArray([3, 4])), run({}), deepStrictEqual([1, 2, 3, 4].map(E.right)))
    })

    it.concurrent('empty', async () => {
      await pipe(M_.empty, run({}), deepStrictEqual([]))
    })
  })

  it.concurrent('chain', async () => {
    await pipe(
      fromArray([1, 2]),
      _.chain((a) => fromArray([a, a + 1])),
      run({}),
      deepStrictEqual([2, 3].map(E.right))
    )
  })

  it.concurrent('chainWithIndex', async () => {
    await pipe(
      fromArray([1, 2]),
      _.chainWithIndex((i, a) => fromArray([a, a + i])),
      run({}),
      deepStrictEqual([2, 3].map(E.right))
    )
  })

  it.concurrent('flatten', async () => {
    await pipe(
      fromArray([fromArray([1, 2]), fromArray([3, 4])]),
      _.flatten,
      run({}),
      deepStrictEqual([3, 4].map(E.right))
    )
  })

  it.concurrent('chainFirst', async () => {
    await pipe(
      fromArray([1, 2]),
      _.chainFirst((a) => fromArray([a, a + 1])),
      run({}),
      deepStrictEqual([2, 2].map(E.right))
    )
  })

  it.concurrent('bind', async () => {
    await pipe(
      fromArray([{ v: 1 }, { v: 2 }]),
      _.bind('foo', ({ v }) => fromArray([v, v + 1])),
      run({}),
      deepStrictEqual(
        [
          { v: 2, foo: 2 },
          { v: 2, foo: 3 }
        ].map(E.right)
      )
    )
  })
})
