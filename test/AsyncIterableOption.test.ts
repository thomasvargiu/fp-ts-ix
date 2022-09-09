import * as assert from 'assert'
import * as _ from '../src/AsyncIterableOption'
import * as AI from '../src/AsyncIterable'
import * as AIc from '../src/AsyncIterable/Concat'
import * as IX from '@reactivex/ix-es5-cjs/asynciterable'
import * as IXO from '@reactivex/ix-es5-cjs/asynciterable/operators'
import { identity, pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/Option'
import * as E from 'fp-ts/Either'
import { left, right } from 'fp-ts/Separated'

const deepStrictEqual =
  <A, B extends A>(expected: ReadonlyArray<B>) =>
  async (fa: AsyncIterable<A>) => {
    assert.deepStrictEqual(await IX.toArray(fa), expected)
  }

describe('AsyncIterableOption', () => {
  it.concurrent('of', async () => {
    const fa = _.of(1)
    await pipe(fa, deepStrictEqual([O.some(1)]))
  })

  it.concurrent('none', async () => {
    const fa = _.none
    await pipe(fa, deepStrictEqual([O.none]))
  })

  it.concurrent('some', async () => {
    const fa = _.some(1)
    await pipe(fa, deepStrictEqual([O.some(1)]))
  })

  it.concurrent('fromIO', async () => {
    const fa = _.fromIO(() => 1)
    await pipe(fa, deepStrictEqual([O.some(1)]))
  })

  it.concurrent('fromTask', async () => {
    const fa = _.fromTask(async () => 1)
    await pipe(fa, deepStrictEqual([O.some(1)]))
  })

  it.concurrent('fromTaskEither', async () => {
    await pipe(
      _.fromTaskEither(async () => E.right(1)),
      deepStrictEqual([O.some(1)])
    )
    await pipe(
      _.fromTaskEither(async () => E.left(1)),
      deepStrictEqual([O.none])
    )
  })

  it.concurrent('fromAsyncIterable', async () => {
    const fa = _.fromAsyncIterable(AI.fromArray([1, 2, 3]))
    await pipe(fa, deepStrictEqual([O.some(1), O.some(2), O.some(3)]))
  })

  it.concurrent('fromOption', async () => {
    await pipe(O.some(1), _.fromOption, deepStrictEqual([O.some(1)]))
    await pipe(O.none, _.fromOption, deepStrictEqual([O.none]))
  })

  it.concurrent('fromOptionK', async () => {
    const f = (a: number) => (a % 2 === 0 ? O.some(a) : O.none)
    await pipe(2, _.fromOptionK(f), deepStrictEqual([O.some(2)]))
    await pipe(3, _.fromOptionK(f), deepStrictEqual([O.none]))
  })

  it.concurrent('fromEitherK', async () => {
    const f = (a: number) => (a % 2 === 0 ? E.right(a) : E.left('err'))
    await pipe(2, _.fromEitherK(f), deepStrictEqual([O.some(2)]))
    await pipe(3, _.fromEitherK(f), deepStrictEqual([O.none]))
  })

  it.concurrent('fromIOK', async () => {
    const f = (a: number) => () => a
    await pipe(2, _.fromIOK(f), deepStrictEqual([O.some(2)]))
  })

  it.concurrent('fromAsyncIterableK', async () => {
    const f = (a: number) => AI.fromArray([a, 2, 3])
    const fa = _.fromAsyncIterableK(f)
    await pipe(fa(1), deepStrictEqual([O.some(1), O.some(2), O.some(3)]))
  })

  it.concurrent('getOnEmpty', async () => {
    const fa = _.fromAsyncIterable(AI.fromArray([1, 2, 3]))
    const onEmpty = () => _.fromAsyncIterable(AI.fromArray([4, 5, 6]))
    await pipe(fa, _.getOnEmpty(onEmpty), deepStrictEqual([O.some(1), O.some(2), O.some(3)]))
    await pipe(IX.empty(), _.getOnEmpty(onEmpty), deepStrictEqual([O.some(4), O.some(5), O.some(6)]))
  })

  it.concurrent('Do', async () => {
    await pipe(_.Do, deepStrictEqual([O.some({})]))
  })

  it.concurrent('bindTo', async () => {
    const fa = _.fromAsyncIterable(AI.fromArray([1, 2, 3]))
    await pipe(fa, _.bindTo('v'), deepStrictEqual([O.some({ v: 1 }), O.some({ v: 2 }), O.some({ v: 3 })]))
  })

  it.concurrent('apS', async () => {
    const fa = _.fromAsyncIterable(AI.fromArray([1, 2, 3]))
    await pipe(
      fa,
      _.bindTo('a'),
      _.apS('b', _.some('b')),
      deepStrictEqual([O.some({ a: 1, b: 'b' }), O.some({ a: 2, b: 'b' }), O.some({ a: 3, b: 'b' })])
    )
  })

  it.concurrent('ApT', async () => {
    await pipe(_.ApT, deepStrictEqual([O.some([] as any)]))
  })

  it.concurrent('fromPredicate', async () => {
    const f = (a: number) => a % 2 === 0
    await pipe(2, _.fromPredicate(f), deepStrictEqual([O.some(2)]))
    await pipe(3, _.fromPredicate(f), deepStrictEqual([O.none]))
  })

  it.concurrent('fromEither', async () => {
    await pipe(_.fromEither(E.right(1)), deepStrictEqual([O.some(1)]))
    await pipe(_.fromEither(E.left(1)), deepStrictEqual([O.none]))
  })

  it.concurrent('tryCatch', async () => {
    const factoryFailure = () =>
      pipe(
        AI.fromArray([1, 2]),
        IXO.concatMap((a) => (a === 2 ? IX.throwError('error') : IX.of(a)))
      )

    const factorySuccess = () => AI.fromArray([1, 2])

    await pipe(_.tryCatch(factoryFailure), deepStrictEqual([O.some(1), O.none]))

    await pipe(_.tryCatch(factorySuccess), deepStrictEqual([O.some(1), O.some(2)]))
  })

  it.concurrent('tryCatchK', async () => {
    const f = (a: number) =>
      pipe(
        AI.fromArray([a, 2]),
        IXO.concatMap((a) => (a === 2 ? IX.throwError('error') : IX.of(a)))
      )
    await pipe(_.tryCatchK(f)(1), deepStrictEqual([O.some(1), O.none]))

    const fSuccess = (a: number) => AI.fromArray([a, 2])
    await pipe(_.tryCatchK(fSuccess)(1), deepStrictEqual([O.some(1), O.some(2)]))
  })

  it.concurrent('match', async () => {
    const fa = AI.fromArray([O.some(1), O.none, O.some(3)])
    await pipe(
      fa,
      _.match(
        () => `L`,
        (a) => `R${a}`
      ),
      deepStrictEqual(['R1', 'L', 'R3'])
    )
  })

  it.concurrent('matchW', async () => {
    const fa = AI.fromArray([O.some(1), O.none, O.some(3)])
    await pipe(
      fa,
      _.matchW(
        () => 2,
        (a) => `R${a}`
      ),
      deepStrictEqual(['R1', 2, 'R3'])
    )
  })

  it.concurrent('matchE', async () => {
    const fa = AI.fromArray([O.some(1), O.none, O.some(3)])
    await pipe(
      fa,
      _.matchE(AIc.Chain)(
        () => AI.fromArray([`L`, `LL`]),
        (a) => AI.fromArray([`R${a}`, `RR${a}`])
      ),
      deepStrictEqual(['R1', 'RR1', 'L', 'LL', 'R3', 'RR3'])
    )
  })

  it.concurrent('fold', async () => {
    const fa = AI.fromArray([O.some(1), O.none, O.some(3)])
    await pipe(
      fa,
      _.fold(AIc.Chain)(
        () => AI.fromArray([`L`, `LL`]),
        (a) => AI.fromArray([`R${a}`, `RR${a}`])
      ),
      deepStrictEqual(['R1', 'RR1', 'L', 'LL', 'R3', 'RR3'])
    )
  })

  it.concurrent('matchEW', async () => {
    const fa = AI.fromArray([O.some(1), O.none, O.some(3)])
    await pipe(
      fa,
      _.matchEW(AIc.Chain)(
        () => AI.fromArray([`L`, `LL`]),
        (a) => AI.fromArray([a, a * 2])
      ),
      deepStrictEqual([1, 2, 'L', 'LL', 3, 6])
    )
  })

  it.concurrent('foldW', async () => {
    const fa = AI.fromArray([O.some(1), O.none, O.some(3)])
    await pipe(
      fa,
      _.foldW(AIc.Chain)(
        () => AI.fromArray([`L`, `LL`]),
        (a) => AI.fromArray([a, a * 2])
      ),
      deepStrictEqual([1, 2, 'L', 'LL', 3, 6])
    )
  })

  it.concurrent('getOrElse', async () => {
    const fa = AI.fromArray([O.some(1), O.none, O.some(3)])
    await pipe(
      fa,
      _.getOrElse(AIc.Chain)(() => AI.fromArray([4, 6])),
      deepStrictEqual([1, 4, 6, 3])
    )
  })

  it.concurrent('getOrElseW', async () => {
    const fa = AI.fromArray([O.some(1), O.none, O.some(3)])
    await pipe(
      fa,
      _.getOrElseW(AIc.Chain)(() => AI.fromArray([`L`, `LL`])),
      deepStrictEqual([1, 'L', 'LL', 3])
    )
  })

  it.concurrent('fromNullable', async () => {
    await pipe(_.fromNullable(2), deepStrictEqual([O.some(2)]))
    await pipe(_.fromNullable(undefined), deepStrictEqual([O.none]))
    await pipe(_.fromNullable(null), deepStrictEqual([O.none]))
  })

  it.concurrent('fromNullableK', async () => {
    await pipe(_.fromNullableK(identity)(2), deepStrictEqual([O.some(2)]))
    await pipe(_.fromNullableK(identity)(undefined), deepStrictEqual([O.none]))
    await pipe(_.fromNullableK(identity)(null), deepStrictEqual([O.none]))
  })

  it.concurrent('map', async () => {
    await pipe(
      AI.fromArray([O.some(1), O.some(2), O.none, O.some(3)]),
      _.map((a) => a + 3),
      deepStrictEqual([O.some(4), O.some(5), O.none, O.some(6)])
    )
  })

  it.concurrent('mapWithIndex', async () => {
    await pipe(
      AI.fromArray([O.some('a'), O.some('b'), O.none, O.some('c')]),
      _.mapWithIndex((i, a) => `${a}${i}`),
      deepStrictEqual([O.some('a0'), O.some('b1'), O.none, O.some('c3')])
    )
  })

  describe('FunctorWithIndex', () => {
    const C_ = _.FunctorWithIndex
    it.concurrent('mapWithIndex', async () => {
      const f = (i: number, a: string) => `${a}${i}`
      await pipe(
        C_.mapWithIndex(AI.fromArray([O.some('a'), O.some('b'), O.none, O.some('c')]), f),
        deepStrictEqual([O.some('a0'), O.some('b1'), O.none, O.some('c3')])
      )
    })
  })

  describe('getMonad', () => {
    const M_ = _.getMonad(AIc.Chain)
    it.concurrent('map', async () => {
      const f = (a: number) => a * 2
      await pipe(
        M_.map(AI.fromArray([O.some(1), O.some(2), O.none, O.some(4)]), f),
        deepStrictEqual([O.some(2), O.some(4), O.none, O.some(8)])
      )
    })
  })

  describe('getMonadIO', () => {
    const M_ = _.getMonadIO(AIc.Chain)
    it.concurrent('fromIO', async () => {
      await pipe(
        M_.fromIO(() => 1),
        deepStrictEqual([O.some(1)])
      )
    })
  })

  describe('getMonadTask', () => {
    const M_ = _.getMonadTask(AIc.Chain)
    it.concurrent('fromTask', async () => {
      await pipe(
        M_.fromTask(async () => 1),
        deepStrictEqual([O.some(1)])
      )
    })
  })

  describe('getMonadAsyncIterable', () => {
    const M_ = _.getMonadAsyncIterable(AIc.ChainWithIndex)
    it.concurrent('fromAsyncIterable', async () => {
      await pipe(M_.fromAsyncIterable(AI.of(1)), deepStrictEqual([O.some(1)]))
    })
  })

  it.concurrent('ap', async () => {
    const double = (n: number): number => n * 2
    const mab = _.some(double)
    const ma = _.some(1)
    await pipe(mab, _.ap(ma), deepStrictEqual([O.some(2)]))
  })

  it.concurrent('apFirst', async () => {
    await pipe(_.of('a'), _.apFirst(_.of('b')), deepStrictEqual([O.some('a')]))
  })

  it.concurrent('apSecond', async () => {
    await pipe(_.of('a'), _.apSecond(_.of('b')), deepStrictEqual([O.some('b')]))
  })

  it.concurrent('chain', async () => {
    await pipe(
      _.fromAsyncIterable(AI.fromArray([1, 2, 3])),
      _.chain(AIc.Chain)((a) => _.fromAsyncIterable(AI.fromArray([a, a + 1]))),
      deepStrictEqual([1, 2, 2, 3, 3, 4].map(O.some))
    )

    await pipe(
      AI.fromArray([O.some(1), O.none, O.some(2)]),
      _.chain(AIc.Chain)((a) => _.fromAsyncIterable(AI.fromArray([a, a + 1]))),
      deepStrictEqual([O.some(1), O.some(2), O.none, O.some(2), O.some(3)])
    )
  })

  it.concurrent('chainWithIndex', async () => {
    const f = (i: number, a: number) => _.fromAsyncIterable(AI.fromArray([a, a + i]))
    await pipe(
      _.fromAsyncIterable(AI.fromArray([1, 2, 3])),
      _.chainWithIndex(AIc.ChainWithIndex)(f),
      deepStrictEqual([1, 1, 2, 3, 3, 5].map(O.some))
    )

    const f2 = (i: number, a: number) => AI.fromArray([O.some(a + i), O.none])
    await pipe(
      AI.fromArray([O.some(1), O.none]),
      _.chainWithIndex(AIc.ChainWithIndex)(f2),
      deepStrictEqual([O.some(1), O.none, O.none])
    )
  })

  describe('getChainWithIndex', () => {
    const C_ = _.getChainWithIndex(AIc.ChainWithIndex)
    it.concurrent('chainWithIndex', async () => {
      const f = (i: number, a: number) => _.fromAsyncIterable(AI.fromArray([a, a + i]))
      await pipe(
        C_.chainWithIndex(_.fromAsyncIterable(AI.fromArray([1, 2, 3])), f),
        deepStrictEqual([1, 1, 2, 3, 3, 5].map(O.some))
      )
    })
  })

  it.concurrent('flatten', async () => {
    const fa = _.fromAsyncIterable(
      AI.fromArray([
        _.fromAsyncIterable(AI.fromArray([1, 2, 3])),
        _.fromAsyncIterable(AI.fromArray([4, 5, 6])),
        _.fromAsyncIterable(AI.fromArray([7, 8, 9]))
      ])
    )
    await pipe(fa, _.flatten(AIc.Chain), deepStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9].map(O.some)))
  })

  it.concurrent('chainFirst', async () => {
    await pipe(
      _.fromAsyncIterable(AI.fromArray([1, 2, 3])),
      _.chainFirst(AIc.Chain)((a) => _.fromAsyncIterable(AI.fromArray([a, a + 1]))),
      deepStrictEqual([1, 1, 2, 2, 3, 3].map(O.some))
    )
  })

  it.concurrent('bind', async () => {
    await pipe(
      _.fromAsyncIterable(AI.fromArray([1, 2, 3].map((a) => ({ a })))),
      _.bind(AIc.Chain)('foo', ({ a }) => _.fromAsyncIterable(AI.fromArray([a, a + 1]))),
      (b) => b,
      deepStrictEqual(
        [
          { a: 1, foo: 1 },
          { a: 1, foo: 2 },
          { a: 2, foo: 2 },
          { a: 2, foo: 3 },
          { a: 3, foo: 3 },
          { a: 3, foo: 4 }
        ].map(O.some)
      )
    )
  })

  it.concurrent('chainNullableK', async () => {
    await pipe(
      _.fromAsyncIterable(AI.fromArray([1, null, undefined, 4])),
      _.chainNullableK(AIc.Chain)(identity),
      deepStrictEqual([O.some(1), O.none, O.none, O.some(4)])
    )
  })

  it.concurrent('chainOptionK', async () => {
    await pipe(
      _.fromAsyncIterable(AI.fromArray([1, null, undefined, 4])),
      _.chainOptionK(AIc.Chain)(O.fromNullable),
      deepStrictEqual([O.some(1), O.none, O.none, O.some(4)])
    )
  })

  it.concurrent('chainEitherK', async () => {
    const f = (a: number) => (a % 2 === 0 ? E.right(a + 10) : E.left('err'))
    await pipe(
      _.fromAsyncIterable(AI.fromArray([1, 2, 3, 4])),
      _.chainEitherK(AIc.Chain)(f),
      deepStrictEqual([O.none, O.some(12), O.none, O.some(14)])
    )
  })

  it.concurrent('chainFirstEitherK', async () => {
    const f = (a: number) => (a % 2 === 0 ? E.right(a + 10) : E.left('err'))
    await pipe(
      _.fromAsyncIterable(AI.fromArray([1, 2, 3, 4])),
      _.chainFirstEitherK(AIc.Chain)(f),
      deepStrictEqual([O.none, O.some(2), O.none, O.some(4)])
    )
  })

  it.concurrent('chainIOK', async () => {
    const f = (a: number) => () => a * 2
    await pipe(
      _.fromAsyncIterable(AI.fromArray([1, 2, 3, 4])),
      _.chainIOK(AIc.Chain)(f),
      deepStrictEqual([2, 4, 6, 8].map(O.some))
    )
  })

  it.concurrent('chainFirstIOK', async () => {
    const f = (a: number) => () => a * 2
    await pipe(
      _.fromAsyncIterable(AI.fromArray([1, 2, 3, 4])),
      _.chainFirstIOK(AIc.Chain)(f),
      deepStrictEqual([1, 2, 3, 4].map(O.some))
    )
  })

  it.concurrent('chainAsyncIterableK', async () => {
    const f = (a: number) => AI.fromArray([a, a * 2])
    await pipe(
      _.fromAsyncIterable(AI.fromArray([1, 2, 3, 4])),
      _.chainAsyncIterableK(AIc.Chain)(f),
      deepStrictEqual([1, 2, 2, 4, 3, 6, 4, 8].map(O.some))
    )
  })

  it.concurrent('chainFirstAsyncIterableK', async () => {
    const f = (a: number) => AI.fromArray([a, a * 2])
    await pipe(
      _.fromAsyncIterable(AI.fromArray([1, 2, 3, 4])),
      _.chainFirstAsyncIterableK(AIc.Chain)(f),
      deepStrictEqual([1, 1, 2, 2, 3, 3, 4, 4].map(O.some))
    )
  })

  describe('Compactable', () => {
    const C = _.Compactable

    it.concurrent('compact', async () => {
      await pipe(
        C.compact(AI.fromArray([O.some(O.some(1)), O.some(O.some(2))])),
        deepStrictEqual([O.some(1), O.some(2)])
      )
    })

    it.concurrent('separate', async () => {
      const s1 = C.separate(AI.fromArray([O.none, O.none]))
      await pipe(left(s1), deepStrictEqual([O.none, O.none]))
      await pipe(right(s1), deepStrictEqual([O.none, O.none]))

      const s2 = C.separate(AI.fromArray([O.some(E.left('a')), O.some(E.left('b'))]))
      await pipe(left(s2), deepStrictEqual([O.some('a'), O.some('b')]))
      await pipe(right(s2), deepStrictEqual([O.none, O.none]))

      const s3 = C.separate(AI.fromArray([O.some(E.right(1)), O.some(E.right(2))]))
      await pipe(left(s3), deepStrictEqual([O.none, O.none]))
      await pipe(right(s3), deepStrictEqual([O.some(1), O.some(2)]))
    })
  })

  describe('Filterable', () => {
    const F_ = _.Filterable

    it.concurrent('filter', async () => {
      await pipe(
        F_.filter(AI.fromArray([O.some(-1), O.some(0), O.none, O.some(1)]), (n) => n > 0),
        deepStrictEqual([O.none, O.none, O.none, O.some(1)])
      )
      await pipe(
        F_.filter(_.some(-1), (n) => n > 0),
        deepStrictEqual([O.none])
      )
      await pipe(
        F_.filter(_.none, (n) => n > 0),
        deepStrictEqual([O.none])
      )
    })

    it.concurrent('filterMap', async () => {
      const lengthF = (s: string) => (s.length > 1 ? O.some(s.length) : O.none)
      await pipe(F_.filterMap(_.some('aaa'), lengthF), deepStrictEqual([O.some(3)]))
      await pipe(F_.filterMap(_.some('a'), lengthF), deepStrictEqual([O.none]))
      await pipe(F_.filterMap(_.none, lengthF), deepStrictEqual([O.none]))
    })

    it.concurrent('partition', async () => {
      const s = F_.partition(_.some('a'), (s) => s.length > 2)
      await pipe(left(s), deepStrictEqual([O.some('a')]))
      await pipe(right(s), deepStrictEqual([O.none]))
    })

    it.concurrent('partitionMap', async () => {
      const s = F_.partitionMap(_.some('a'), (s) => (s.length > 2 ? E.right(s.length) : E.left(false)))

      await pipe(left(s), deepStrictEqual([O.some(false)]))
      await pipe(right(s), deepStrictEqual([O.none]))
    })
  })
})
