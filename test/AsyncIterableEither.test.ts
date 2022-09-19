import * as assert from 'assert'
import * as _ from '../src/AsyncIterableEither'
import * as AI from '../src/AsyncIterable'
import * as AIc from '../src/AsyncIterable/Concat'
import * as AIEc from '../src/AsyncIterableEither/Concat'
import * as IX from '@reactivex/ix-es5-cjs/asynciterable'
import * as IXO from '@reactivex/ix-es5-cjs/asynciterable/operators'
import { identity, pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/Option'
import * as E from 'fp-ts/Either'
import { sequenceT } from 'fp-ts/lib/Apply'
import * as RA from 'fp-ts/ReadonlyArray'
import * as S from 'fp-ts/string'
import * as TE from 'fp-ts/TaskEither'
import { left, right } from 'fp-ts/Separated'

const deepStrictEqual =
  <A, B extends A>(expected: ReadonlyArray<B>) =>
  async (fa: AsyncIterable<A>) => {
    assert.deepStrictEqual(await IX.toArray(fa), expected)
  }

describe('AsyncIterableEither', () => {
  it.concurrent('of', async () => {
    const fa = _.of(1)
    await pipe(fa, deepStrictEqual([E.right(1)]))
  })

  it.concurrent('left', async () => {
    const fa = _.left(1)
    await pipe(fa, deepStrictEqual([E.left(1)]))
  })

  it.concurrent('right', async () => {
    const fa = _.right(1)
    await pipe(fa, deepStrictEqual([E.right(1)]))
  })

  it.concurrent('rightAsyncIterable', async () => {
    const fa = _.rightAsyncIterable(AI.fromArray([1, 2, 3]))
    await pipe(fa, deepStrictEqual([E.right(1), E.right(2), E.right(3)]))
  })

  it.concurrent('leftAsyncIterable', async () => {
    const fa = _.leftAsyncIterable(AI.fromArray([1, 2, 3]))
    await pipe(fa, deepStrictEqual([E.left(1), E.left(2), E.left(3)]))
  })

  it.concurrent('rightIO', async () => {
    const fa = _.rightIO(() => 1)
    await pipe(fa, deepStrictEqual([E.right(1)]))
  })

  it.concurrent('leftIO', async () => {
    const fa = _.leftIO(() => 1)
    await pipe(fa, deepStrictEqual([E.left(1)]))
  })

  it.concurrent('rightTask', async () => {
    const fa = _.rightTask(async () => 1)
    await pipe(fa, deepStrictEqual([E.right(1)]))
  })

  it.concurrent('leftTask', async () => {
    const fa = _.leftTask(async () => 1)
    await pipe(fa, deepStrictEqual([E.left(1)]))
  })

  it.concurrent('fromIO', async () => {
    const fa = _.fromIO(() => 1)
    await pipe(fa, deepStrictEqual([E.right(1)]))
  })

  it.concurrent('fromTask', async () => {
    const fa = _.fromTask(async () => 1)
    await pipe(fa, deepStrictEqual([E.right(1)]))
  })

  it.concurrent('fromTaskEither', async () => {
    await pipe(
      _.fromTaskEither(async () => E.right(1)),
      deepStrictEqual([E.right(1)])
    )
    await pipe(
      _.fromTaskEither(async () => E.left(1)),
      deepStrictEqual([E.left(1)])
    )
  })

  it.concurrent('fromAsyncIterable', async () => {
    const fa = _.fromAsyncIterable(AI.fromArray([1, 2, 3]))
    await pipe(fa, deepStrictEqual([E.right(1), E.right(2), E.right(3)]))
  })

  it.concurrent('fromOption', async () => {
    await pipe(
      O.some(1),
      _.fromOption(() => 'err'),
      deepStrictEqual([E.right(1)])
    )
    await pipe(
      O.none,
      _.fromOption(() => 'err'),
      deepStrictEqual([E.left('err')])
    )
  })

  it.concurrent('fromOptionK', async () => {
    const f = (a: number) => (a % 2 === 0 ? O.some(a) : O.none)
    await pipe(2, _.fromOptionK(() => 'err')(f), deepStrictEqual([E.right(2)]))
    await pipe(3, _.fromOptionK(() => 'err')(f), deepStrictEqual([E.left('err')]))
  })

  it.concurrent('fromEitherK', async () => {
    const f = (a: number) => (a % 2 === 0 ? E.right(a) : E.left('err'))
    await pipe(2, _.fromEitherK(f), deepStrictEqual([E.right(2)]))
    await pipe(3, _.fromEitherK(f), deepStrictEqual([E.left('err')]))
  })

  it.concurrent('fromIOK', async () => {
    const f = (a: number) => () => a
    await pipe(2, _.fromIOK(f), deepStrictEqual([E.right(2)]))
  })

  it.concurrent('fromAsyncIterableK', async () => {
    const f = (a: number) => AI.fromArray([a, 2, 3])
    const fa = _.fromAsyncIterableK(f)
    await pipe(fa(1), deepStrictEqual([E.right(1), E.right(2), E.right(3)]))
  })

  it.concurrent('getOnEmpty', async () => {
    const fa = _.fromAsyncIterable<number, Error>(AI.fromArray([1, 2, 3]))
    const onEmpty = () => _.fromAsyncIterable<number, Error>(AI.fromArray([4, 5, 6]))
    await pipe(fa, _.getOnEmpty(onEmpty), deepStrictEqual([E.right(1), E.right(2), E.right(3)]))
    await pipe(IX.empty(), _.getOnEmpty(onEmpty), deepStrictEqual([E.right(4), E.right(5), E.right(6)]))
  })

  it.concurrent('getOnEmptyW', async () => {
    const fa = _.fromAsyncIterable<number, Error>(AI.fromArray([1, 2, 3]))
    const onEmpty = () => _.fromAsyncIterable<string, string>(AI.fromArray(['a', 'b', 'c']))
    await pipe(fa, _.getOnEmptyW(onEmpty), deepStrictEqual([E.right(1), E.right(2), E.right(3)]))
    await pipe(IX.empty(), _.getOnEmpty(onEmpty), deepStrictEqual([E.right('a'), E.right('b'), E.right('c')]))
  })

  it.concurrent('Do', async () => {
    await pipe(_.Do, deepStrictEqual([E.right({})]))
  })

  it.concurrent('bindTo', async () => {
    const fa = _.fromAsyncIterable(AI.fromArray([1, 2, 3]))
    await pipe(fa, _.bindTo('v'), deepStrictEqual([E.right({ v: 1 }), E.right({ v: 2 }), E.right({ v: 3 })]))
  })

  it.concurrent('apS', async () => {
    const fa = _.fromAsyncIterable<number, string>(AI.fromArray([1, 2, 3]))
    await pipe(
      fa,
      _.bindTo('a'),
      _.apS('b', _.right<string, string>('b')),
      deepStrictEqual([E.right({ a: 1, b: 'b' }), E.right({ a: 2, b: 'b' }), E.right({ a: 3, b: 'b' })])
    )
  })

  it.concurrent('apSW', async () => {
    const fa = _.fromAsyncIterable<number, string>(AI.fromArray([1, 2, 3]))
    await pipe(
      fa,
      _.bindTo('a'),
      _.apSW('b', _.right<number, string>('b')),
      deepStrictEqual([E.right({ a: 1, b: 'b' }), E.right({ a: 2, b: 'b' }), E.right({ a: 3, b: 'b' })])
    )
  })

  it.concurrent('ApT', async () => {
    await pipe(_.ApT, deepStrictEqual([E.right([] as any)]))
  })

  it.concurrent('fromPredicate', async () => {
    const f = (a: number) => a % 2 === 0
    await pipe(
      2,
      _.fromPredicate(f, () => 'err'),
      deepStrictEqual([E.right(2)])
    )
    await pipe(
      3,
      _.fromPredicate(f, () => 'err'),
      deepStrictEqual([E.left('err')])
    )
  })

  it.concurrent('fromEither', async () => {
    await pipe(_.fromEither(E.right(1)), deepStrictEqual([E.right(1)]))
    await pipe(_.fromEither(E.left(1)), deepStrictEqual([E.left(1)]))
  })

  it.concurrent('fromIOEither', async () => {
    await pipe(
      _.fromIOEither(() => E.right(1)),
      deepStrictEqual([E.right(1)])
    )
    await pipe(
      _.fromIOEither(() => E.left(1)),
      deepStrictEqual([E.left(1)])
    )
  })

  it.concurrent('fromAsyncIterableOption', async () => {
    const fa = _.fromAsyncIterableOption(() => 'err')(AI.fromArray([O.some(1), O.none, O.some(3)]))
    await pipe(fa, deepStrictEqual([E.right(1), E.left('err'), E.right(3)]))
  })

  it.concurrent('match', async () => {
    const fa = AI.fromArray([E.right(1), E.left(2), E.right(3)])
    await pipe(
      fa,
      _.match(
        (e) => `L${e}`,
        (a) => `R${a}`
      ),
      deepStrictEqual(['R1', 'L2', 'R3'])
    )
  })

  it.concurrent('matchW', async () => {
    const fa = AI.fromArray([E.right(1), E.left(2), E.right(3)])
    await pipe(
      fa,
      _.matchW(
        (e) => e,
        (a) => `R${a}`
      ),
      deepStrictEqual(['R1', 2, 'R3'])
    )
  })

  it.concurrent('matchE', async () => {
    const fa = AI.fromArray([E.right(1), E.left(2), E.right(3)])
    await pipe(
      fa,
      _.matchE(AIc.Chain)(
        (e) => AI.fromArray([`L${e}`, `LL${e}`]),
        (a) => AI.fromArray([`R${a}`, `RR${a}`])
      ),
      deepStrictEqual(['R1', 'RR1', 'L2', 'LL2', 'R3', 'RR3'])
    )
  })

  it.concurrent('fold', async () => {
    const fa = AI.fromArray([E.right(1), E.left(2), E.right(3)])
    await pipe(
      fa,
      _.fold(AIc.Chain)(
        (e) => AI.fromArray([`L${e}`, `LL${e}`]),
        (a) => AI.fromArray([`R${a}`, `RR${a}`])
      ),
      deepStrictEqual(['R1', 'RR1', 'L2', 'LL2', 'R3', 'RR3'])
    )
  })

  it.concurrent('matchEW', async () => {
    const fa = AI.fromArray([E.right(1), E.left(2), E.right(3)])
    await pipe(
      fa,
      _.matchEW(AIc.Chain)(
        (e) => AI.fromArray([`L${e}`, `LL${e}`]),
        (a) => AI.fromArray([a, a * 2])
      ),
      deepStrictEqual([1, 2, 'L2', 'LL2', 3, 6])
    )
  })

  it.concurrent('foldW', async () => {
    const fa = AI.fromArray([E.right(1), E.left(2), E.right(3)])
    await pipe(
      fa,
      _.foldW(AIc.Chain)(
        (e) => AI.fromArray([`L${e}`, `LL${e}`]),
        (a) => AI.fromArray([a, a * 2])
      ),
      deepStrictEqual([1, 2, 'L2', 'LL2', 3, 6])
    )
  })

  it.concurrent('getOrElse', async () => {
    const fa = AI.fromArray([E.right(1), E.left(2), E.right(3)])
    await pipe(
      fa,
      _.getOrElse(AIc.Chain)((e) => AI.fromArray([e * 2, e * 3])),
      deepStrictEqual([1, 4, 6, 3])
    )
  })

  it.concurrent('getOrElseW', async () => {
    const fa = AI.fromArray([E.right(1), E.left(2), E.right(3)])
    await pipe(
      fa,
      _.getOrElseW(AIc.Chain)((e) => AI.fromArray([`L${e}`, `LL${e}`])),
      deepStrictEqual([1, 'L2', 'LL2', 3])
    )
  })

  it.concurrent('orElse', async () => {
    const fa = AI.fromArray([E.right(1), E.left(2), E.right(3)])
    await pipe(
      fa,
      _.orElse(AIc.Chain)((e) => _.fromAsyncIterable(AI.fromArray([e * 2, e * 3]))),
      deepStrictEqual([1, 4, 6, 3].map(E.right))
    )
  })

  it.concurrent('orElseW', async () => {
    const fa = AI.fromArray([E.right(1), E.left(2), E.right(3)])
    await pipe(
      fa,
      _.orElseW(AIc.Chain)((e) => _.fromAsyncIterable(AI.fromArray(['a' + e, 'b']))),
      deepStrictEqual([1, 'a2', 'b', 3].map(E.right))
    )
  })

  it.concurrent('orElseFirst', async () => {
    const fa = AI.fromArray([E.right(1), E.left(2), E.right(3)])
    const f = (a: number) => _.fromAsyncIterable<number, number>(AI.fromArray([a * 2, a * 3]))
    await pipe(fa, _.orElseFirst(AIc.Chain)(f), deepStrictEqual([E.right(1), E.left(2), E.left(2), E.right(3)]))
  })

  it.concurrent('orElseFirstW', async () => {
    const fa: _.AsyncIterableEither<number, number> = AI.fromArray([E.right(1), E.left(2), E.right(3)])
    const f = (a: number): _.AsyncIterableEither<Error, string> => _.fromAsyncIterable(AI.fromArray(['a' + a, 'b']))
    await pipe(fa, _.orElseFirstW(AIc.Chain)(f), deepStrictEqual([E.right(1), E.left(2), E.left(2), E.right(3)]))
  })

  it.concurrent('orElseFirstIOK', async () => {
    const fa = AI.fromArray([E.right(1), E.left(2), E.right(3)])
    const f = (a: number) => () => a * 2
    await pipe(fa, _.orElseFirstIOK(AIc.Chain)(f), deepStrictEqual([E.right(1), E.left(2), E.right(3)]))
  })

  it.concurrent('orElseFirstAsyncIterableK', async () => {
    const fa = AI.fromArray([E.right(1), E.left(2), E.right(3)])
    const f = (a: number) => AI.fromArray([a * 2, a * 3])
    await pipe(
      fa,
      _.orElseFirstAsyncIterableK(AIc.Chain)(f),
      deepStrictEqual([E.right(1), E.left(2), E.left(2), E.right(3)])
    )
  })

  it.concurrent('orLeft', async () => {
    const fa = AI.fromArray([E.right(1), E.left('err'), E.right(3)])
    const onLeft = (e: string) => AI.fromArray([e + '1', e + '2'])
    await pipe(
      fa,
      _.orLeft(AIc.Chain)(onLeft),
      deepStrictEqual([E.right(1), E.left('err1'), E.left('err2'), E.right(3)])
    )
  })

  it.concurrent('filterOrElse', async () => {
    const fa: _.AsyncIterableEither<string, number> = AI.fromArray([E.right(1), E.left('err'), E.right(3), E.right(4)])
    const predicate = (a: number): boolean => a % 2 === 0
    const onFalse = (a: number): string => `false(${a})`

    await pipe(
      fa,
      _.filterOrElse(AIc.Chain)(predicate, onFalse),
      deepStrictEqual([E.left('false(1)'), E.left('err'), E.left('false(3)'), E.right(4)])
    )
  })

  it.concurrent('filterOrElseW', async () => {
    const fa: _.AsyncIterableEither<string, number> = AI.fromArray([E.right(1), E.left('err'), E.right(3), E.right(4)])
    const predicate = (a: number): boolean => a % 2 === 0
    const onFalse = (a: number): number => a * 2

    await pipe(
      fa,
      _.filterOrElseW(AIc.Chain)(predicate, onFalse),
      deepStrictEqual([E.left(2), E.left('err'), E.left(6), E.right(4)])
    )
  })

  it.concurrent('tryCatch', async () => {
    const factoryFailure = () =>
      pipe(
        AI.fromArray([1, 2]),
        IXO.concatMap((a) => (a === 2 ? IX.throwError('error') : IX.of(a)))
      )

    const factorySuccess = () => AI.fromArray([1, 2])

    await pipe(
      _.tryCatch(factoryFailure, (err) => `map${err}`),
      deepStrictEqual([E.right(1), E.left('maperror')])
    )

    await pipe(
      _.tryCatch(factorySuccess, (err) => `map${err}`),
      deepStrictEqual([E.right(1), E.right(2)])
    )
  })

  it.concurrent('tryCatchK', async () => {
    const f = (a: number) =>
      pipe(
        AI.fromArray([a, 2]),
        IXO.concatMap((a) => (a === 2 ? IX.throwError('error') : IX.of(a)))
      )
    await pipe(_.tryCatchK(f, (err) => `map${err}`)(1), deepStrictEqual([E.right(1), E.left('maperror')]))

    const fSuccess = (a: number) => AI.fromArray([a, 2])
    await pipe(_.tryCatchK(fSuccess, (err) => `map${err}`)(1), deepStrictEqual([E.right(1), E.right(2)]))
  })

  it.concurrent('toUnion', async () => {
    await pipe(
      AI.fromArray([E.right(1), E.right(2), E.left('4'), E.right(3)]),
      _.toUnion,
      deepStrictEqual([1, 2, '4', 3])
    )
  })

  it.concurrent('fromNullable', async () => {
    const _fromNullable = _.fromNullable('null')
    await pipe(_fromNullable(2), deepStrictEqual([E.right(2)]))
    await pipe(_fromNullable(undefined), deepStrictEqual([E.left('null')]))
    await pipe(_fromNullable(null), deepStrictEqual([E.left('null')]))
  })

  it.concurrent('fromNullableK', async () => {
    const _fromNullableK = _.fromNullableK('null')
    await pipe(_fromNullableK(identity)(2), deepStrictEqual([E.right(2)]))
    await pipe(_fromNullableK(identity)(undefined), deepStrictEqual([E.left('null')]))
    await pipe(_fromNullableK(identity)(null), deepStrictEqual([E.left('null')]))
  })

  it.concurrent('fromAsyncIterableOptionK', async () => {
    const f = (a: number) => AI.fromArray([O.some(a), O.none, O.some(3)])
    const fa = _.fromAsyncIterableOptionK(() => 'err')(f)
    await pipe(fa(1), deepStrictEqual([E.right(1), E.left('err'), E.right(3)]))
  })

  it.concurrent('fromIOEitherK', async () => {
    await pipe(_.fromIOEitherK((a: number) => () => E.right(a))(1), deepStrictEqual([E.right(1)]))
    await pipe(_.fromIOEitherK((a: number) => () => E.left(a))(1), deepStrictEqual([E.left(1)]))
  })

  it.concurrent('throwError', async () => {
    const fa = _.throwError(1)
    await pipe(fa, deepStrictEqual([E.left(1)]))
  })

  it.concurrent('swap', async () => {
    await pipe(
      AI.fromArray([E.right(1), E.right(2), E.left(4), E.right(3)]),
      _.swap,
      deepStrictEqual([E.left(1), E.left(2), E.right(4), E.left(3)])
    )
  })

  it.concurrent('map', async () => {
    await pipe(
      AI.fromArray([E.right(1), E.right(2), E.left(4), E.right(3)]),
      _.map((a) => a + 3),
      deepStrictEqual([E.right(4), E.right(5), E.left(4), E.right(6)])
    )
  })

  it.concurrent('mapWithIndex', async () => {
    await pipe(
      AI.fromArray([E.right('a'), E.right('b'), E.left('d'), E.right('c')]),
      _.mapWithIndex((i, a) => `${a}${i}`),
      deepStrictEqual([E.right('a0'), E.right('b1'), E.left('d'), E.right('c3')])
    )
  })

  it.concurrent('bimap', async () => {
    await pipe(
      AI.fromArray([E.right(1), E.right(2), E.left(4), E.right(3)]),
      _.bimap(
        (e) => 'L' + e,
        (a) => 'R' + a
      ),
      deepStrictEqual([E.right('R1'), E.right('R2'), E.left('L4'), E.right('R3')])
    )
  })

  it.concurrent('mapLeft', async () => {
    await pipe(
      AI.fromArray([E.right(1), E.right(2), E.left(4), E.right(3)]),
      _.mapLeft((a) => a + 3),
      deepStrictEqual([E.right(1), E.right(2), E.left(7), E.right(3)])
    )
  })

  it.concurrent('ap', async () => {
    const double = (n: number): number => n * 2
    const mab = _.right(double)
    const ma = _.right(1)
    await pipe(mab, _.ap(ma), deepStrictEqual([E.right(2)]))
  })

  it.concurrent('apW', async () => {
    const double = (n: number): number => n * 2
    const mab = _.right<string, (n: number) => number>(double)
    const ma = _.right<number, number>(1)
    await pipe(mab, _.apW(ma), deepStrictEqual([E.right(2)]))
  })

  it.concurrent('apFirst', async () => {
    await pipe(_.of('a'), _.apFirst(_.of('b')), deepStrictEqual([E.right('a')]))
  })

  it.concurrent('apSecond', async () => {
    await pipe(_.of('a'), _.apSecond(_.of('b')), deepStrictEqual([E.right('b')]))
  })

  it.concurrent('apFirstW"', async () => {
    await pipe(_.of('a'), _.apFirstW(_.of(2)), deepStrictEqual([E.right('a')]))
  })

  it.concurrent('apSecondW"', async () => {
    await pipe(_.of('a'), _.apSecondW(_.of(2)), deepStrictEqual([E.right(2)]))
  })

  it.concurrent('chain', async () => {
    await pipe(
      _.fromAsyncIterable(AI.fromArray([1, 2, 3])),
      _.chain(AIc.Chain)((a) => _.fromAsyncIterable(AI.fromArray([a, a + 1]))),
      deepStrictEqual([1, 2, 2, 3, 3, 4].map(E.right))
    )
  })

  it.concurrent('chainW', async () => {
    await pipe(
      _.fromAsyncIterable<number, Error>(AI.fromArray([1, 2, 3])),
      _.chainW(AIc.Chain)((a) => _.fromAsyncIterable<number, string>(AI.fromArray([a, a + 1]))),
      deepStrictEqual([1, 2, 2, 3, 3, 4].map(E.right))
    )
  })

  it.concurrent('chainWithIndex', async () => {
    const f = (i: number, a: number) => _.fromAsyncIterable(AI.fromArray([a, a + i]))
    await pipe(
      _.fromAsyncIterable(AI.fromArray([1, 2, 3])),
      _.chainWithIndex(AIc.ChainWithIndex)(f),
      deepStrictEqual([1, 1, 2, 3, 3, 5].map(E.right))
    )
  })

  it.concurrent('flatten', async () => {
    const fa = _.fromAsyncIterable(
      AI.fromArray([
        _.fromAsyncIterable(AI.fromArray([1, 2, 3])),
        _.fromAsyncIterable(AI.fromArray([4, 5, 6])),
        _.fromAsyncIterable(AI.fromArray([7, 8, 9]))
      ])
    )
    await pipe(fa, _.flatten(AIc.Chain), deepStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9].map(E.right)))
  })

  it.concurrent('flattenW', async () => {
    const fa = _.fromAsyncIterable<_.AsyncIterableEither<number, number>, string>(
      AI.fromArray([
        _.fromAsyncIterable<number, number>(AI.fromArray([1, 2, 3])),
        _.fromAsyncIterable<number, number>(AI.fromArray([4, 5, 6])),
        _.fromAsyncIterable<number, number>(AI.fromArray([7, 8, 9]))
      ])
    )
    await pipe(fa, _.flattenW(AIc.Chain), deepStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9].map(E.right)))
  })

  it.concurrent('chainFirst', async () => {
    await pipe(
      _.fromAsyncIterable(AI.fromArray([1, 2, 3])),
      _.chainFirst(AIc.Chain)((a) => _.fromAsyncIterable(AI.fromArray([a, a + 1]))),
      deepStrictEqual([1, 1, 2, 2, 3, 3].map(E.right))
    )
  })

  it.concurrent('chainFirstW', async () => {
    await pipe(
      _.fromAsyncIterable<number, Error>(AI.fromArray([1, 2, 3])),
      _.chainFirstW(AIc.Chain)((a) => _.fromAsyncIterable<number, string>(AI.fromArray([a, a + 1]))),
      deepStrictEqual([1, 1, 2, 2, 3, 3].map(E.right))
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
        ].map(E.right)
      )
    )
  })

  it.concurrent('bindW', async () => {
    await pipe(
      _.fromAsyncIterable<{ a: number }, string>(AI.fromArray([1, 2, 3].map((a) => ({ a })))),
      _.bindW(AIc.Chain)('foo', ({ a }) => _.fromAsyncIterable<number, Error>(AI.fromArray([a, a + 1]))),
      (b) => b,
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
      _.fromAsyncIterable<number | null | undefined, string>(AI.fromArray([1, null, undefined, 4])),
      _.chainNullableK(AIc.Chain)('err')(identity),
      deepStrictEqual([E.right(1), E.left('err'), E.left('err'), E.right(4)])
    )
  })

  it.concurrent('chainOptionK', async () => {
    await pipe(
      _.fromAsyncIterable<number | null | undefined, string>(AI.fromArray([1, null, undefined, 4])),
      _.chainOptionK(AIc.Chain)(() => 'err')(O.fromNullable),
      deepStrictEqual([E.right(1), E.left('err'), E.left('err'), E.right(4)])
    )
  })

  it.concurrent('chainEitherK', async () => {
    const f = (a: number) => (a % 2 === 0 ? E.right(a + 10) : E.left('err'))
    await pipe(
      _.fromAsyncIterable<number, string>(AI.fromArray([1, 2, 3, 4])),
      _.chainEitherK(AIc.Chain)(f),
      deepStrictEqual([E.left('err'), E.right(12), E.left('err'), E.right(14)])
    )
  })

  it.concurrent('chainEitherKW', async () => {
    const f = (a: number) => (a % 2 === 0 ? E.right(a + 10) : E.left(false))
    await pipe(
      _.fromAsyncIterable<number, string>(AI.fromArray([1, 2, 3, 4])),
      _.chainEitherKW(AIc.Chain)(f),
      deepStrictEqual([E.left(false), E.right(12), E.left(false), E.right(14)])
    )
  })

  it.concurrent('chainFirstEitherK', async () => {
    const f = (a: number) => (a % 2 === 0 ? E.right(a + 10) : E.left('err'))
    await pipe(
      _.fromAsyncIterable<number, string>(AI.fromArray([1, 2, 3, 4])),
      _.chainFirstEitherK(AIc.Chain)(f),
      deepStrictEqual([E.left('err'), E.right(2), E.left('err'), E.right(4)])
    )
  })

  it.concurrent('chainFirstEitherKW', async () => {
    const f = (a: number) => (a % 2 === 0 ? E.right(a + 10) : E.left(false))

    await pipe(
      _.fromAsyncIterable<number, string>(AI.fromArray([1, 2, 3, 4])),
      _.chainFirstEitherKW(AIc.Chain)(f),
      deepStrictEqual([E.left(false), E.right(2), E.left(false), E.right(4)])
    )
  })

  it.concurrent('chainIOK', async () => {
    const f = (a: number) => () => a * 2
    await pipe(
      _.fromAsyncIterable<number, string>(AI.fromArray([1, 2, 3, 4])),
      _.chainIOK(AIc.Chain)(f),
      deepStrictEqual([2, 4, 6, 8].map(E.right))
    )
  })

  it.concurrent('chainFirstIOK', async () => {
    const f = (a: number) => () => a * 2
    await pipe(
      _.fromAsyncIterable<number, string>(AI.fromArray([1, 2, 3, 4])),
      _.chainFirstIOK(AIc.Chain)(f),
      deepStrictEqual([1, 2, 3, 4].map(E.right))
    )
  })

  it.concurrent('chainIOEitherK', async () => {
    const f = (a: number) => () => a % 2 === 0 ? E.right(a + 10) : E.left('err')
    await pipe(
      _.fromAsyncIterable<number, string>(AI.fromArray([1, 2, 3, 4])),
      _.chainIOEitherK(AIc.Chain)(f),
      deepStrictEqual([E.left('err'), E.right(12), E.left('err'), E.right(14)])
    )
  })

  it.concurrent('chainIOEitherKW', async () => {
    const f = (a: number) => () => a % 2 === 0 ? E.right(a + 10) : E.left(false)

    await pipe(
      _.fromAsyncIterable<number, string>(AI.fromArray([1, 2, 3, 4])),
      _.chainIOEitherKW(AIc.Chain)(f),
      deepStrictEqual([E.left(false), E.right(12), E.left(false), E.right(14)])
    )
  })

  it.concurrent('chainAsyncIterableK', async () => {
    const f = (a: number) => AI.fromArray([a, a * 2])
    await pipe(
      _.fromAsyncIterable<number, string>(AI.fromArray([1, 2, 3, 4])),
      _.chainAsyncIterableK(AIc.Chain)(f),
      deepStrictEqual([1, 2, 2, 4, 3, 6, 4, 8].map(E.right))
    )
  })

  it.concurrent('chainFirstAsyncIterableK', async () => {
    const f = (a: number) => AI.fromArray([a, a * 2])
    await pipe(
      _.fromAsyncIterable<number, string>(AI.fromArray([1, 2, 3, 4])),
      _.chainFirstAsyncIterableK(AIc.Chain)(f),
      deepStrictEqual([1, 1, 2, 2, 3, 3, 4, 4].map(E.right))
    )
  })

  it.concurrent('chainAsyncIterableOptionK', async () => {
    const f = (a: number) => AI.fromArray([O.some(a * 2), O.none])
    await pipe(
      _.fromAsyncIterable<number, string>(AI.fromArray([1, 2, 3])),
      _.chainAsyncIterableOptionK(AIc.Chain)(() => 'err')(f),
      deepStrictEqual([E.right(2), E.left('err'), E.right(4), E.left('err'), E.right(6), E.left('err')])
    )
  })

  it.concurrent('chainAsyncIterableOptionKW', async () => {
    const f = (a: number) => AI.fromArray([O.some(a * 2), O.none])
    await pipe(
      _.fromAsyncIterable<number, boolean>(AI.fromArray([1, 2, 3])),
      _.chainAsyncIterableOptionKW(AIc.Chain)(() => 'err')(f),
      deepStrictEqual([E.right(2), E.left('err'), E.right(4), E.left('err'), E.right(6), E.left('err')])
    )
  })

  it.concurrent('getApplicativeAsyncIterableValidation', async () => {
    const A = _.getApplicativeAsyncIterableValidation(AI.Applicative, S.Semigroup)
    await pipe(
      sequenceT(A)(AI.fromArray([E.left('a'), E.left('c')]), _.left('b')),
      deepStrictEqual([E.left('ab'), E.left('cb')])
    )
  })

  describe('getCompactable', () => {
    const C = _.getCompactable(S.Monoid)

    it.concurrent('compact', async () => {
      await pipe(
        C.compact(AI.fromArray([E.right(O.some(1)), E.right(O.some(2))])),
        deepStrictEqual([E.right(1), E.right(2)])
      )
    })

    it.concurrent('separate', async () => {
      const s1 = C.separate(AI.fromArray([E.left('a'), E.left('b')]))
      await pipe(left(s1), deepStrictEqual([E.left('a'), E.left('b')]))
      await pipe(right(s1), deepStrictEqual([E.left('a'), E.left('b')]))

      const s2 = C.separate(AI.fromArray([E.right(E.left('a')), E.right(E.left('b'))]))
      await pipe(left(s2), deepStrictEqual([E.right('a'), E.right('b')]))
      await pipe(right(s2), deepStrictEqual([E.left(''), E.left('')]))

      const s3 = C.separate(AI.fromArray([E.right(E.right(1)), E.right(E.right(2))]))
      await pipe(left(s3), deepStrictEqual([E.left(''), E.left('')]))
      await pipe(right(s3), deepStrictEqual([E.right(1), E.right(2)]))
    })
  })

  describe('getFilterable', () => {
    const F_ = _.getFilterable(RA.getMonoid<string>())

    it.concurrent('filter', async () => {
      await pipe(
        F_.filter(
          AI.fromArray([E.right(-1), E.right(0), E.left(['err']), E.right(1)]) as _.AsyncIterableEither<
            Array<string>,
            number
          >,
          (n) => n > 0
        ),
        deepStrictEqual([E.left([]), E.left([]), E.left(['err']), E.right(1)])
      )
      await pipe(
        F_.filter(_.right(-1), (n) => n > 0),
        deepStrictEqual([E.left([])])
      )
      await pipe(
        F_.filter(_.left(['a']), (n) => n > 0),
        deepStrictEqual([E.left(['a'])])
      )
    })

    it.concurrent('filterMap', async () => {
      const lengthF = (s: string) => (s.length > 1 ? O.some(s.length) : O.none)
      await pipe(F_.filterMap(_.right('aaa'), lengthF), deepStrictEqual([E.right(3)]))
      await pipe(F_.filterMap(_.right('a'), lengthF), deepStrictEqual([E.left([])]))
      await pipe(F_.filterMap(_.left<ReadonlyArray<string>, string>(['e']), lengthF), deepStrictEqual([E.left(['e'])]))
    })

    it.concurrent('partition', async () => {
      const s = F_.partition(_.right('a'), (s) => s.length > 2)
      await pipe(left(s), deepStrictEqual([E.right('a')]))
      await pipe(right(s), deepStrictEqual([E.left([])]))
    })

    it.concurrent('partitionMap', async () => {
      const s = F_.partitionMap(_.right('a'), (s) => (s.length > 2 ? E.right(s.length) : E.left(false)))

      await pipe(left(s), deepStrictEqual([E.right(false)]))
      await pipe(right(s), deepStrictEqual([E.left([])]))
    })
  })

  describe('getMonoid', () => {
    const M_ = _.getMonoid(AIEc.getSemigroup<unknown, number>())

    it.concurrent('concat', async () => {
      await pipe(
        M_.concat(_.fromAsyncIterable(AI.fromArray([1, 2])), _.fromAsyncIterable(AI.fromArray([3, 4]))),
        deepStrictEqual([1, 2, 3, 4].map(E.right))
      )
    })

    it.concurrent('empty', async () => {
      await pipe(M_.empty, deepStrictEqual([]))
    })
  })

  describe('FunctorWithIndex', () => {
    const F_ = _.FunctorWithIndex
    it.concurrent('mapWithIndex', async () => {
      await pipe(
        F_.mapWithIndex(_.fromAsyncIterable(IX.from(['a', 'b', 'c'])), (i, a) => `${a}${i}`),
        deepStrictEqual(['a0', 'b1', 'c2'].map(E.right))
      )
    })
  })

  describe('ChainWithIndex', () => {
    const C_ = _.getChainWithIndex(AIc.ChainWithIndex)

    it.concurrent('mapWithIndex', async () => {
      await pipe(
        C_.chainWithIndex(_.fromAsyncIterable(IX.from(['a', 'b', 'c'])), (i, a) => _.of(`${a}${i}`)),
        deepStrictEqual(['a0', 'b1', 'c2'].map(E.right))
      )
    })
  })

  it.concurrent('toTaskEitherW', async () => {
    assert.deepStrictEqual(
      await pipe(
        _.right<Error, number>(4),
        _.toTaskEitherW(() => TE.right<string, string>('a'))
      )(),
      E.right(4)
    )
    assert.deepStrictEqual(
      await pipe(
        _.left(4),
        _.toTaskEitherW(() => TE.right('a'))
      )(),
      E.left(4)
    )
    assert.deepStrictEqual(
      await pipe(
        AI.empty,
        _.toTaskEitherW(() => TE.right('a'))
      )(),
      E.right('a')
    )
    assert.deepStrictEqual(
      await pipe(
        AI.empty,
        _.toTaskEitherW(() => TE.left('a'))
      )(),
      E.left('a')
    )
  })

  it.concurrent('toTaskEither', async () => {
    assert.deepStrictEqual(
      await pipe(
        _.right<Error, number>(4),
        _.toTaskEither(() => TE.right(1))
      )(),
      E.right(4)
    )
    assert.deepStrictEqual(
      await pipe(
        _.left<number, string>(4),
        _.toTaskEither(() => TE.right('a'))
      )(),
      E.left(4)
    )
    assert.deepStrictEqual(
      await pipe(
        AI.empty,
        _.toTaskEither(() => TE.right('a'))
      )(),
      E.right('a')
    )
    assert.deepStrictEqual(
      await pipe(
        AI.empty,
        _.toTaskEither(() => TE.left('a'))
      )(),
      E.left('a')
    )
  })

  it.concurrent('concatW', async () => {
    await pipe(
      _.right<Error, string>('a'),
      _.concatW(_.right<string, number>(2)),
      deepStrictEqual([E.right('a'), E.right(2)])
    )
  })

  it.concurrent('concat', async () => {
    await pipe(_.right<Error, string>('a'), _.concat(_.right('b')), deepStrictEqual([E.right('a'), E.right('b')]))
  })
})
