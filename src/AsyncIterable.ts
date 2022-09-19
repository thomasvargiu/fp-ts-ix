/**
 * ```ts
 * interface AsyncIterable<A>
 * ```
 *
 * @since 0.1.0
 */
import type { Applicative1 } from 'fp-ts/Applicative'
import type { Apply1 } from 'fp-ts/Apply'
import { Chain1, chainFirst as chainFirst_, bind as bind_ } from 'fp-ts/Chain'
import type { Compactable1 } from 'fp-ts/Compactable'
import * as E from 'fp-ts/Either'
import type { Eq } from 'fp-ts/Eq'
import type { Filterable1 } from 'fp-ts/Filterable'
import type { FilterableWithIndex1, PredicateWithIndex, RefinementWithIndex } from 'fp-ts/FilterableWithIndex'
import type { FromEither1 } from 'fp-ts/FromEither'
import type { FromIO1 } from 'fp-ts/FromIO'
import type { FromTask1 } from 'fp-ts/FromTask'
import type { Functor1 } from 'fp-ts/Functor'
import type { FunctorWithIndex1 } from 'fp-ts/FunctorWithIndex'
import type { URI as IEURI } from 'fp-ts/IOEither'
import type { Monad1 } from 'fp-ts/Monad'
import type { MonadIO1 } from 'fp-ts/MonadIO'
import type { MonadTask1 } from 'fp-ts/MonadTask'
import type { Monoid } from 'fp-ts/Monoid'
import type { NaturalTransformation11, NaturalTransformation21 } from 'fp-ts/NaturalTransformation'
import * as O from 'fp-ts/Option'
import type { Pointed1 } from 'fp-ts/Pointed'
import type { Predicate } from 'fp-ts/Predicate'
import type { ReadonlyNonEmptyArray } from 'fp-ts/ReadonlyNonEmptyArray'
import type { Refinement } from 'fp-ts/Refinement'
import type { Semigroup } from 'fp-ts/Semigroup'
import { separated, Separated } from 'fp-ts/Separated'
import type { URI as TEURI } from 'fp-ts/TaskEither'
import type { Zero1 } from 'fp-ts/Zero'
import { flow, identity, Lazy, pipe } from 'fp-ts/function'
import { throwIfAborted } from '@reactivex/ix-es5-cjs/aborterror'
import * as IX from '@reactivex/ix-es5-cjs/asynciterable'
import * as IXO from '@reactivex/ix-es5-cjs/asynciterable/operators'
import type { ChainWithIndex1 } from './ChainWithIndex'
import type { MonadAsyncIterable1 } from './MonadAsyncIterable'
import * as T from 'fp-ts/Task'
import * as ROA from 'fp-ts/ReadonlyArray'

/**
 * @category instances
 * @since 0.1.0
 */
export const URI = 'AsyncIterable'
/**
 * @category instances
 * @since 0.1.0
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    readonly [URI]: AsyncIterable<A>
  }
}

const _map: Functor1<URI>['map'] = (fa, f) => pipe(fa, IXO.map(f))
const _mapWithIndex: FunctorWithIndex1<URI, number>['mapWithIndex'] = (fa, f) => pipe(fa, mapWithIndex(f))
const _ap: Apply1<URI>['ap'] = (fab, fa) => pipe(fab, ap(fa))
const _filter: Filterable1<URI>['filter'] = <A>(fa: AsyncIterable<A>, p: Predicate<A>) => pipe(fa, filter(p))
const _filterMap: Filterable1<URI>['filterMap'] = <A, B>(fa: AsyncIterable<A>, f: (a: A) => O.Option<B>) =>
  pipe(fa, filterMap(f))
const _partition: Filterable1<URI>['partition'] = <A>(fa: AsyncIterable<A>, p: Predicate<A>) => pipe(fa, partition(p))
const _partitionMap: Filterable1<URI>['partitionMap'] = (fa, f) => pipe(fa, partitionMap(f))

const _filterWithIndex: FilterableWithIndex1<URI, number>['filterWithIndex'] = <A>(
  fa: AsyncIterable<A>,
  p: PredicateWithIndex<number, A>
) => pipe(fa, filterWithIndex(p))
const _filterMapWithIndex: FilterableWithIndex1<URI, number>['filterMapWithIndex'] = <A, B>(
  fa: AsyncIterable<A>,
  f: (i: number, a: A) => O.Option<B>
) => pipe(fa, filterMapWithIndex(f))
const _partitionWithIndex: FilterableWithIndex1<URI, number>['partitionWithIndex'] = <A>(
  fa: AsyncIterable<A>,
  p: PredicateWithIndex<number, A>
) => pipe(fa, partitionWithIndex(p))
const _partitionMapWithIndex: FilterableWithIndex1<URI, number>['partitionMapWithIndex'] = (fa, f) =>
  pipe(fa, partitionMapWithIndex(f))

/**
 * @since 0.1.0
 */
