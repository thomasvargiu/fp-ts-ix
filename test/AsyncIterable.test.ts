import * as assert from 'assert'
import * as _ from '../src/AsyncIterable'
import * as AIc from '../src/AsyncIterable/Concat'
import * as IX from '@reactivex/ix-es5-cjs/asynciterable'
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/Option'
import * as E from 'fp-ts/Either'
import * as N from 'fp-ts/number'
import { eqStrict } from 'fp-ts/lib/Eq'
import { left, right } from 'fp-ts/lib/Separated'

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
      IX.from([1, 2, 3]),
      _.map((a) => a + 3),
      deepStrictEqual([4, 5, 6])
    )
  })

  it.concurrent('mapWithIndex', async () => {
    await pipe(
      IX.from(['a', 'b', 'c']),
      _.mapWithIndex((i, a) => `${a}${i}`),
      deepStrictEqual(['a0', 'b1', 'c2'])
    )
  })

  describe('FunctorWithIndex', () => {
    const F_ = _.FunctorWithIndex
    it.concurrent('mapWithIndex', async () => {
      await pipe(
        F_.mapWithIndex(IX.from(['a', 'b', 'c']), (i, a) => `${a}${i}`),
        deepStrictEqual(['a0', 'b1', 'c2'])
      )
    })
  })

  describe('Apply', () => {
    const A_ = _.Apply
    it.concurrent('ap', async () => {
      const double = (n: number): number => n * 2
      const mab = _.of(double)
      const ma = _.of(1)
      await pipe(A_.ap(mab, ma), deepStrictEqual([2]))
    })
  })

  it.concurrent('ap', async () => {
    const double = (n: number): number => n * 2
    const mab = _.of(double)
    const ma = _.of(1)
    await pipe(mab, _.ap(ma), deepStrictEqual([2]))
  })

  it.concurrent('scanLeft', async () => {
    await pipe(
      IX.from([1, 2, 3]),
      _.scanLeft(1, (b, a) => b + a),
      deepStrictEqual([2, 4, 7])
    )
  })

  it.concurrent('scanRight', async () => {
    await pipe(
      IX.from([1, 2, 3]),
      _.scanRight(1, (b, a) => b + a),
      deepStrictEqual([4, 6, 7])
    )
  })

  it.concurrent('zero', async () => {
    await pipe(_.zero<unknown>(), deepStrictEqual([]))
  })

  it.concurrent('empty', async () => {
    await pipe(_.empty, deepStrictEqual([] as any))
  })

  it.concurrent('takeLeft', async () => {
    await pipe(IX.from([1, 2, 3]), _.takeLeft(2), deepStrictEqual([1, 2]))
  })

  it.concurrent('takeRight', async () => {
    await pipe(IX.from([1, 2, 3]), _.takeRight(2), deepStrictEqual([2, 3]))
  })

  it.concurrent('takeLeftWhile', async () => {
    await pipe(
      IX.from([1, 2, 3]),
      _.takeLeftWhile((a) => a < 3),
      deepStrictEqual([1, 2])
    )
  })

  it.concurrent('dropLeft', async () => {
    await pipe(IX.from([1, 2, 3]), _.dropLeft(2), deepStrictEqual([3]))
  })

  it.concurrent('dropRight', async () => {
    await pipe(IX.from([1, 2, 3]), _.dropRight(2), deepStrictEqual([1]))
  })

  it.concurrent('dropLeftWhile', async () => {
    await pipe(
      IX.from([1, 2, 3]),
      _.dropLeftWhile((a) => a < 3),
      deepStrictEqual([3])
    )
  })

  it.concurrent('findFirst', async () => {
    await pipe(
      IX.from([1, 2, 3]),
      _.findFirst((a) => a > 1),
      deepStrictEqual([O.some(2)])
    )
  })

  it.concurrent('findFirstMap', async () => {
    await pipe(
      IX.from([1, 2, 3]),
      _.findFirstMap((a) => (a > 1 ? O.some(a + 1) : O.none)),
      deepStrictEqual([O.some(3)])
    )
  })

  it.concurrent('findLast', async () => {
    await pipe(
      IX.from([1, 2, 3]),
      _.findLast((a) => a > 1),
      deepStrictEqual([O.some(3)])
    )
  })

  it.concurrent('findLastMap', async () => {
    await pipe(
      IX.from([1, 2, 3]),
      _.findLastMap((a) => (a > 1 ? O.some(a + 1) : O.none)),
      deepStrictEqual([O.some(4)])
    )
  })

  it.concurrent('rights', async () => {
    await pipe(IX.from([E.right(1), E.left(2), E.right(3)]), _.rights, deepStrictEqual([1, 3]))
  })

  it.concurrent('lefts', async () => {
    await pipe(IX.from([E.right(1), E.left(2), E.right(3)]), _.lefts, deepStrictEqual([2]))
  })

  it.concurrent('zip', async () => {
    await pipe(
      IX.from([1, 2, 3]),
      _.zip(IX.from([4, 5, 6])),
      deepStrictEqual([
        [1, 4],
        [2, 5],
        [3, 6]
      ])
    )
  })

  it.concurrent('zipWith', async () => {
    const fa = IX.from([1, 2, 3])
    const fb = IX.from([4, 5, 6])
    const f = (a: number, b: number) => a + b

    await pipe(fa, _.zipWith(fb, f), deepStrictEqual([5, 7, 9]))
  })

  it.concurrent('prependAll', async () => {
    await pipe(IX.from([1, 2, 3]), _.prependAll(9), deepStrictEqual([9, 1, 9, 2, 9, 3]))
  })

  it.concurrent('intersperse', async () => {
    await pipe(IX.from([1, 2, 3]), _.intersperse(9), deepStrictEqual([1, 9, 2, 9, 3]))
  })

  it.concurrent('elem', async () => {
    const fa = IX.from([1, 2, 3])
    const _elem = _.elem<number>(eqStrict)

    await pipe(fa, _elem(2), deepStrictEqual([true]))
    await pipe(fa, _elem(4), deepStrictEqual([false]))
  })

  it.concurrent('uniq', async () => {
    const fa = IX.from([1, 2, 2, 3, 1])

    await pipe(fa, _.uniq(eqStrict), deepStrictEqual([1, 2, 3]))
  })

  it.concurrent('uniqConsecutive', async () => {
    const fa = IX.from([1, 2, 2, 3, 1])

    await pipe(fa, _.uniqConsecutive(eqStrict), deepStrictEqual([1, 2, 3, 1]))
  })

  it.concurrent('chunksOf', async () => {
    const fa = IX.from([1, 2, 3, 4, 5, 6, 7])

    await deepStrictEqual([[1, 2], [3, 4], [5, 6], [7]])(pipe(fa, _.chunksOf(2)))
  })

  it.concurrent('reverse', async () => {
    const fa = IX.from([1, 2, 3])

    await pipe(fa, _.reverse, deepStrictEqual([3, 2, 1]))
  })

  it.concurrent('concat', async () => {
    const fa = IX.from([1, 2, 3])
    const fb = IX.from([4, 5, 6])

    await pipe(fa, _.concat(fb), deepStrictEqual([1, 2, 3, 4, 5, 6]))
  })

  it.concurrent('concatW"', async () => {
    const fa = IX.from([1, 2, 3])
    const fb = IX.from(['a', 'b', 'c'])

    await pipe(fa, _.concatW(fb), deepStrictEqual([1, 2, 3, 'a', 'b', 'c']))
  })

  it.concurrent('union', async () => {
    const _union = _.union(N.Eq)
    const two = IX.from([1, 2])
    await pipe(two, _union(IX.from([3, 4])), deepStrictEqual([1, 2, 3, 4]))
    await pipe(two, _union(IX.from([2, 3])), deepStrictEqual([1, 2, 3]))
    await pipe(two, _union(IX.from([1, 2])), deepStrictEqual([1, 2]))

    await pipe(two, _union(IX.empty()), deepStrictEqual([1, 2]))
    await pipe(IX.empty(), _union(two), deepStrictEqual([1, 2]))
    await pipe(IX.empty(), _union(IX.empty()), deepStrictEqual([]))
  })

  it.concurrent('intersection', async () => {
    await pipe(IX.from([1, 2]), _.intersection(N.Eq)(IX.from([3, 4])), deepStrictEqual([]))
    await pipe(IX.from([1, 2]), _.intersection(N.Eq)(IX.from([2, 3])), deepStrictEqual([2]))
    await pipe(IX.from([1, 2]), _.intersection(N.Eq)(IX.from([1, 2])), deepStrictEqual([1, 2]))
  })

  it.concurrent('difference', async () => {
    await pipe(IX.from([1, 2]), _.difference(N.Eq)(IX.from([3, 4])), deepStrictEqual([1, 2]))
    await pipe(IX.from([1, 2]), _.difference(N.Eq)(IX.from([2, 3])), deepStrictEqual([1]))
    await pipe(IX.from([1, 2]), _.difference(N.Eq)(IX.from([1, 2])), deepStrictEqual([]))
  })

  it.concurrent('getOnEmpty', async () => {
    const onEmpty = () => IX.from([3, 4])
    await pipe(IX.from([1, 2]), _.getOnEmpty(onEmpty), deepStrictEqual([1, 2]))
    await pipe(IX.from([]), _.getOnEmpty(onEmpty), deepStrictEqual([3, 4]))
  })

  it.concurrent('filterMapWithIndex', async () => {
    const fa = IX.from([1, 2, 3])
    const f = (i: number, a: number) => (a >= 2 ? O.some(i + a) : O.none)
    await pipe(fa, _.filterMapWithIndex(f), deepStrictEqual([3, 5]))
  })

  it.concurrent('partitionMapWithIndex', async () => {
    const fa = IX.from([1, 2, 3, 4])
    const f = (i: number, a: number): E.Either<number, number> => (i % 2 === 0 ? E.left(a + i) : E.right(a + i))
    const { left, right } = pipe(fa, _.partitionMapWithIndex(f))

    await pipe(left, deepStrictEqual([1, 5]))
    await pipe(right, deepStrictEqual([3, 7]))
  })

  it.concurrent('partitionWithIndex', async () => {
    const fa = IX.from([1, 2, 3, 4])
    const f = (i: number, _a: number) => i % 2 === 0
    const s = pipe(fa, _.partitionWithIndex(f))

    await pipe(left(s), deepStrictEqual([2, 4]))
    await pipe(right(s), deepStrictEqual([1, 3]))
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
    const s = pipe(fa, _.partition(f))

    await pipe(left(s), deepStrictEqual([1, 3]))
    await pipe(right(s), deepStrictEqual([2, 4]))
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
    const fa = IX.from([1, 2, 3])
    await pipe(fa, _.prependW('a'), deepStrictEqual(['a', 1, 2, 3]))
  })

  it.concurrent('prepend', async () => {
    const fa = IX.from([1, 2, 3])
    await pipe(fa, _.prepend(0), deepStrictEqual([0, 1, 2, 3]))
  })

  it.concurrent('appendW', async () => {
    const fa = IX.from([1, 2, 3])
    await pipe(fa, _.appendW('a'), deepStrictEqual([1, 2, 3, 'a']))
  })

  it.concurrent('append', async () => {
    const fa = IX.from([1, 2, 3])
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
    await pipe(_.fromOption(O.none as O.Option<number>), deepStrictEqual([]))
  })

  it.concurrent('fromEither', async () => {
    await pipe(_.fromEither(E.right(5)), deepStrictEqual([5]))
    await pipe(_.fromEither(E.left<Error, number>(new Error(''))), deepStrictEqual([]))
  })

  it.concurrent('fromIOEither', async () => {
    await pipe(
      _.fromIOEither(() => E.right(5)),
      deepStrictEqual([5])
    )
    await pipe(
      _.fromIOEither(() => E.left<Error, number>(new Error(''))),
      deepStrictEqual([])
    )
  })

  it.concurrent('fromTaskEither', async () => {
    await pipe(
      _.fromTaskEither(async () => E.right(5)),
      deepStrictEqual([5])
    )
    await pipe(
      _.fromTaskEither(async () => E.left<Error, number>(new Error(''))),
      deepStrictEqual([])
    )
  })

  it.concurrent('chain', async () => {
    await pipe(
      _.fromArray([1, 2]),
      _.chain(AIc.Chain)((a) => _.fromArray([a, a + 1])),
      deepStrictEqual([1, 2, 2, 3])
    )
  })

  it.concurrent('chainWithIndex', async () => {
    await pipe(
      _.fromArray([1, 2]),
      _.chainWithIndex(AIc.ChainWithIndex)((i, a) => _.fromArray([a, a + i])),
      deepStrictEqual([1, 1, 2, 3])
    )
  })

  it.concurrent('chainFirst', async () => {
    await pipe(
      _.fromArray([1, 2]),
      _.chainFirst(AIc.Chain)((a) => _.fromArray([a, a + 1])),
      deepStrictEqual([1, 1, 2, 2])
    )
  })

  it.concurrent('bind', async () => {
    await pipe(
      _.fromArray([{ v: 1 }, { v: 2 }]),
      _.bind(AIc.Chain)('foo', ({ v }) => _.fromArray([v, v + 1])),
      deepStrictEqual([
        { v: 1, foo: 1 },
        { v: 1, foo: 2 },
        { v: 2, foo: 2 },
        { v: 2, foo: 3 }
      ])
    )
  })

  it.concurrent('flatten', async () => {
    await pipe(
      _.fromArray([_.fromArray([1, 2]), _.fromArray([3, 4])]),
      _.flatten(AIc.Chain),
      deepStrictEqual([1, 2, 3, 4])
    )
  })

  describe('getMonoid', () => {
    const M_ = _.getMonoid(AIc.getSemigroup<number>())

    it.concurrent('concat', async () => {
      await pipe(M_.concat(_.fromArray([1, 2]), _.fromArray([3, 4])), deepStrictEqual([1, 2, 3, 4]))
    })

    it.concurrent('empty', async () => {
      await pipe(M_.empty, deepStrictEqual([]))
    })
  })

  describe('Compactable', () => {
    const C = _.Compactable

    it.concurrent('compact', async () => {
      await pipe(C.compact(_.fromArray([O.some(1), O.some(2)])), deepStrictEqual([1, 2]))
    })

    it.concurrent('separate', async () => {
      const s = C.separate(_.fromArray([E.right(1), E.left(2), E.right(3)]))
      await pipe(left(s), deepStrictEqual([2]))
      await pipe(right(s), deepStrictEqual([1, 3]))
    })
  })

  describe('Filterable', () => {
    const F_ = _.Filterable

    it.concurrent('filter', async () => {
      await pipe(
        F_.filter(_.fromArray([-1, 0, 1]), (n) => n > 0),
        deepStrictEqual([1])
      )
      await pipe(
        F_.filter(_.of(-1), (n) => n > 0),
        deepStrictEqual([])
      )
    })

    it.concurrent('filterMap', async () => {
      const lengthF = (s: string) => (s.length > 1 ? O.some(s.length) : O.none)
      await pipe(F_.filterMap(_.of('aaa'), lengthF), deepStrictEqual([3]))
      await pipe(F_.filterMap(_.of('a'), lengthF), deepStrictEqual([]))
      await pipe(F_.filterMap(_.empty, lengthF), deepStrictEqual([]))
    })

    it.concurrent('partition', async () => {
      const s = F_.partition(_.of('a'), (s) => s.length > 2)
      await pipe(left(s), deepStrictEqual(['a']))
      await pipe(right(s), deepStrictEqual([]))
    })

    it.concurrent('partitionMap', async () => {
      const s = F_.partitionMap(_.of('a'), (s) => (s.length > 2 ? E.right(s.length) : E.left(false)))

      await pipe(left(s), deepStrictEqual([false]))
      await pipe(right(s), deepStrictEqual([]))
    })
  })

  describe('FilterableWithIndex', () => {
    const F_ = _.FilterableWithIndex

    it.concurrent('filterWithIndex', async () => {
      await pipe(
        F_.filterWithIndex(_.fromArray([-1, 0, 1, 4]), (i, n) => n > i),
        deepStrictEqual([4])
      )
      await pipe(
        F_.filterWithIndex(_.of(-1), (i, n) => n > i),
        deepStrictEqual([])
      )
    })

    it.concurrent('filterMapWithIndex', async () => {
      const lengthF = (i: number, s: string) => (s.length > 1 ? O.some(s.length + i) : O.none)
      await pipe(F_.filterMapWithIndex(_.fromArray(['aaa', 'aaa']), lengthF), deepStrictEqual([3, 4]))
      await pipe(F_.filterMapWithIndex(_.of('a'), lengthF), deepStrictEqual([]))
      await pipe(F_.filterMapWithIndex(_.empty, lengthF), deepStrictEqual([]))
    })

    it.concurrent('partitionWithIndex', async () => {
      const s = F_.partitionWithIndex(_.fromArray(['', 'a', 'aaa']), (i, s) => s.length > i)
      await pipe(left(s), deepStrictEqual(['', 'a']))
      await pipe(right(s), deepStrictEqual(['aaa']))
    })

    it.concurrent('partitionMapWithIndex', async () => {
      const s = F_.partitionMapWithIndex(_.fromArray(['', 'a', 'aaa']), (i, s) =>
        s.length > 2 ? E.right(s.length + i) : E.left(false)
      )

      await pipe(left(s), deepStrictEqual([false, false]))
      await pipe(right(s), deepStrictEqual([5]))
    })
  })
})
