import * as assert from 'assert'
import * as _ from '../src/AsyncIterableEither'
import * as IX from 'ix/asynciterable'
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/Option'
import * as E from 'fp-ts/Either'
import * as N from 'fp-ts/number'
import { eqStrict } from 'fp-ts/lib/Eq'

const deepStrictEqual =
  <A, B extends A>(expected: ReadonlyArray<B>) =>
  async (fa: AsyncIterable<A>) => {
    assert.deepStrictEqual(await IX.toArray(fa), expected)
  }

describe('AsyncIterable', () => {
  it.concurrent('of', async () => {
    const fa = _.of(1)
    await deepStrictEqual([1])(pipe(fa))
  })

  it.concurrent('map', async () => {
    await pipe(
      IX.from([E.right(1), E.right(2), E.left(4), E.right(3)]),
      _.map((a) => a + 3),
      deepStrictEqual([E.right(4), E.right(5), E.left(4), E.right(6)])
    )
  })

  it.concurrent('mapWithIndex', async () => {
    await pipe(
      IX.from([E.right('a'), E.right('b'), E.left('d'), E.right('c')]),
      _.mapWithIndex((i, a) => `${a}${i}`),
      deepStrictEqual([E.right('a0'), E.right('b1'), E.left('d'), E.right('c2')])
    )
  })

  it.concurrent('filterMapWithIndex', async () => {
    const fa = IX.from([E.right(1), E.right(2), E.left(4), E.right(3)])
    const f = (i: number, a: number) => (a >= 2 ? O.some(i + a) : O.none)
    await pipe(fa, _.filterMapWithIndex(f), deepStrictEqual([E.right(3), E.right(5)]))
  })

  it.concurrent('partitionMapWithIndex', async () => {
    const fa = IX.from([E.right(1), E.right(2), E.left(5), E.right(3), E.right(4)])

    const f = (i: number, a: number): E.Either<number, number> => (i % 2 === 0 ? E.left(a + i) : E.right(a + i))
    const { left, right } = pipe(fa, _.partitionMapWithIndex(f))

    await pipe(left, deepStrictEqual([E.left(1), E.left(5)]))
    await pipe(right, deepStrictEqual([E.right(3), E.right(7)]))
  })

  it.concurrent('partitionWithIndex', async () => {
    const fa = IX.from([1, 2, 3, 4])
    const f = (i: number, _a: number) => i % 2 === 0
    const { left, right } = pipe(fa, _.partitionWithIndex(f))

    await pipe(left, deepStrictEqual([1, 3]))
    await pipe(right, deepStrictEqual([2, 4]))
  })

  it.concurrent('filterWithIndex', async () => {
    const fa = IX.from([1, 2, 3, 4])
    const f = (i: number, _a: number) => i % 2 === 0
    await pipe(fa, _.filterWithIndex(f), deepStrictEqual([1, 3]))
  })

  it.concurrent('filterMap', async () => {
    const fa = IX.from([1, 2, 3, 4])
    const f = (a: number) => (a % 2 === 0 ? O.some(a + 10) : O.none)
    await pipe(fa, _.filterMap(f), deepStrictEqual([12, 14]))
  })

  it.concurrent('partitionMap', async () => {
    const fa = IX.from([1, 2, 3, 4])
    const f = (a: number): E.Either<number, number> => (a % 2 === 0 ? E.left(a + 10) : E.right(a + 20))
    const { left, right } = pipe(fa, _.partitionMap(f))

    await pipe(left, deepStrictEqual([12, 14]))
    await pipe(right, deepStrictEqual([21, 23]))
  })

  it.concurrent('filter', async () => {
    const fa = IX.from([1, 2, 3, 4])
    const f = (a: number) => a % 2 === 0
    await pipe(fa, _.filter(f), deepStrictEqual([2, 4]))
  })

  it.concurrent('partition', async () => {
    const fa = IX.from([1, 2, 3, 4])
    const f = (a: number) => a % 2 === 0
    const { left, right } = pipe(fa, _.partition(f))

    await pipe(left, deepStrictEqual([2, 4]))
    await pipe(right, deepStrictEqual([1, 3]))
  })

  it.concurrent('compact', async () => {
    await pipe(IX.from([]), _.compact, deepStrictEqual([]))
    await pipe(IX.from([O.some(1), O.some(2), O.some(3)]), _.compact, deepStrictEqual([1, 2, 3]))
    await pipe(IX.from([O.some(1), O.none, O.some(3)]), _.compact, deepStrictEqual([1, 3]))
  })

  it.concurrent('separate', async () => {
    const { left, right } = await pipe(IX.from([E.right(1), E.left(2), E.right(3)]), _.separate)
    await pipe(left, deepStrictEqual([2]))
    await pipe(right, deepStrictEqual([1, 3]))
  })

  it.concurrent('prependW', async () => {
    const fa = IX.from([E.right(1), E.right(2), E.left(4), E.right(3)])
    await pipe(fa, _.prependW('a'), deepStrictEqual(['a', 1, 2, 3]))
  })

  it.concurrent('prepend', async () => {
    const fa = IX.from([E.right(1), E.right(2), E.left(4), E.right(3)])
    await pipe(fa, _.prepend(0), deepStrictEqual([0, 1, 2, 3]))
  })

  it.concurrent('appendW', async () => {
    const fa = IX.from([E.right(1), E.right(2), E.left(4), E.right(3)])
    await pipe(fa, _.appendW('a'), deepStrictEqual([1, 2, 3, 'a']))
  })

  it.concurrent('append', async () => {
    const fa = IX.from([E.right(1), E.right(2), E.left(4), E.right(3)])
    await pipe(fa, _.append(0), deepStrictEqual([1, 2, 3, 0]))
  })

  it.concurrent('makeBy', async () => {
    const fa = _.makeBy(3, (a) => a + 10)
    await pipe(fa, deepStrictEqual([10, 11, 12]))
  })

  it.concurrent('replicate', async () => {
    const fa = _.replicate(3, 5)
    await pipe(fa, deepStrictEqual([5, 5, 5]))
  })

  it.concurrent('fromPredicate', async () => {
    const f = (a: number) => a % 2 === 0
    await pipe(2, _.fromPredicate(f), deepStrictEqual([2]))
    await pipe(3, _.fromPredicate(f), deepStrictEqual([]))
  })

  it.concurrent('fromArray', async () => {
    const fa = _.fromArray([1, 2, 3])
  await pipe(fa, deepStrictEqual([1, 2, 3]))
})

it.concurrent('fromIO', async () => {
  let initialized = false
  const fa = _.fromIO(() => {
    initialized = true
    return 5
  })
  assert.deepStrictEqual(false, initialized)
  await pipe(fa, deepStrictEqual([5]))
})

it.concurrent('fromTask', async () => {
  let initialized = false
  const fa = _.fromTask(async () => {
    initialized = true
    return 5
  })
  assert.deepStrictEqual(false, initialized)
  await pipe(fa, deepStrictEqual([5]))
})

it.concurrent('fromOption', async () => {
  await pipe(_.fromOption(O.some(5)), deepStrictEqual([5]))
  await pipe(_.fromOption(O.none), deepStrictEqual([]))
})

it.concurrent('fromEither', async () => {
  await pipe(_.fromEither(E.right(5)), deepStrictEqual([5]))
  await pipe(_.fromEither(E.left(new Error(''))), deepStrictEqual([]))
})

it.concurrent('fromIOEither', async () => {
  await pipe(_.fromIOEither(() => E.right(5)), deepStrictEqual([5]))
  await pipe(_.fromIOEither(() => E.left(new Error(''))), deepStrictEqual([]))
})

it.concurrent('fromTaskEither', async () => {
  await pipe(
    _.fromTaskEither(async () => E.right(5)),
    deepStrictEqual([5])
  )
  await pipe(
    _.fromTaskEither(async () => E.left(new Error(''))),
    deepStrictEqual([])
  )
})


})