export const of: Pointed1<URI>['of'] = IX.of

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 0.1.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: AsyncIterable<A>) => AsyncIterable<B> = (f) =>
  mapWithIndex((_, a) => f(a))

/**
 * Same as [`map`](#map), but the iterating function takes both the index and the value
 * of the element.
 *
 * @category FunctorWithIndex
 * @since 0.1.0
 */
export const mapWithIndex: <A, B>(f: (i: number, a: A) => B) => (fa: AsyncIterable<A>) => AsyncIterable<B> =
  (f) => (fa) =>
    IX.defer(() =>
      pipe(
        fa,
        IXO.map((a, i) => f(i, a))
      )
    )

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 0.1.0
 */
export const ap: <A>(fa: AsyncIterable<A>) => <B>(fab: AsyncIterable<(a: A) => B>) => AsyncIterable<B> =
  (fa) => (fab) =>
    IX.combineLatest(fab, fa).pipe(IXO.map(([f, a]) => f(a)))

/**
 * Same as `reduce` but it carries over the intermediate steps
 *
 * @category combinators
 * @since 0.1.0
 */
export const scanLeft =
  <A, B>(b: B, f: (b: B, a: A) => B) =>
  (as: AsyncIterable<A>): AsyncIterable<B> =>
    pipe(
      as,
      IXO.scan({
        seed: b,
        callback: (ba, a) => f(ba, a)
      })
    )

/**
 * Same as `reduce` but it carries over the intermediate steps
 *
 * @category combinators
 * @since 0.1.0
 */
export const scanRight =
  <A, B>(b: B, f: (b: B, a: A) => B) =>
  (as: AsyncIterable<A>): AsyncIterable<B> =>
    pipe(
      as,
      IXO.scanRight({
        seed: b,
        callback: (ba, a) => f(ba, a)
      })
    )

/**
 * @category Alternative
 * @since 0.1.0
 */
export const zero: Zero1<URI>['zero'] = () => empty

/**
 * @category combinators
 * @since 0.1.0
 */
export const takeLeft = (n: number): (<A>(as: AsyncIterable<A>) => AsyncIterable<A>) => IXO.take(n)

/**
 * @category combinators
 * @since 0.1.0
 */
export const takeRight = (n: number): (<A>(as: AsyncIterable<A>) => AsyncIterable<A>) => IXO.takeLast(n)

/**
 * Returns elements from an async-iterable sequence as long as a specified condition is true.
 *
 * @category combinators
 * @since 0.1.0
 */
export function takeLeftWhile<A, B extends A>(refinement: Refinement<A, B>): (as: AsyncIterable<A>) => AsyncIterable<B>
export function takeLeftWhile<A>(predicate: Predicate<A>): <B extends A>(bs: AsyncIterable<B>) => AsyncIterable<B>
export function takeLeftWhile<A>(predicate: Predicate<A>): (as: AsyncIterable<A>) => AsyncIterable<A>
export function takeLeftWhile<A>(predicate: Predicate<A>): (as: AsyncIterable<A>) => AsyncIterable<A> {
  return (as: AsyncIterable<A>) => pipe(as, IXO.takeWhile(predicate))
}

