import * as assert from 'assert'
import * as _ from '../../src/AsyncIterableEither/Switch'
import * as AI from '../../src/AsyncIterable'
import * as AIE from '../../src/AsyncIterableEither'
import * as IX from '@reactivex/ix-es5-cjs/asynciterable'
import { pipe } from 'fp-ts/lib/function'
import * as E from 'fp-ts/Either'

const deepStrictEqual =
  <A, B extends A>(expected: ReadonlyArray<B>) =>
  async (fa: AsyncIterable<A>) => {
    assert.deepStrictEqual(await IX.toArray(fa), expected)
  }

const fromArray = <E, A>(a: Array<A>): AIE.AsyncIterableEither<E, A> => AIE.fromAsyncIterable(AI.fromArray(a))

describe('AsyncIterableEither#Switch', () => {
  describe('ChainWithIndex', () => {
    const C_ = _.ChainWithIndex
    const fa = fromArray([1, 2])
    it.concurrent('chain', async () => {
      await pipe(
        C_.chain(fa, (a) => fromArray([a, a + 1])),
        deepStrictEqual([2, 3].map(E.right))
      )
    })
    it.concurrent('chainWithIndex', async () => {
      await pipe(
        C_.chainWithIndex(fa, (i, a) => fromArray([a, a + i])),
        deepStrictEqual([2, 3].map(E.right))
      )
    })
  })

  it.concurrent('getSemigroup', async () => {
    const S_ = _.getSemigroup<unknown, number>()

    await pipe(S_.concat(fromArray([1, 2]), fromArray([3, 4])), deepStrictEqual([1, 2, 3, 4].map(E.right)))
  })

  describe('getMonoid', () => {
    const M_ = _.getMonoid<unknown, number>()

    it.concurrent('concat', async () => {
      await pipe(M_.concat(fromArray([1, 2]), fromArray([3, 4])), deepStrictEqual([1, 2, 3, 4].map(E.right)))
    })

    it.concurrent('empty', async () => {
      await pipe(M_.empty, deepStrictEqual([]))
    })
  })

  it.concurrent('chain', async () => {
    await pipe(
      fromArray([1, 2]),
      _.chain((a) => fromArray([a, a + 1])),
      deepStrictEqual([2, 3].map(E.right))
    )

    await pipe(
      AI.fromArray([E.right(1), E.left('err')]),
      _.chain((a) => fromArray([a, a + 1])),
      deepStrictEqual([E.left('err')])
    )
  })

  it.concurrent('chainWithIndex', async () => {
    await pipe(
      fromArray([1, 2]),
      _.chainWithIndex((i, a) => fromArray([a, a + i])),
      deepStrictEqual([2, 3].map(E.right))
    )
  })

  it.concurrent('flatten', async () => {
    await pipe(fromArray([fromArray([1, 2]), fromArray([3, 4])]), _.flatten, deepStrictEqual([3, 4].map(E.right)))
  })

  it.concurrent('chainFirst', async () => {
    await pipe(
      fromArray([1, 2]),
      _.chainFirst((a) => fromArray([a, a + 1])),
      deepStrictEqual([2, 2].map(E.right))
    )
  })

  it.concurrent('bind', async () => {
    await pipe(
      fromArray([{ v: 1 }, { v: 2 }]),
      _.bind('foo', ({ v }) => fromArray([v, v + 1])),
      deepStrictEqual(
        [
          { v: 2, foo: 2 },
          { v: 2, foo: 3 }
        ].map(E.right)
      )
    )
  })
})
