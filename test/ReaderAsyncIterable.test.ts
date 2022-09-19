import * as assert from 'assert'
import * as _ from '../src/ReaderAsyncIterable'
import * as AI from '../src/AsyncIterable'
import * as AIc from '../src/AsyncIterable/Concat'
import * as IX from '@reactivex/ix-es5-cjs/asynciterable'
import { pipe } from 'fp-ts/lib/function'

const deepStrictEqual =
  <A, B extends A>(expected: ReadonlyArray<B>) =>
  async (fa: AsyncIterable<A>) => {
    assert.deepStrictEqual(await IX.toArray(fa), expected)
  }

describe('ReaderAsyncIterable', () => {
  it.concurrent('of', async () => {
    const fa = _.of(1)
    await pipe(fa({}), deepStrictEqual([1]))
  })

  it.concurrent('fromIO', async () => {
    const fa = _.fromIO(() => 1)
    await pipe(fa({}), deepStrictEqual([1]))
  })

  it.concurrent('fromTask', async () => {
    const fa = _.fromTask(async () => 1)
    await pipe(fa({}), deepStrictEqual([1]))
  })

  it.concurrent('fromAsyncIterable', async () => {
    const fa = _.fromAsyncIterable(AI.fromArray([1, 2, 3]))
    await pipe(fa({}), deepStrictEqual([1, 2, 3]))
  })

  it.concurrent('fromIOK', async () => {
    const f = (a: number) => () => a
    const app = pipe(2, _.fromIOK(f))
    await pipe(app({}), deepStrictEqual([2]))
  })

  it.concurrent('fromAsyncIterableK', async () => {
    const f = (a: number) => AI.fromArray([a, 2, 3])
    const fa = _.fromAsyncIterableK(f)
    await pipe(fa(1)({}), deepStrictEqual([1, 2, 3]))
  })

  it.concurrent('Do', async () => {
    await pipe(_.Do({}), deepStrictEqual([{}]))
  })

  it.concurrent('bindTo', async () => {
    const fa = _.fromAsyncIterable(AI.fromArray([1, 2, 3]))
    const app = pipe(fa, _.bindTo('v'))
    await pipe(app({}), deepStrictEqual([{ v: 1 }, { v: 2 }, { v: 3 }]))
  })

  it.concurrent('apS', async () => {
    const fa = _.fromAsyncIterable(AI.fromArray([1, 2, 3]))
    const app = pipe(fa, _.bindTo('a'), _.apS('b', _.of('b')))
    await pipe(
      app({}),
      deepStrictEqual([
        { a: 1, b: 'b' },
        { a: 2, b: 'b' },
        { a: 3, b: 'b' }
      ])
    )
  })

  it.concurrent('apSW', async () => {
    const fa = _.fromAsyncIterable(AI.fromArray([1, 2, 3]))
    const app = pipe(fa, _.bindTo('a'), _.apSW('b', _.of('b')))
    await pipe(
      app({}),
      deepStrictEqual([
        { a: 1, b: 'b' },
        { a: 2, b: 'b' },
        { a: 3, b: 'b' }
      ])
    )
  })

  it.concurrent('ApT', async () => {
    await pipe(_.ApT({}), deepStrictEqual([[]]))
  })

  it.concurrent('map', async () => {
    await pipe(
      () => AI.fromArray([1, 2, 3]),
      _.map((a) => a + 3),
      (r) => r({}),
      deepStrictEqual([4, 5, 6])
    )
  })

  it.concurrent('mapWithIndex', async () => {
    await pipe(
      () => AI.fromArray(['a', 'b', 'c']),
      _.mapWithIndex((i, a) => `${a}${i}`),
      (r) => r({}),
      deepStrictEqual(['a0', 'b1', 'c2'])
    )
  })

  it.concurrent('ap', async () => {
    const double = (n: number): number => n * 2
    const mab = _.of(double)
    const ma = _.of(1)
    await pipe(mab, _.ap(ma), (r) => r({}), deepStrictEqual([2]))
  })

  it.concurrent('apFirst', async () => {
    await pipe(_.of('a'), _.apFirst(_.of('b')), (f) => f({}), deepStrictEqual(['a']))
  })

  it.concurrent('apSecond', async () => {
    await pipe(_.of('a'), _.apSecond(_.of('b')), (f) => f({}), deepStrictEqual(['b']))
  })

  it.concurrent('apW', async () => {
    const double = (n: number): number => n * 2
    const mab = _.of<{ foo: string }, (a: number) => number>(double)
    const ma = _.of<{ bar: string }, number>(1)
    await pipe(mab, _.apW(ma), (r) => r({ foo: '', bar: '' }), deepStrictEqual([2]))
  })

  it.concurrent('chain', async () => {
    const fa: _.ReaderAsyncIterable<{ foo: string }, number> = _.fromAsyncIterable(AI.fromArray([1, 2, 3]))
    const f = (a: number): _.ReaderAsyncIterable<{ foo: string }, number> =>
      _.fromAsyncIterable(AI.fromArray([a, a + 1]))
    await pipe(fa, _.chain(AIc.Chain)(f), (r) => r({ foo: '' }), deepStrictEqual([1, 2, 2, 3, 3, 4]))
  })

  it.concurrent('chainW', async () => {
    const fa: _.ReaderAsyncIterable<{ foo: string }, number> = _.fromAsyncIterable(AI.fromArray([1, 2, 3]))
    const f = (a: number): _.ReaderAsyncIterable<{ bar: string }, number> =>
      _.fromAsyncIterable(AI.fromArray([a, a + 1]))

    await pipe(fa, _.chainW(AIc.Chain)(f), (r) => r({ foo: '', bar: '' }), deepStrictEqual([1, 2, 2, 3, 3, 4]))
  })

  it.concurrent('chainWithIndex', async () => {
    const fa: _.ReaderAsyncIterable<{ foo: string }, number> = _.fromAsyncIterable(AI.fromArray([1, 2, 3]))
    const f = (i: number, a: number): _.ReaderAsyncIterable<{ foo: string }, number> =>
      _.fromAsyncIterable(AI.fromArray([a, a + i]))

    await pipe(fa, _.chainWithIndex(AIc.ChainWithIndex)(f), (r) => r({ foo: '' }), deepStrictEqual([1, 1, 2, 3, 3, 5]))
  })

  it.concurrent('flatten', async () => {
    const fa = _.fromAsyncIterable(
      AI.fromArray([
        _.fromAsyncIterable(AI.fromArray([1, 2, 3])),
        _.fromAsyncIterable(AI.fromArray([4, 5, 6])),
        _.fromAsyncIterable(AI.fromArray([7, 8, 9]))
      ] as Array<_.ReaderAsyncIterable<{ foo: string }, number>>)
    )
    await pipe(fa, _.flatten(AIc.Chain), (r) => r({ foo: '' }), deepStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]))
  })

  it.concurrent('flattenW', async () => {
    const f = (a: number): _.ReaderAsyncIterable<{ foo: string }, number> =>
      _.fromAsyncIterable(AI.fromArray([a * 2, a * 3, a * 4]))
    const fa = pipe(
      _.fromAsyncIterable(AI.fromArray([1, 2, 3])) as _.ReaderAsyncIterable<{ bar: string }, number>,
      _.map(f)
    )
    await pipe(fa, _.flattenW(AIc.Chain), (r) => r({ foo: '', bar: '' }), deepStrictEqual([2, 3, 4, 4, 6, 8, 6, 9, 12]))
  })

  it.concurrent('chainFirst', async () => {
    await pipe(
      _.fromAsyncIterable(AI.fromArray([1, 2, 3])),
      _.chainFirst(AIc.Chain)((a) => _.fromAsyncIterable(AI.fromArray([a, a + 1]))),
      (r) => r({}),
      deepStrictEqual([1, 1, 2, 2, 3, 3])
    )
  })

  it.concurrent('chainFirstW', async () => {
    await pipe(
      _.fromAsyncIterable(AI.fromArray([1, 2, 3])) as _.ReaderAsyncIterable<{ foo: string }, number>,
      _.chainFirstW(AIc.Chain)(
        (a): _.ReaderAsyncIterable<{ bar: string }, number> => _.fromAsyncIterable(AI.fromArray([a, a + 1]))
      ),
      (r) => r({ foo: '', bar: '' }),
      deepStrictEqual([1, 1, 2, 2, 3, 3])
    )
  })

  it.concurrent('bind', async () => {
    await pipe(
      _.fromAsyncIterable(AI.fromArray([1, 2, 3].map((a) => ({ a })))),
      _.bind(AIc.Chain)('foo', ({ a }) => _.fromAsyncIterable(AI.fromArray([a, a + 1]))),
      (r) => r({}),
      deepStrictEqual([
        { a: 1, foo: 1 },
        { a: 1, foo: 2 },
        { a: 2, foo: 2 },
        { a: 2, foo: 3 },
        { a: 3, foo: 3 },
        { a: 3, foo: 4 }
      ])
    )
  })

  it.concurrent('bindW', async () => {
    await pipe(
      _.fromAsyncIterable(AI.fromArray([1, 2, 3].map((a) => ({ a })))) as _.ReaderAsyncIterable<
        { foo: string },
        { a: number }
      >,
      _.bindW(AIc.Chain)(
        'foo',
        ({ a }): _.ReaderAsyncIterable<{ bar: string }, number> => _.fromAsyncIterable(AI.fromArray([a, a + 1]))
      ),
      (r) => r({ foo: '', bar: '' }),
      deepStrictEqual([
        { a: 1, foo: 1 },
        { a: 1, foo: 2 },
        { a: 2, foo: 2 },
        { a: 2, foo: 3 },
        { a: 3, foo: 3 },
        { a: 3, foo: 4 }
      ])
    )
  })

  it.concurrent('chainIOK', async () => {
    const f = (a: number) => () => a * 2
    await pipe(
      _.fromAsyncIterable(AI.fromArray([1, 2, 3, 4])),
      _.chainIOK(AIc.Chain)(f),
      (r) => r({}),
      deepStrictEqual([2, 4, 6, 8])
    )
  })

  it.concurrent('chainFirstIOK', async () => {
    const f = (a: number) => () => a * 2
    await pipe(
      _.fromAsyncIterable(AI.fromArray([1, 2, 3, 4])),
      _.chainFirstIOK(AIc.Chain)(f),
      (r) => r({}),
      deepStrictEqual([1, 2, 3, 4])
    )
  })

  it.concurrent('chainAsyncIterableK', async () => {
    const f = (a: number) => AI.fromArray([a, a * 2])
    await pipe(
      _.fromAsyncIterable(AI.fromArray([1, 2, 3, 4])),
      _.chainAsyncIterableK(AIc.Chain)(f),
      (r) => r({}),
      deepStrictEqual([1, 2, 2, 4, 3, 6, 4, 8])
    )
  })

  it.concurrent('chainFirstAsyncIterableK', async () => {
    const f = (a: number) => AI.fromArray([a, a * 2])
    await pipe(
      _.fromAsyncIterable(AI.fromArray([1, 2, 3, 4])),
      _.chainFirstAsyncIterableK(AIc.Chain)(f),
      (r) => r({}),
      deepStrictEqual([1, 1, 2, 2, 3, 3, 4, 4])
    )
  })

  it.concurrent('concatW', async () => {
    await pipe(
      _.of<{ foo: string }, string>('a'),
      _.concatW(_.of<{ bar: number }, number>(2)),
      (r) => r({ foo: '', bar: 1 }),
      deepStrictEqual(['a', 2])
    )
  })

  it.concurrent('concat', async () => {
    await pipe(
      _.of<{ foo: string }, string>('a'),
      _.concat(_.of('b')),
      (r) => r({ foo: '' }),
      deepStrictEqual(['a', 'b'])
    )
  })
})