/**
 * Creates a new `AsyncIterable` dropping a max number of elements from the start.
 *
 * **Note**. `n` is normalized to a non negative integer.
 * @category combinators
 * @since 0.1.0
 */
export const dropLeft = (n: number): (<A>(as: AsyncIterable<A>) => AsyncIterable<A>) => IXO.skip(n)

/**
 * Creates a new `AsyncIterable` dropping a max number of elements from the end.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @category combinators
 * @since 0.1.0
 */
export const dropRight = (n: number): (<A>(as: AsyncIterable<A>) => AsyncIterable<A>) => IXO.skipLast(n)

/**
 * Bypasses elements in an async-iterale sequence as long as a specified condition is true
 * and then returns the remaining elements.
 *
 * @category combinators
 * @since 0.1.0
 */
export function dropLeftWhile<A, B extends A>(refinement: Refinement<A, B>): (as: AsyncIterable<A>) => AsyncIterable<B>
export function dropLeftWhile<A>(predicate: Predicate<A>): <B extends A>(bs: AsyncIterable<B>) => AsyncIterable<B>
export function dropLeftWhile<A>(predicate: Predicate<A>): (as: AsyncIterable<A>) => AsyncIterable<A>
export function dropLeftWhile<A>(predicate: Predicate<A>): (as: AsyncIterable<A>) => AsyncIterable<A> {
  return IXO.skipWhile(predicate)
}

/**
 * Find the first element which satisfies a predicate (or a refinement) function
 * @since 0.1.0
 */
export function findFirst<A, B extends A>(
  refinement: Refinement<A, B>
): (as: AsyncIterable<A>) => AsyncIterable<O.Option<B>>
export function findFirst<A>(predicate: Predicate<A>): <B extends A>(bs: AsyncIterable<B>) => AsyncIterable<O.Option<B>>
export function findFirst<A>(predicate: Predicate<A>): (as: AsyncIterable<A>) => AsyncIterable<O.Option<A>>
export function findFirst<A>(predicate: Predicate<A>): (as: AsyncIterable<A>) => AsyncIterable<O.Option<A>> {
  return flow(filter(predicate), takeLeft(1), map(O.some), IXO.defaultIfEmpty<O.Option<A>>(O.none))
}

/**
 * Given a selector function which takes an element and returns an option,
 * this function applies the selector to each element and
 * returns the first `Some` result. Otherwise it returns `None`.
 * @since 0.1.0
 */
export const findFirstMap = <A, B>(f: (a: A) => O.Option<B>): ((as: AsyncIterable<A>) => AsyncIterable<O.Option<B>>) =>
  flow(filterMap(f), takeLeft(1), map(O.some), IXO.defaultIfEmpty<O.Option<B>>(O.none))

/**
 * Find the last element which satisfies a predicate function
 * @since 0.1.0
 */
export function findLast<A, B extends A>(
  refinement: Refinement<A, B>
): (as: AsyncIterable<A>) => AsyncIterable<O.Option<B>>
export function findLast<A>(predicate: Predicate<A>): <B extends A>(bs: AsyncIterable<B>) => AsyncIterable<O.Option<B>>
export function findLast<A>(predicate: Predicate<A>): (as: AsyncIterable<A>) => AsyncIterable<O.Option<A>>
export function findLast<A>(predicate: Predicate<A>): (as: AsyncIterable<A>) => AsyncIterable<O.Option<A>> {
  return flow(filter(predicate), takeRight(1), map(O.some), IXO.defaultIfEmpty<O.Option<A>>(O.none))
}

/**
 * Find the last element returned by an option based selector function
 * @since 0.1.0
 */
export const findLastMap = <A, B>(f: (a: A) => O.Option<B>): ((as: AsyncIterable<A>) => AsyncIterable<O.Option<B>>) =>
  flow(filterMap(f), takeRight(1), map(O.some), IXO.defaultIfEmpty<O.Option<B>>(O.none))

