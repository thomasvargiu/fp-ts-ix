import * as assert from 'assert'
import * as _ from '../src/ReaderAsyncIterableEither'
import * as AI from '../src/AsyncIterable'
import * as AIE from '../src/AsyncIterableEither'
import * as AIc from '../src/AsyncIterable/Concat'
import * as IX from '@reactivex/ix-es5-cjs/asynciterable'
import { identity, pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/Option'
import * as E from 'fp-ts/Either'

const deepStrictEqual =
  <A, B extends A>(expected: ReadonlyArray<B>) =>
  async (fa: AsyncIterable<A>) => {
    assert.deepStrictEqual(await IX.toArray(fa), expected)
  }

describe('ReaderAsyncIterableEither', () => {
  it.concurrent('of', async () => {
    const fa = _.of(1)
    await pipe(fa({}), deepStrictEqual([E.right(1)]))
  })

  it.concurrent('left', async () => {
    const fa = _.left(1)
    await pipe(fa({}), deepStrictEqual([E.left(1)]))
  })

  it.concurrent('right', async () => {
    const fa = _.right(1)
    await pipe(fa({}), deepStrictEqual([E.right(1)]))
  })

  it.concurrent('leftReader', async () => {
    const fa = _.leftReader(() => 1)
    await pipe(fa({}), deepStrictEqual([E.left(1)]))
  })

  it.concurrent('rightReader', async () => {
    const fa = _.rightReader(() => 1)
    await pipe(fa({}), deepStrictEqual([E.right(1)]))
  })

  it.concurrent('rightAsyncIterable', async () => {
    const fa = _.rightAsyncIterable(AI.fromArray([1, 2, 3]))
    await pipe(fa({}), deepStrictEqual([E.right(1), E.right(2), E.right(3)]))
  })

  it.concurrent('leftAsyncIterable', async () => {
    const fa = _.leftAsyncIterable(AI.fromArray([1, 2, 3]))
    await pipe(fa({}), deepStrictEqual([E.left(1), E.left(2), E.left(3)]))
  })

  it.concurrent('rightIO', async () => {
    const fa = _.rightIO(() => 1)
    await pipe(fa({}), deepStrictEqual([E.right(1)]))
  })

  it.concurrent('leftIO', async () => {
    const fa = _.leftIO(() => 1)
    await pipe(fa({}), deepStrictEqual([E.left(1)]))
  })

  it.concurrent('rightTask', async () => {
    const fa = _.rightTask(async () => 1)
    await pipe(fa({}), deepStrictEqual([E.right(1)]))
  })

  it.concurrent('leftTask', async () => {
    const fa = _.leftTask(async () => 1)
    await pipe(fa({}), deepStrictEqual([E.left(1)]))
  })

  it.concurrent('fromReaderEitherK', async () => {
    const fa = _.fromReaderEitherK((n: number) => () => E.right(n))
    await pipe(fa(1)({}), deepStrictEqual([E.right(1)]))
  })

  it.concurrent('fromIO', async () => {
    const fa = _.fromIO(() => 1)
    await pipe(fa({}), deepStrictEqual([E.right(1)]))
  })

  it.concurrent('fromTask', async () => {
    const fa = _.fromTask(async () => 1)
    await pipe(fa({}), deepStrictEqual([E.right(1)]))
  })

  it.concurrent('fromTaskEither', async () => {
    await pipe(_.fromTaskEither(async () => E.right(1))({}), deepStrictEqual([E.right(1)]))
    await pipe(_.fromTaskEither(async () => E.left(1))({}), deepStrictEqual([E.left(1)]))
  })

  it.concurrent('fromAsyncIterable', async () => {
    const fa = _.fromAsyncIterable(AI.fromArray([1, 2, 3]))
    await pipe(fa({}), deepStrictEqual([E.right(1), E.right(2), E.right(3)]))
  })

  it.concurrent('fromOption', async () => {
    await pipe(
      O.some(1),
      _.fromOption(() => 'err'),
      (f) => f({}),
      deepStrictEqual([E.right(1)])
    )
    await pipe(
      O.none,
      _.fromOption(() => 'err'),
      (f) => f({}),
      deepStrictEqual([E.left('err')])
    )
  })

  describe('fromOptionK', () => {
    const f = (a: number) => (a % 2 === 0 ? O.some(a) : O.none)
    it.concurrent('some', async () => {
      const app = pipe(2, _.fromOptionK(() => 'err')(f))
      await pipe(app({}), deepStrictEqual([E.right(2)]))
    })

    it.concurrent('none', async () => {
      const app = pipe(1, _.fromOptionK(() => 'err')(f))
      await pipe(app({}), deepStrictEqual([E.left('err')]))
    })
  })

  describe('fromEitherK', () => {
    const f = (a: number) => (a % 2 === 0 ? E.right(a) : E.left('err'))

    it.concurrent('right', async () => {
      const app = pipe(2, _.fromEitherK(f))
      await pipe(app({}), deepStrictEqual([E.right(2)]))
    })
    it.concurrent('left', async () => {
      const app = pipe(3, _.fromEitherK(f))
      await pipe(app({}), deepStrictEqual([E.left('err')]))
    })
  })

  it.concurrent('fromIOK', async () => {
    const f = (a: number) => () => a
    const app = pipe(2, _.fromIOK(f))
    await pipe(app({}), deepStrictEqual([E.right(2)]))
  })

  it.concurrent('fromAsyncIterableK', async () => {
    const f = (a: number) => AI.fromArray([a, 2, 3])
    const fa = _.fromAsyncIterableK(f)
    await pipe(fa(1)({}), deepStrictEqual([E.right(1), E.right(2), E.right(3)]))
  })

  it.concurrent('Do', async () => {
    await pipe(_.Do({}), deepStrictEqual([E.right({})]))
  })

  it.concurrent('bindTo', async () => {
    const fa = _.fromAsyncIterable(AI.fromArray([1, 2, 3]))
    const app = pipe(fa, _.bindTo('v'))
    await pipe(app({}), deepStrictEqual([E.right({ v: 1 }), E.right({ v: 2 }), E.right({ v: 3 })]))
  })

  it.concurrent('apS', async () => {
    const fa = _.fromAsyncIterable<number, unknown, string>(AI.fromArray([1, 2, 3]))
    const app = pipe(fa, _.bindTo('a'), _.apS('b', _.right<unknown, string, string>('b')))
    await pipe(
      app({}),
      deepStrictEqual([E.right({ a: 1, b: 'b' }), E.right({ a: 2, b: 'b' }), E.right({ a: 3, b: 'b' })])
    )
  })

  it.concurrent('apSW', async () => {
    const fa = _.fromAsyncIterable<number, unknown, string>(AI.fromArray([1, 2, 3]))
    const app = pipe(fa, _.bindTo('a'), _.apSW('b', _.right<unknown, number, string>('b')))
    await pipe(
      app({}),
      deepStrictEqual([E.right({ a: 1, b: 'b' }), E.right({ a: 2, b: 'b' }), E.right({ a: 3, b: 'b' })])
    )
  })

  it.concurrent('ApT', async () => {
    await pipe(_.ApT({}), deepStrictEqual([E.right([] as any)]))
  })

  it.concurrent('fromPredicate', async () => {
    const f = (a: number) => a % 2 === 0
    await pipe(
      2,
      _.fromPredicate(f, () => 'err'),
      (r) => r({}),
      deepStrictEqual([E.right(2)])
    )
    await pipe(
      3,
      _.fromPredicate(f, () => 'err'),
      (r) => r({}),
      deepStrictEqual([E.left('err')])
    )
  })

  it.concurrent('fromEither', async () => {
    await pipe(_.fromEither(E.right(1)), (r) => r({}), deepStrictEqual([E.right(1)]))
    await pipe(_.fromEither(E.left(1)), (r) => r({}), deepStrictEqual([E.left(1)]))
  })

  it.concurrent('fromIOEither', async () => {
    await pipe(
      _.fromIOEither(() => E.right(1)),
      (r) => r({}),
      deepStrictEqual([E.right(1)])
    )
    await pipe(
      _.fromIOEither(() => E.left(1)),
      (r) => r({}),
      deepStrictEqual([E.left(1)])
    )
  })

  it.concurrent('fromAsyncIterableOption', async () => {
    const fa = _.fromAsyncIterableOption(() => 'err')(AI.fromArray([O.some(1), O.none, O.some(3)]))
    await pipe(fa({}), deepStrictEqual([E.right(1), E.left('err'), E.right(3)]))
  })

  it.concurrent('match', async () => {
    const fa = () => AI.fromArray([E.right(1), E.left(2), E.right(3)])
    await pipe(
      fa,
      _.match(
        (e) => `L${e}`,
        (a) => `R${a}`
      ),
      (r) => r({}),
      deepStrictEqual(['R1', 'L2', 'R3'])
    )
  })

  it.concurrent('matchW', async () => {
    const fa = () => AI.fromArray([E.right(1), E.left(2), E.right(3)])
    await pipe(
      fa,
      _.matchW(
        (e) => e,
        (a) => `R${a}`
      ),
      (r) => r({}),
      deepStrictEqual(['R1', 2, 'R3'])
    )
  })

  it.concurrent('matchE', async () => {
    const fa = () => AI.fromArray([E.right(1), E.left(2), E.right(3)])
    await pipe(
      fa,
      _.matchE(AIc.Chain)(
        (e) => () => AI.fromArray([`L${e}`, `LL${e}`]),
        (a) => () => AI.fromArray([`R${a}`, `RR${a}`])
      ),
      (r) => r({}),
      deepStrictEqual(['R1', 'RR1', 'L2', 'LL2', 'R3', 'RR3'])
    )
  })

  it.concurrent('fold', async () => {
    const fa = () => AI.fromArray([E.right(1), E.left(2), E.right(3)])
    await pipe(
      fa,
      _.fold(AIc.Chain)(
        (e) => () => AI.fromArray([`L${e}`, `LL${e}`]),
        (a) => () => AI.fromArray([`R${a}`, `RR${a}`])
      ),
      (r) => r({}),
      deepStrictEqual(['R1', 'RR1', 'L2', 'LL2', 'R3', 'RR3'])
    )
  })

  it.concurrent('matchEW', async () => {
    const fa = () => AI.fromArray([E.right(1), E.left(2), E.right(3)])
    await pipe(
      fa,
      _.matchEW(AIc.Chain)(
        (e) => () => AI.fromArray([`L${e}`, `LL${e}`]),
        (a) => () => AI.fromArray([a, a * 2])
      ),
      (r) => r({}),
      deepStrictEqual([1, 2, 'L2', 'LL2', 3, 6])
    )
  })

  it.concurrent('foldW', async () => {
    const fa = () => AI.fromArray([E.right(1), E.left(2), E.right(3)])
    await pipe(
      fa,
      _.foldW(AIc.Chain)(
        (e) => () => AI.fromArray([`L${e}`, `LL${e}`]),
        (a) => () => AI.fromArray([a, a * 2])
      ),
      (r) => r({}),
      deepStrictEqual([1, 2, 'L2', 'LL2', 3, 6])
    )
  })

  it.concurrent('getOrElse', async () => {
    const fa = () => AI.fromArray([E.right(1), E.left(2), E.right(3)])
    await pipe(
      fa,
      _.getOrElse(AIc.Chain)((e) => () => AI.fromArray([e * 2, e * 3])),
      (r) => r({}),
      deepStrictEqual([1, 4, 6, 3])
    )
  })

  it.concurrent('getOrElseW', async () => {
    const fa = () => AI.fromArray([E.right(1), E.left(2), E.right(3)])
    await pipe(
      fa,
      _.getOrElseW(AIc.Chain)((e) => () => AI.fromArray([`L${e}`, `LL${e}`])),
      (r) => r({}),
      deepStrictEqual([1, 'L2', 'LL2', 3])
    )
  })

  it.concurrent('orElse', async () => {
    const fa = () => AI.fromArray([E.right(1), E.left(2), E.right(3)])
    await pipe(
      fa,
      _.orElse(AIc.Chain)((e) => _.fromAsyncIterable(AI.fromArray([e * 2, e * 3]))),
      (r) => r({}),
      deepStrictEqual([1, 4, 6, 3].map(E.right))
    )
  })

  it.concurrent('orElseW', async () => {
    const fa = () => AI.fromArray([E.right(1), E.left(2), E.right(3)])
    await pipe(
      fa,
      _.orElseW(AIc.Chain)((e) => _.fromAsyncIterable(AI.fromArray(['a' + e, 'b']))),
      (r) => r({}),
      deepStrictEqual([1, 'a2', 'b', 3].map(E.right))
    )
  })

  it.concurrent('orElseFirst', async () => {
    const fa: _.ReaderAsyncIterableEither<unknown, number, number> = () =>
      AI.fromArray([E.right(1), E.left(2), E.right(3)])
    const f = (a: number): _.ReaderAsyncIterableEither<unknown, number, number> =>
      _.fromAsyncIterable(AI.fromArray([a * 2, a * 3]))
    await pipe(
      fa,
      _.orElseFirst(AIc.Chain)(f),
      (r) => r({}),
      deepStrictEqual([E.right(1), E.left(2), E.left(2), E.right(3)])
    )
  })

  it.concurrent('orElseFirstW', async () => {
    const fa: _.ReaderAsyncIterableEither<unknown, number, number> = () =>
      AI.fromArray([E.right(1), E.left(2), E.right(3)])
    const f = (a: number): _.ReaderAsyncIterableEither<unknown, Error, string> =>
      _.fromAsyncIterable(AI.fromArray(['a' + a, 'b']))
    await pipe(
      fa,
      _.orElseFirstW(AIc.Chain)(f),
      (r) => r({}),
      deepStrictEqual([E.right(1), E.left(2), E.left(2), E.right(3)])
    )
  })

  it.concurrent('orLeft', async () => {
    const fa = () => AI.fromArray([E.right(1), E.left('err'), E.right(3)])
    const onLeft = (e: string) => () => AI.fromArray([e + '1', e + '2'])
    await pipe(
      fa,
      _.orLeft(AIc.Chain)(onLeft),
      (r) => r({}),
      deepStrictEqual([E.right(1), E.left('err1'), E.left('err2'), E.right(3)])
    )
  })

  it.concurrent('filterOrElse', async () => {
    const fa: _.ReaderAsyncIterableEither<unknown, string, number> = () =>
      AI.fromArray([E.right(1), E.left('err'), E.right(3), E.right(4)])
    const predicate = (a: number): boolean => a % 2 === 0
    const onFalse = (a: number): string => `false(${a})`

    await pipe(
      fa,
      _.filterOrElse(AIc.Chain)(predicate, onFalse),
      (r) => r({}),
      deepStrictEqual([E.left('false(1)'), E.left('err'), E.left('false(3)'), E.right(4)])
    )
  })

  it.concurrent('filterOrElseW', async () => {
    const fa: _.ReaderAsyncIterableEither<unknown, string, number> = () =>
      AI.fromArray([E.right(1), E.left('err'), E.right(3), E.right(4)])
    const predicate = (a: number): boolean => a % 2 === 0
    const onFalse = (a: number): number => a * 2

    await pipe(
      fa,
      _.filterOrElseW(AIc.Chain)(predicate, onFalse),
      (r) => r({}),
      deepStrictEqual([E.left(2), E.left('err'), E.left(6), E.right(4)])
    )
  })

  it.concurrent('toUnion', async () => {
    await pipe(
      () => AI.fromArray([E.right(1), E.right(2), E.left('4'), E.right(3)]),
      _.toUnion,
      (r) => r({}),
      deepStrictEqual([1, 2, '4', 3])
    )
  })

  it.concurrent('fromNullable', async () => {
    const _fromNullable = _.fromNullable('null')
    await pipe(_fromNullable(2), (r) => r({}), deepStrictEqual([E.right(2)]))
    await pipe(_fromNullable(undefined), (r) => r({}), deepStrictEqual([E.left('null')]))
    await pipe(_fromNullable(null), (r) => r({}), deepStrictEqual([E.left('null')]))
  })

  it.concurrent('fromNullableK', async () => {
    const _fromNullableK = _.fromNullableK('null')
    await pipe(_fromNullableK(identity)(2), (r) => r({}), deepStrictEqual([E.right(2)]))
    await pipe(_fromNullableK(identity)(undefined), (r) => r({}), deepStrictEqual([E.left('null')]))
    await pipe(_fromNullableK(identity)(null), (r) => r({}), deepStrictEqual([E.left('null')]))
  })

  it.concurrent('throwError', async () => {
    const fa = _.throwError(1)
    await pipe(fa({}), deepStrictEqual([E.left(1)]))
  })

  it.concurrent('swap', async () => {
    await pipe(
      () => AI.fromArray([E.right(1), E.right(2), E.left(4), E.right(3)]),
      _.swap,
      (r) => r({}),
      deepStrictEqual([E.left(1), E.left(2), E.right(4), E.left(3)])
    )
  })

  it.concurrent('map', async () => {
    await pipe(
      () => AI.fromArray([E.right(1), E.right(2), E.left(4), E.right(3)]),
      _.map((a) => a + 3),
      (r) => r({}),
      deepStrictEqual([E.right(4), E.right(5), E.left(4), E.right(6)])
    )
  })

  it.concurrent('mapWithIndex', async () => {
    await pipe(
      () => AI.fromArray([E.right('a'), E.right('b'), E.left('d'), E.right('c')]),
      _.mapWithIndex((i, a) => `${a}${i}`),
      (r) => r({}),
      deepStrictEqual([E.right('a0'), E.right('b1'), E.left('d'), E.right('c3')])
    )
  })

  it.concurrent('bimap', async () => {
    await pipe(
      () => AI.fromArray([E.right(1), E.right(2), E.left(4), E.right(3)]),
      _.bimap(
        (e) => 'L' + e,
        (a) => 'R' + a
      ),
      (r) => r({}),
      deepStrictEqual([E.right('R1'), E.right('R2'), E.left('L4'), E.right('R3')])
    )
  })

  it.concurrent('mapLeft', async () => {
    await pipe(
      () => AI.fromArray([E.right(1), E.right(2), E.left(4), E.right(3)]),
      _.mapLeft((a) => a + 3),
      (r) => r({}),
      deepStrictEqual([E.right(1), E.right(2), E.left(7), E.right(3)])
    )
  })

  it.concurrent('ap', async () => {
    const double = (n: number): number => n * 2
    const mab = _.right(double)
    const ma = _.right(1)
    await pipe(mab, _.ap(ma), (r) => r({}), deepStrictEqual([E.right(2)]))
  })

  it.concurrent('apFirst', async () => {
    await pipe(_.of('a'), _.apFirst(_.of('b')), (f) => f({}), deepStrictEqual([E.right('a')]))
  })

  it.concurrent('apSecond', async () => {
    await pipe(_.of('a'), _.apSecond(_.of('b')), (f) => f({}), deepStrictEqual([E.right('b')]))
  })

  it.concurrent('apW', async () => {
    const double = (n: number): number => n * 2
    const mab = _.right<unknown, string, (n: number) => number>(double)
    const ma = _.right<unknown, number, number>(1)
    await pipe(mab, _.apW(ma), (r) => r({}), deepStrictEqual([E.right(2)]))
  })

  it.concurrent('chain', async () => {
    const fa: _.ReaderAsyncIterableEither<{ foo: string }, Error, number> = _.fromAsyncIterable(AI.fromArray([1, 2, 3]))
    const f = (a: number): _.ReaderAsyncIterableEither<{ foo: string }, Error, number> =>
      _.fromAsyncIterable(AI.fromArray([a, a + 1]))
    await pipe(fa, _.chain(AIc.Chain)(f), (r) => r({ foo: '' }), deepStrictEqual([1, 2, 2, 3, 3, 4].map(E.right)))
  })

  it.concurrent('chainW', async () => {
    const fa: _.ReaderAsyncIterableEither<{ foo: string }, Error, number> = _.fromAsyncIterable(AI.fromArray([1, 2, 3]))
    const f = (a: number): _.ReaderAsyncIterableEither<{ bar: string }, string, number> =>
      _.fromAsyncIterable(AI.fromArray([a, a + 1]))

    await pipe(
      fa,
      _.chainW(AIc.Chain)(f),
      (r) => r({ foo: '', bar: '' }),
      deepStrictEqual([1, 2, 2, 3, 3, 4].map(E.right))
    )
  })

  it.concurrent('chainWithIndex', async () => {
    const fa: _.ReaderAsyncIterableEither<{ foo: string }, Error, number> = _.fromAsyncIterable(AI.fromArray([1, 2, 3]))
    const f = (i: number, a: number): _.ReaderAsyncIterableEither<{ foo: string }, Error, number> =>
      _.fromAsyncIterable(AI.fromArray([a, a + i]))

    await pipe(
      fa,
      _.chainWithIndex(AIc.ChainWithIndex)(f),
      (r) => r({ foo: '' }),
      deepStrictEqual([1, 1, 2, 3, 3, 5].map(E.right))
    )
  })

  it.concurrent('chainAsyncIterableEitherK', async () => {
    const fa: _.ReaderAsyncIterableEither<{ foo: string }, Error, number> = _.fromAsyncIterable(AI.fromArray([1, 2, 3]))
    const f = (a: number) => AIE.fromAsyncIterable(AI.fromArray([a, a + 1]))
    await pipe(
      fa,
      _.chainAsyncIterableEitherK(AIc.Chain)(f),
      (r) => r({ foo: '' }),
      deepStrictEqual([1, 2, 2, 3, 3, 4].map(E.right))
    )
  })

  it.concurrent('chainFirstAsyncIterableEitherK', async () => {
    const fa: _.ReaderAsyncIterableEither<{ foo: string }, Error, number> = _.fromAsyncIterable(AI.fromArray([1, 2, 3]))
    const f = (a: number) => AIE.fromAsyncIterable(AI.fromArray([a, a + 1]))
    await pipe(
      fa,
      _.chainFirstAsyncIterableEitherK(AIc.Chain)(f),
      (r) => r({ foo: '' }),
      deepStrictEqual([1, 1, 2, 2, 3, 3].map(E.right))
    )
  })

  it.concurrent('flatten', async () => {
    const fa = _.fromAsyncIterable(
      AI.fromArray([
        _.fromAsyncIterable(AI.fromArray([1, 2, 3])),
        _.fromAsyncIterable(AI.fromArray([4, 5, 6])),
        _.fromAsyncIterable(AI.fromArray([7, 8, 9]))
      ] as Array<_.ReaderAsyncIterableEither<{ foo: string }, Error, number>>)
    )
    await pipe(
      fa,
      _.flatten(AIc.Chain),
      (r) => r({ foo: '' }),
      deepStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9].map(E.right))
    )
  })

  it.concurrent('flattenW', async () => {
    const f = (a: number): _.ReaderAsyncIterableEither<{ foo: string }, Error, number> =>
      _.fromAsyncIterable(AI.fromArray([a * 2, a * 3, a * 4]))
    const fa = pipe(
      _.fromAsyncIterable(AI.fromArray([1, 2, 3])) as _.ReaderAsyncIterableEither<{ bar: string }, string, number>,
      _.map(f)
    )
    await pipe(
      fa,
      _.flattenW(AIc.Chain),
      (r) => r({ foo: '', bar: '' }),
      deepStrictEqual([2, 3, 4, 4, 6, 8, 6, 9, 12].map(E.right))
    )
  })

  it.concurrent('alt', async () => {
    const fa: _.ReaderAsyncIterableEither<unknown, number, number> = _.fromAsyncIterable(AI.fromArray([1, 2, 3]))
    const that: _.ReaderAsyncIterableEither<unknown, number, number> = _.fromAsyncIterable(AI.fromArray([4, 5, 6]))

    await pipe(
      fa,
      _.alt(AIc.Chain)(() => that),
      (r) => r({}),
      deepStrictEqual([1, 2, 3].map(E.right))
    )
    await pipe(
      () => AI.fromArray([E.right(1), E.left(2), E.right(3)]),
      _.alt(AIc.Chain)(() => that),
      (r) => r({}),
      deepStrictEqual([1, 4, 5, 6, 3].map(E.right))
    )
  })

  it.concurrent('altW', async () => {
    const fa: _.ReaderAsyncIterableEither<unknown, number, number> = _.fromAsyncIterable(AI.fromArray([1, 2, 3]))
    const that: _.ReaderAsyncIterableEither<unknown, number, string> = _.fromAsyncIterable(
      AI.fromArray(['a', 'b', 'c'])
    )

    await pipe(
      fa,
      _.altW(AIc.Chain)(() => that),
      (r) => r({}),
      deepStrictEqual([1, 2, 3].map(E.right))
    )
    await pipe(
      () => AI.fromArray([E.right(1), E.left(2), E.right(3)]),
      _.altW(AIc.Chain)(() => that),
      (r) => r({}),
      deepStrictEqual([1, 'a', 'b', 'c', 3].map(E.right))
    )
  })

  it.concurrent('chainFirst', async () => {
    await pipe(
      _.fromAsyncIterable(AI.fromArray([1, 2, 3])),
      _.chainFirst(AIc.Chain)((a) => _.fromAsyncIterable(AI.fromArray([a, a + 1]))),
      (r) => r({}),
      deepStrictEqual([1, 1, 2, 2, 3, 3].map(E.right))
    )
  })

  it.concurrent('chainFirstW', async () => {
    await pipe(
      _.fromAsyncIterable(AI.fromArray([1, 2, 3])) as _.ReaderAsyncIterableEither<unknown, Error, number>,
      _.chainFirstW(AIc.Chain)(
        (a): _.ReaderAsyncIterableEither<unknown, string, number> => _.fromAsyncIterable(AI.fromArray([a, a + 1]))
      ),
      (r) => r({}),
      deepStrictEqual([1, 1, 2, 2, 3, 3].map(E.right))
    )
  })

  it.concurrent('bind', async () => {
    await pipe(
      _.fromAsyncIterable(AI.fromArray([1, 2, 3].map((a) => ({ a })))),
      _.bind(AIc.Chain)('foo', ({ a }) => _.fromAsyncIterable(AI.fromArray([a, a + 1]))),
      (r) => r({}),
      deepStrictEqual(
        [
          { a: 1, foo: 1 },
          { a: 1, foo: 2 },
          { a: 2, foo: 2 },
          { a: 2, foo: 3 },
          { a: 3, foo: 3 },
          { a: 3, foo: 4 }
        ].map(E.right)
      )
    )
  })

  it.concurrent('bindW', async () => {
    await pipe(
      _.fromAsyncIterable(AI.fromArray([1, 2, 3].map((a) => ({ a })))) as _.ReaderAsyncIterableEither<
        { foo: string },
        string,
        { a: number }
      >,
      _.bindW(AIc.Chain)(
        'foo',
        ({ a }): _.ReaderAsyncIterableEither<{ bar: string }, Error, number> =>
          _.fromAsyncIterable(AI.fromArray([a, a + 1]))
      ),
      (r) => r({ foo: '', bar: '' }),
      deepStrictEqual(
        [
          { a: 1, foo: 1 },
          { a: 1, foo: 2 },
          { a: 2, foo: 2 },
          { a: 2, foo: 3 },
          { a: 3, foo: 3 },
          { a: 3, foo: 4 }
        ].map(E.right)
      )
    )
  })

  it.concurrent('chainNullableK', async () => {
    await pipe(
      _.fromAsyncIterable(AI.fromArray([1, null, undefined, 4])) as _.ReaderAsyncIterableEither<
        unknown,
        string,
        number | null | undefined
      >,
      _.chainNullableK(AIc.Chain)('err')(identity),
      (r) => r({}),
      deepStrictEqual([E.right(1), E.left('err'), E.left('err'), E.right(4)])
    )
  })

  it.concurrent('chainOptionK', async () => {
    await pipe(
      _.fromAsyncIterable(AI.fromArray([1, null, undefined, 4])) as _.ReaderAsyncIterableEither<
        unknown,
        string,
        number | null | undefined
      >,
      _.chainOptionK(AIc.Chain)(() => 'err')(O.fromNullable),
      (r) => r({}),
      deepStrictEqual([E.right(1), E.left('err'), E.left('err'), E.right(4)])
    )
  })

  it.concurrent('chainEitherK', async () => {
    const f = (a: number) => (a % 2 === 0 ? E.right(a + 10) : E.left('err'))
    await pipe(
      _.fromAsyncIterable<number, unknown, string>(AI.fromArray([1, 2, 3, 4])),
      _.chainEitherK(AIc.Chain)(f),
      (r) => r({}),
      deepStrictEqual([E.left('err'), E.right(12), E.left('err'), E.right(14)])
    )
  })

  it.concurrent('chainEitherKW', async () => {
    const f = (a: number) => (a % 2 === 0 ? E.right(a + 10) : E.left(false))
    await pipe(
      _.fromAsyncIterable<number, unknown, string>(AI.fromArray([1, 2, 3, 4])),
      _.chainEitherKW(AIc.Chain)(f),
      (r) => r({}),
      deepStrictEqual([E.left(false), E.right(12), E.left(false), E.right(14)])
    )
  })

  it.concurrent('chainFirstEitherK', async () => {
    const f = (a: number) => (a % 2 === 0 ? E.right(a + 10) : E.left('err'))
    await pipe(
      _.fromAsyncIterable<number, unknown, string>(AI.fromArray([1, 2, 3, 4])),
      _.chainFirstEitherK(AIc.Chain)(f),
      (r) => r({}),
      deepStrictEqual([E.left('err'), E.right(2), E.left('err'), E.right(4)])
    )
  })

  it.concurrent('chainFirstEitherKW', async () => {
    const f = (a: number) => (a % 2 === 0 ? E.right(a + 10) : E.left(false))

    await pipe(
      _.fromAsyncIterable<number, unknown, string>(AI.fromArray([1, 2, 3, 4])),
      _.chainFirstEitherKW(AIc.Chain)(f),
      (r) => r({}),
      deepStrictEqual([E.left(false), E.right(2), E.left(false), E.right(4)])
    )
  })

  it.concurrent('chainIOK', async () => {
    const f = (a: number) => () => a * 2
    await pipe(
      _.fromAsyncIterable<number, unknown, string>(AI.fromArray([1, 2, 3, 4])),
      _.chainIOK(AIc.Chain)(f),
      (r) => r({}),
      deepStrictEqual([2, 4, 6, 8].map(E.right))
    )
  })

  it.concurrent('chainFirstIOK', async () => {
    const f = (a: number) => () => a * 2
    await pipe(
      _.fromAsyncIterable<number, unknown, string>(AI.fromArray([1, 2, 3, 4])),
      _.chainFirstIOK(AIc.Chain)(f),
      (r) => r({}),
      deepStrictEqual([1, 2, 3, 4].map(E.right))
    )
  })

  it.concurrent('chainIOEitherK', async () => {
    const f = (a: number) => () => a % 2 === 0 ? E.right(a + 10) : E.left('err')
    await pipe(
      _.fromAsyncIterable<number, unknown, string>(AI.fromArray([1, 2, 3, 4])),
      _.chainIOEitherK(AIc.Chain)(f),
      (r) => r({}),
      deepStrictEqual([E.left('err'), E.right(12), E.left('err'), E.right(14)])
    )
  })

  it.concurrent('chainIOEitherKW', async () => {
    const f = (a: number) => () => a % 2 === 0 ? E.right(a + 10) : E.left(false)

    await pipe(
      _.fromAsyncIterable<number, unknown, string>(AI.fromArray([1, 2, 3, 4])),
      _.chainIOEitherKW(AIc.Chain)(f),
      (r) => r({}),
      deepStrictEqual([E.left(false), E.right(12), E.left(false), E.right(14)])
    )
  })

  it.concurrent('chainAsyncIterableK', async () => {
    const f = (a: number) => AI.fromArray([a, a * 2])
    await pipe(
      _.fromAsyncIterable<number, unknown, string>(AI.fromArray([1, 2, 3, 4])),
      _.chainAsyncIterableK(AIc.Chain)(f),
      (r) => r({}),
      deepStrictEqual([1, 2, 2, 4, 3, 6, 4, 8].map(E.right))
    )
  })

  it.concurrent('chainFirstAsyncIterableK', async () => {
    const f = (a: number) => AI.fromArray([a, a * 2])
    await pipe(
      _.fromAsyncIterable<number, unknown, string>(AI.fromArray([1, 2, 3, 4])),
      _.chainFirstAsyncIterableK(AIc.Chain)(f),
      (r) => r({}),
      deepStrictEqual([1, 1, 2, 2, 3, 3, 4, 4].map(E.right))
    )
  })

  it.concurrent('concatW', async () => {
    await pipe(
      _.of<{ foo: string }, Error, string>('a'),
      _.concatW(_.of<{ bar: number }, string, number>(2)),
      (r) => r({ foo: '', bar: 1 }),
      deepStrictEqual([E.right('a'), E.right(2)])
    )
  })

  it.concurrent('concat', async () => {
    await pipe(
      _.of<{ foo: string }, Error, string>('a'),
      _.concat(_.of('b')),
      (r) => r({ foo: '' }),
      deepStrictEqual([E.right('a'), E.right('b')])
    )
  })
})