/**
 * Takes an `AsyncIterable` of `Either` and produces an `AsyncIterable` containing
 * the values of all the `Right` elements in the same order.
 *
 * @category combinators
 * @since 0.1.0
 */
export const rights: <E, A>(as: AsyncIterable<E.Either<E, A>>) => AsyncIterable<A> = flow(
  IXO.filter(E.isRight),
  map((a) => a.right)
)

/**
 * Takes an `AsyncIterable` of `Either` and produces an `AsyncIterable` containing
 * the values of all the `Left` elements in the same order.
 *
 * @category combinators
 * @since 0.1.0
 */
export const lefts: <E, A>(as: AsyncIterable<E.Either<E, A>>) => AsyncIterable<E> = flow(
  IXO.filter(E.isLeft),
  map((a) => a.left)
)

/**
 * Takes two AsyncIterable and returns an AsyncIterable of corresponding pairs.
 *
 * @category combinators
 * @since 0.1.0
 */
export const zip = <B>(bs: AsyncIterable<B>): (<A>(as: AsyncIterable<A>) => AsyncIterable<readonly [A, B]>) =>
  IXO.zipWith(bs)

/**
 * Use `zip` and apply a function to every pairs of elements.
 *
 * @category combinators
 * @since 0.1.0
 */
export const zipWith = <A, B, C>(
  fb: AsyncIterable<B>,
  f: (a: A, b: B) => C
): ((fa: AsyncIterable<A>) => AsyncIterable<C>) =>
  flow(
    zip(fb),
    map(([a, b]) => f(a, b))
  )

/**
 * Prepend an element to every element.
 *
 * @category combinators
 * @since 0.1.0
 */
export const prependAll = <A>(middle: A): ((as: AsyncIterable<A>) => AsyncIterable<A>) =>
  IXO.concatMap((a) => fromArray([middle, a]))

/**
 * Places an element in between elements
 *
 * @category combinators
 * @since 0.1.0
 */
export const intersperse = <A>(middle: A): ((as: AsyncIterable<A>) => AsyncIterable<A>) =>
  IXO.concatMap((a, i) => (i !== 0 ? fromArray([middle, a]) : of(a)))

/**
 * Test if a value is emitted. Takes a `Eq<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an `AsyncIterable<A>`.
 * @since 0.1.0
 */
export const elem: <A>(Eq: Eq<A>) => (a: A) => (as: AsyncIterable<A>) => AsyncIterable<boolean> = (Eq) => (a) =>
  flow(
    findFirst((element) => Eq.equals(element, a)),
    map(
      O.match(
        () => false,
        () => true
      )
    )
  )

/**
 * Remove duplicates from an AsyncIterable, keeping the first occurrence of an element.
 *
 * @category combinators
 * @since 0.1.0
 */
export const uniq = <A>(Eq: Eq<A>): ((as: AsyncIterable<A>) => AsyncIterable<A>) =>
  IXO.distinct<A, A>({
    comparer: Eq.equals
  })

/**
 * Returns an async-iterable sequence that contains only distinct contiguous elements according to the optional keySelector and comparer.
 *
 * @category combinators
 * @since 0.1.0
 */
export const uniqConsecutive = <A>(Eq: Eq<A>): ((as: AsyncIterable<A>) => AsyncIterable<A>) =>
  IXO.distinctUntilChanged<A, A>({
    comparer: Eq.equals
  })

/**
 * Collect a `AsyncIterable` elements into length-`n` pieces.
 *
 * @category combinators
 * @since 0.1.0
 */
export const chunksOf = (n: number): (<A>(as: AsyncIterable<A>) => AsyncIterable<ReadonlyNonEmptyArray<A>>) =>
  IXO.buffer(n) as any

/**
 * Reverse an AsyncIterable
 *
 * @category combinators
 * @since 0.1.0
 */
export const reverse = <A>(as: AsyncIterable<A>): AsyncIterable<A> => pipe(as, IXO.reverse())

/**
 * @category combinators
 * @since 0.1.0
 */
export const concatW =
  <B>(second: AsyncIterable<B>) =>
  <A>(first: AsyncIterable<A>): AsyncIterable<A | B> =>
    IX.concat(first, second)

/**
 * @category combinators
 * @since 0.1.0
 */
export const concat: <A>(second: AsyncIterable<A>) => (first: AsyncIterable<A>) => AsyncIterable<A> = concatW

class OnEmptyAsyncIterable<A, B> implements AsyncIterable<A | B> {
  constructor(private readonly source: AsyncIterable<A>, private readonly onEmpty: Lazy<AsyncIterable<B>>) {}

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal)
    let state = 1
    for await (const item of IXO.wrapWithAbort(this.source, signal)) {
      state = 2
      yield item
    }
    if (state === 2) {
      return
    }
    throwIfAborted(signal)
    for await (const item of IXO.wrapWithAbort(this.onEmpty(), signal)) {
      yield item
    }
  }
}

/**
 * Produces the set union of two sequences by using a `Eq` for equality comparisons.
 *
 * @category combinators
 * @since 0.1.0
 */
export const union =
  <A>(Eq: Eq<A>) =>
  (xs: AsyncIterable<A>) =>
  (ys: AsyncIterable<A>): AsyncIterable<A> =>
    pipe(ys, IXO.union(xs, Eq.equals))

/**
 * Produces the set intersection of two sequences by using a `Eq` for equality comparisons.
 *
 * @category combinators
 * @since 0.1.0
 */
export const intersection =
  <A>(Eq: Eq<A>) =>
  (xs: AsyncIterable<A>) =>
  (ys: AsyncIterable<A>): AsyncIterable<A> =>
    pipe(ys, IXO.intersect(xs, Eq.equals))

/**
 * Produces the set difference of two sequences by using a `Eq` for equality comparisons.
 *
 * @category combinators
 * @since 0.1.0
 */
export const difference =
  <A>(Eq: Eq<A>) =>
  (xs: AsyncIterable<A>) =>
  (ys: AsyncIterable<A>): AsyncIterable<A> =>
    pipe(ys, IXO.except(xs, Eq.equals))

/**
 * Returns the provided AsyncIterable if empty.
 *
 * @category combinators
 * @since 0.1.0
 */
export const getOnEmpty =
  <B>(onEmpty: Lazy<AsyncIterable<B>>) =>
  <A>(ma: AsyncIterable<A>): AsyncIterable<A | B> => {
    return new OnEmptyAsyncIterable(ma, onEmpty)
  }

/**
 * @category FilterableWithIndex
 * @since 0.1.0
 */
export const filterMapWithIndex = <A, B>(
  f: (i: number, a: A) => O.Option<B>
): ((fa: AsyncIterable<A>) => AsyncIterable<B>) =>
  flow(
    IXO.map((a, i) => f(i, a)),
    IXO.filter(O.isSome),
    IXO.map((a) => a.value)
  )

/**
 * @category FilterableWithIndex
 * @since 0.1.0
 */
export const partitionMapWithIndex =
  <A, B, C>(f: (i: number, a: A) => E.Either<B, C>) =>
  (fa: AsyncIterable<A>): Separated<AsyncIterable<B>, AsyncIterable<C>> =>
    separated(
      pipe(fa, filterMapWithIndex(flow(f, E.swap, O.fromEither))),
      pipe(fa, filterMapWithIndex(flow(f, O.fromEither)))
    )

/**
 * Same as [`partition`](#partition), but passing also the index to the iterating function.
 *
 * @category FilterableWithIndex
 * @since 0.1.0
 */
export const partitionWithIndex: {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<number, A, B>): (
    as: AsyncIterable<A>
  ) => Separated<AsyncIterable<A>, AsyncIterable<B>>
  <A>(predicateWithIndex: PredicateWithIndex<number, A>): <B extends A>(
    bs: AsyncIterable<B>
  ) => Separated<AsyncIterable<B>, AsyncIterable<B>>
  <A>(predicateWithIndex: PredicateWithIndex<number, A>): (
    as: AsyncIterable<A>
  ) => Separated<AsyncIterable<A>, AsyncIterable<A>>
} =
  <A>(predicateWithIndex: PredicateWithIndex<number, A>) =>
  (fa: AsyncIterable<A>): Separated<AsyncIterable<A>, AsyncIterable<A>> =>
    separated(
      pipe(
        fa,
        filterWithIndex((i, a) => !predicateWithIndex(i, a))
      ),
      pipe(fa, filterWithIndex(predicateWithIndex))
    )

/**
 * Same as [`filter`](#filter), but passing also the index to the iterating function.
 *
 * @category FilterableWithIndex
 * @since 0.1.0
 */
export const filterWithIndex: {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<number, A, B>): (as: AsyncIterable<A>) => AsyncIterable<B>
  <A>(predicateWithIndex: PredicateWithIndex<number, A>): <B extends A>(bs: AsyncIterable<B>) => AsyncIterable<B>
  <A>(predicateWithIndex: PredicateWithIndex<number, A>): (as: AsyncIterable<A>) => AsyncIterable<A>
} = <A>(predicateWithIndex: PredicateWithIndex<number, A>): ((as: AsyncIterable<A>) => AsyncIterable<A>) =>
  IXO.filter((a, i) => predicateWithIndex(i, a))

/**
 * @category Filterable
 * @since 0.1.0
 */
export const filterMap = <A, B>(f: (a: A) => O.Option<B>) => filterMapWithIndex<A, B>((_, a) => f(a))

/**
 * @category Filterable
 * @since 0.1.0
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => E.Either<B, C>
) => (fa: AsyncIterable<A>) => Separated<AsyncIterable<B>, AsyncIterable<C>> = (f) =>
  partitionMapWithIndex((_, a) => f(a))

/**
 * @category Filterable
 * @since 0.1.0
 */
export const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (as: AsyncIterable<A>) => AsyncIterable<B>
  <A>(predicate: Predicate<A>): <B extends A>(bs: AsyncIterable<B>) => AsyncIterable<B>
  <A>(predicate: Predicate<A>): (as: AsyncIterable<A>) => AsyncIterable<A>
} = <A>(predicate: Predicate<A>) => IXO.filter(predicate)

/**
 * @category Filterable
 * @since 0.1.0
 */
export const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (
    as: AsyncIterable<A>
  ) => Separated<AsyncIterable<A>, AsyncIterable<B>>
  <A>(predicate: Predicate<A>): <B extends A>(bs: AsyncIterable<B>) => Separated<AsyncIterable<B>, AsyncIterable<B>>
  <A>(predicate: Predicate<A>): (as: AsyncIterable<A>) => Separated<AsyncIterable<A>, AsyncIterable<A>>
} = <A>(predicate: Predicate<A>): ((as: AsyncIterable<A>) => Separated<AsyncIterable<A>, AsyncIterable<A>>) =>
  partitionWithIndex((_, a) => predicate(a))

/**
 * @category Compactable
 * @since 0.1.0
 */
export const compact: <A>(fa: AsyncIterable<O.Option<A>>) => AsyncIterable<A> =
  /*#__PURE__*/
  filterMap(identity)

/**
 * @category Compactable
 * @since 0.1.0
 */
export const separate: <A, B>(fa: AsyncIterable<E.Either<A, B>>) => Separated<AsyncIterable<A>, AsyncIterable<B>> =
  /*#__PURE__*/
  partitionMap(identity)

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * An empty `AsyncIterable`.
 *
 * @category constructors
 * @since 0.1.0
 */
export const empty: AsyncIterable<never> = IX.empty()

/**
 * Less strict version of [`prepend`](#prepend).
 *
 * @category constructors
 * @since 0.1.0
 */
export const prependW: <A, B>(head: B) => (tail: AsyncIterable<A>) => AsyncIterable<A | B> = IXO.startWith

/**
 * Prepend an element.
 *
 * @category constructors
 * @since 0.1.0
 */
export const prepend: <A>(head: A) => (tail: AsyncIterable<A>) => AsyncIterable<A> = prependW

/**
 * Less strict version of [`append`](#append).
 *
 * @category constructors
 * @since 0.1.0
 */
export const appendW: <A, B>(end: B) => (init: AsyncIterable<A>) => AsyncIterable<A | B> = <A, B>(end: B) =>
  IXO.endWith<A | B>(end)

/**
 * Append an element.
 *
 * @category constructors
 * @since 0.1.0
 */
export const append: <A>(end: A) => (init: AsyncIterable<A>) => AsyncIterable<A> = appendW

/**
 * Return an `AsyncIterable` emitting `n` elements with element `i` initialized with `f(i)`.
 *
 * @category constructors
 * @since 0.1.0
 */
export const makeBy = <A>(n: number, f: (i: number) => A): AsyncIterable<A> => pipe(IX.range(0, n), map(f))

/**
 * Create an `AsyncIterable` emitting a value repeated the specified number of times.
 *
 * @category constructors
 * @since 0.1.0
 */
export const replicate = <A>(n: number, a: A): AsyncIterable<A> => makeBy(n, () => a)

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Create an AsyncIterable with one element, if the element satisfies the predicate, otherwise
 * it returns an empty AsyncIterable.
 *
 * @category constructors
 * @since 0.1.0
 */
export function fromPredicate<A, B extends A>(refinement: Refinement<A, B>): (a: A) => AsyncIterable<B>
export function fromPredicate<A>(predicate: Predicate<A>): <B extends A>(b: B) => AsyncIterable<B>
export function fromPredicate<A>(predicate: Predicate<A>): (a: A) => AsyncIterable<A>
export function fromPredicate<A>(predicate: Predicate<A>): (a: A) => AsyncIterable<A> {
  return (a) => (predicate(a) ? of(a) : empty)
}

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * Create from array.
 *
 * @category natural transformations
 * @since 0.1.0
 */
export const fromArray: <A>(ma: ReadonlyArray<A>) => AsyncIterable<A> = IX.from // ma => IX.of(...ma) //IX.from

/**
 * @category natural transformations
 * @since 0.1.0
 */
export const fromIO: FromIO1<URI>['fromIO'] = (ma) => IX.defer(() => IX.of(ma()))

/**
 * @category natural transformations
 * @since 0.1.0
 */
export const fromTask: FromTask1<URI>['fromTask'] = (t) => IX.defer(() => IX.from(t()))

/**
 * @category natural transformations
 * @since 0.1.0
 */
export const fromOption: NaturalTransformation11<O.URI, URI> = O.match(IX.empty, of)

/**
 * @category natural transformations
 * @since 0.1.0
 */
export const fromEither: FromEither1<URI>['fromEither'] = E.match(IX.empty, of)

/**
 * @category natural transformations
 * @since 0.1.0
 */
export const fromIOEither: NaturalTransformation21<IEURI, URI> = (ma) => IX.defer(() => fromEither(ma()))

/**
 * @category natural transformations
 * @since 0.1.0
 */
export const fromTaskEither: NaturalTransformation21<TEURI, URI> = (ma) =>
  pipe(
    IX.defer(() => IX.from(ma())),
    IXO.concatMap(fromEither)
  )

/**
 * @category utils
 * @since 0.1.1
 */
export const toTask =
  <B>(onEmpty: Lazy<B>) =>
  <A>(ma: AsyncIterable<A>): T.Task<A | B> =>
    pipe(toTaskOption(ma), T.map(O.getOrElseW(onEmpty)))

/**
 * @category utils
 * @since 0.1.1
 */
export const toTaskOption = <A>(ma: AsyncIterable<A>): T.Task<O.Option<A>> =>
  pipe(() => pipe(ma, takeRight(1), IX.toArray), T.map(ROA.head))

/**
 * @since 0.1.0
 */
export const Functor: Functor1<URI> = {
  URI,
  map: _map
}

/**
 * @since 0.1.0
 */
export const FunctorWithIndex: FunctorWithIndex1<URI, number> = {
  URI,
  map: _map,
  mapWithIndex: _mapWithIndex
}

/**
 * @category instances
 * @since 0.1.0
 */
export const Pointed: Pointed1<URI> = {
  URI,
  of
}

/**
 * @category instances
 * @since 0.1.0
 */
export const Apply: Apply1<URI> = {
  URI,
  map: _map,
  ap: _ap
}

/**
 * @category instances
 * @since 0.1.0
 */
export const Applicative: Applicative1<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of
}

/**
 * @since 0.1.0
 */
export const getMonad: <C extends Chain1<URI>>(C: C) => Monad1<URI> = (C) => ({
  URI,
  map: _map,
  of,
  ap: _ap,
  chain: C.chain
})

/**
 * @since 0.1.0
 */
export const getMonadIO: <C extends Chain1<URI>>(C: C) => MonadIO1<URI> = (C) => ({
  URI,
  map: _map,
  of,
  ap: _ap,
  chain: C.chain,
  fromIO
})

/**
 * @since 0.1.0
 */
export const getMonadTask: <C extends Chain1<URI>>(C: C) => MonadTask1<URI> = (C) => ({
  URI,
  map: _map,
  ap: _ap,
  of,
  chain: C.chain,
  fromIO,
  fromTask
})

/**
 * @since 0.1.0
 */
export const getMonadAsyncIterable: <C extends ChainWithIndex1<URI, number>>(C: C) => MonadAsyncIterable1<URI> = (
  C
) => ({
  URI,
  map: _map,
  ap: _ap,
  of,
  chain: C.chain,
  fromIO,
  fromTask,
  fromAsyncIterable: identity,
  mapWithIndex: _mapWithIndex,
  chainWithIndex: C.chainWithIndex
})

/**
 * @since 0.1.0
 */
export const Compactable: Compactable1<URI> = {
  URI,
  compact,
  separate
}

/**
 * @since 0.1.0
 */
export const Filterable: Filterable1<URI> = {
  URI,
  map: _map,
  compact,
  separate,
  filter: _filter,
  partition: _partition,
  filterMap: _filterMap,
  partitionMap: _partitionMap
}

/**
 * @since 0.1.0
 */
export const FilterableWithIndex: FilterableWithIndex1<URI, number> = {
  URI,
  map: _map,
  mapWithIndex: _mapWithIndex,
  compact,
  separate,
  filter: _filter,
  partition: _partition,
  filterMap: _filterMap,
  partitionMap: _partitionMap,
  filterWithIndex: _filterWithIndex,
  partitionWithIndex: _partitionWithIndex,
  filterMapWithIndex: _filterMapWithIndex,
  partitionMapWithIndex: _partitionMapWithIndex
}

/**
 * @since 0.1.0
 */
export const getMonoid = <A = never>(S: Semigroup<AsyncIterable<A>>): Monoid<AsyncIterable<A>> => ({
  concat: S.concat,
  empty: IX.empty()
})

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 0.1.0
 */
export const chain: (
  C: Chain1<URI>
) => <A, B>(f: (a: A) => AsyncIterable<B>) => (ma: AsyncIterable<A>) => AsyncIterable<B> = (C) => (f) => (ma) =>
  C.chain(ma, f)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainWithIndex: (
  C: ChainWithIndex1<URI, number>
) => <A, B>(f: (i: number, a: A) => AsyncIterable<B>) => (ma: AsyncIterable<A>) => AsyncIterable<B> =
  (C) => (f) => (ma) =>
    C.chainWithIndex(ma, f)

/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 0.1.0
 */
export const flatten: (C: Chain1<URI>) => <A>(mma: AsyncIterable<AsyncIterable<A>>) => AsyncIterable<A> =
  (C) => (mma) =>
    C.chain(mma, identity)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainFirst = (C: Chain1<URI>) =>
  /*#__PURE__*/
  chainFirst_(C)

/**
 * @since 0.1.0
 */
export const bind = (C: Chain1<URI>) =>
  /*#__PURE__*/
  bind_(C)
