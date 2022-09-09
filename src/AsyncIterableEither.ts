/**
 * ```ts
 * interface AsyncIterableEither<E, A> extends AsyncIterable<Either<E, A>> {}
 * ```
 *
 * @since 0.1.0
 */
import type { Applicative2, Applicative2C } from 'fp-ts/Applicative'
import { ap as ap_, apFirst as apFirst_, Apply1, Apply2, apS as apS_, apSecond as apSecond_ } from 'fp-ts/Apply'
import type { Bifunctor2 } from 'fp-ts/Bifunctor'
import { bind as bind_, chainFirst as chainFirst_, Chain1, Chain2 } from 'fp-ts/Chain'
import { compact as compact_, Compactable2C, separate as separate_ } from 'fp-ts/Compactable'
import * as E from 'fp-ts/Either'
import * as ET from 'fp-ts/EitherT'
import {
  filter as filter_,
  Filterable2C,
  filterMap as filterMap_,
  partition as partition_,
  partitionMap as partitionMap_
} from 'fp-ts/Filterable'
import {
  FromEither2,
  fromEitherK as fromEitherK_,
  fromOption as fromOption_,
  fromOptionK as fromOptionK_,
  fromPredicate as fromPredicate_,
  chainEitherK as chainEitherK_,
  chainOptionK as chainOptionK_,
  chainFirstEitherK as chainFirstEitherK_,
  filterOrElse as filterOrElse_
} from 'fp-ts/FromEither'
import { FromIO2, fromIOK as fromIOK_, chainFirstIOK as chainFirstIOK_, chainIOK as chainIOK_ } from 'fp-ts/FromIO'
import type { FromTask2 } from 'fp-ts/FromTask'
import { bindTo as bindTo_, flap as flap_, Functor2 } from 'fp-ts/Functor'
import type { FunctorWithIndex2 } from 'fp-ts/FunctorWithIndex'
import type { IO } from 'fp-ts/IO'
import type { IOEither, URI as IEURI } from 'fp-ts/IOEither'
import type { Monad2 } from 'fp-ts/Monad'
import type { MonadIO2 } from 'fp-ts/MonadIO'
import type { MonadTask2 } from 'fp-ts/MonadTask'
import type { MonadThrow2 } from 'fp-ts/MonadThrow'
import type { Monoid } from 'fp-ts/Monoid'
import type { NaturalTransformation12C, NaturalTransformation22 } from 'fp-ts/NaturalTransformation'
import type { Pointed2 } from 'fp-ts/Pointed'
import type { Predicate } from 'fp-ts/Predicate'
import type { Refinement } from 'fp-ts/Refinement'
import type { Semigroup } from 'fp-ts/Semigroup'
import type { Task } from 'fp-ts/Task'
import type { TaskEither } from 'fp-ts/TaskEither'
import { flow, identity, Lazy, pipe } from 'fp-ts/function'
import * as IX from '@reactivex/ix-es5-cjs/asynciterable'
import * as IXO from '@reactivex/ix-es5-cjs/asynciterable/operators'
import type { AsyncIterableOption, URI as AIOURI } from './AsyncIterableOption'
import type { ChainWithIndex1, ChainWithIndex2 } from './ChainWithIndex'
import {
  FromAsyncIterable2,
  fromAsyncIterableK as fromAsyncIterableK_,
  chainFirstAsyncIterableK as chainFirstAsyncIterableK_,
  chainAsyncIterableK as chainAsyncIterableK_
} from './FromAsyncIterable'
import type { MonadAsyncIterable2 } from './MonadAsyncIterable'
import * as AI from './AsyncIterable'
import * as AIT from './AsyncIterableT'
import Either = E.Either

type AIChain = Chain1<AI.URI>
type AIChainWithIndex = ChainWithIndex1<AI.URI, number>

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 0.1.0
 */
export interface AsyncIterableEither<E, A> extends AsyncIterable<Either<E, A>> {}

/**
 * @since 0.1.0
 */
export const getMonoid = <E = never, A = never>(
  S: Semigroup<AsyncIterableEither<E, A>>
): Monoid<AsyncIterableEither<E, A>> => ({
  concat: S.concat,
  empty: IX.empty()
})

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 0.1.0
 */
export const left: <E = never, A = never>(e: E) => AsyncIterableEither<E, A> =
  /*#__PURE__*/
  ET.left(AI.Pointed)

/**
 * @category constructors
 * @since 0.1.0
 */
export const right: <E = never, A = never>(a: A) => AsyncIterableEither<E, A> =
  /*#__PURE__*/
  ET.right(AI.Pointed)

/**
 * @category constructors
 * @since 0.1.0
 */
export const rightAsyncIterable: <E = never, A = never>(ma: AsyncIterable<A>) => AsyncIterableEither<E, A> =
  /*#__PURE__*/
  ET.rightF(AI.Functor)

/**
 * @category constructors
 * @since 0.1.0
 */
export const leftAsyncIterable: <E = never, A = never>(me: AsyncIterable<E>) => AsyncIterableEither<E, A> =
  /*#__PURE__*/
  ET.leftF(AI.Functor)

/**
 * @category constructors
 * @since 0.1.0
 */
export const rightIO: <E = never, A = never>(ma: IO<A>) => AsyncIterableEither<E, A> =
  /*#__PURE__*/
  flow(AI.fromIO, rightAsyncIterable)

/**
 * @category constructors
 * @since 0.1.0
 */
export const leftIO: <E = never, A = never>(me: IO<E>) => AsyncIterableEither<E, A> =
  /*#__PURE__*/
  flow(AI.fromIO, leftAsyncIterable)

/**
 * @category constructors
 * @since 0.1.0
 */
export const rightTask: <E = never, A = never>(ma: Task<A>) => AsyncIterableEither<E, A> =
  /*#__PURE__*/
  flow(AI.fromTask, rightAsyncIterable)

/**
 * @category constructors
 * @since 0.1.0
 */
export const leftTask: <E = never, A = never>(me: Task<E>) => AsyncIterableEither<E, A> =
  /*#__PURE__*/
  flow(AI.fromTask, leftAsyncIterable)

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 0.1.0
 */
export const fromIO: FromIO2<URI>['fromIO'] = rightIO

/**
 * @category natural transformations
 * @since 0.1.0
 */
export const fromTask: FromTask2<URI>['fromTask'] = rightTask

/**
 * @category natural transformations
 * @since 0.1.0
 */
export const fromTaskEither: <E = never, A = never>(me: TaskEither<E, A>) => AsyncIterableEither<E, A> = AI.fromTask

/**
 * @category natural transformations
 * @since 0.1.0
 */
export const fromAsyncIterable: FromAsyncIterable2<URI>['fromAsyncIterable'] = rightAsyncIterable

/**
 * @category natural transformations
 * @since 0.1.0
 */
export const fromEither: FromEither2<URI>['fromEither'] = AI.of

/**
 * @category natural transformations
 * @since 0.1.0
 */
export const fromIOEither: NaturalTransformation22<IEURI, URI> = AI.fromIO

/**
 * @category natural transformations
 * @since 0.1.0
 */
export const fromAsyncIterableOption: <E>(onNone: Lazy<E>) => NaturalTransformation12C<AIOURI, URI, E> = (onNone) =>
  AI.map(E.fromOption(onNone))

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 0.1.0
 */
export const match: <E, B, A>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B
) => (ma: AsyncIterableEither<E, A>) => AsyncIterable<B> =
  /*#__PURE__*/
  ET.match(AI.Functor)

/**
 * Less strict version of [`match`](#match).
 *
 * @category destructors
 * @since 0.1.0
 */
export const matchW: <E, B, A, C>(
  onLeft: (e: E) => B,
  onRight: (a: A) => C
) => (ma: AsyncIterableEither<E, A>) => AsyncIterable<B | C> = match as any

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

/**
 * Transforms a `AsyncIterable` that may reject to a `AsyncIterable` that never rejects and returns an `Either` instead.
 *
 * See also [`tryCatchK`](#trycatchk).
 *
 * @category interop
 * @since 0.1.0
 */
export const tryCatch = <E, A>(
  f: Lazy<AsyncIterable<A>>,
  onRejected: (reason: unknown) => E
): AsyncIterableEither<E, A> =>
  pipe(
    IX.defer(() => f()),
    AI.map(E.right),
    IXO.catchError(flow(onRejected, E.left, AI.of))
  )

/**
 * Converts a function returning a `AsyncIterable` to one returning a `AsyncIterableEither`.
 *
 * @category interop
 * @since 0.1.0
 */
export const tryCatchK =
  <E, A extends ReadonlyArray<unknown>, B>(
    f: (...a: A) => AsyncIterable<B>,
    onRejected: (reason: unknown) => E
  ): ((...a: A) => AsyncIterableEither<E, B>) =>
  (...a) =>
    tryCatch(() => f(...a), onRejected)

/**
 * @category interop
 * @since 0.1.0
 */
export const toUnion: <E, A>(fa: AsyncIterableEither<E, A>) => AsyncIterable<E | A> =
  /*#__PURE__*/
  ET.toUnion(AI.Functor)

/**
 * @category interop
 * @since 0.1.0
 */
export const fromNullable: <E>(e: E) => <A>(a: A) => AsyncIterableEither<E, NonNullable<A>> =
  /*#__PURE__*/
  ET.fromNullable(AI.Pointed)

/**
 * @category interop
 * @since 0.1.0
 */
export const fromNullableK: <E>(
  e: E
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => AsyncIterableEither<E, NonNullable<B>> =
  /*#__PURE__*/
  ET.fromNullableK(AI.Pointed)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 0.1.0
 */
export const swap: <E, A>(ma: AsyncIterableEither<E, A>) => AsyncIterableEither<A, E> =
  /*#__PURE__*/
  ET.swap(AI.Functor)

/**
 * @category combinators
 * @since 0.1.0
 */
export const fromAsyncIterableOptionK = <E>(
  onNone: Lazy<E>
): (<A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => AsyncIterableOption<B>
) => (...a: A) => AsyncIterableEither<E, B>) => {
  const from = fromAsyncIterableOption(onNone)
  return (f) => flow(f, from)
}

/**
 * @category combinators
 * @since 0.1.0
 */
export const fromIOEitherK = <E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IOEither<E, B>
): ((...a: A) => AsyncIterableEither<E, B>) => flow(f, fromIOEither)

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

const _map: Functor2<URI>['map'] = (fa, f) => pipe(fa, map(f))
const _mapWithIndex: FunctorWithIndex2<URI, number>['mapWithIndex'] = (fa, f) => pipe(fa, mapWithIndex(f))
const _ap: Apply2<URI>['ap'] = (fab, fa) => pipe(fab, ap(fa))
/* istanbul ignore next */
const _bimap: Bifunctor2<URI>['bimap'] = (fa, f, g) => pipe(fa, bimap(f, g))
/* istanbul ignore next */
const _mapLeft: Bifunctor2<URI>['mapLeft'] = (fa, f) => pipe(fa, mapLeft(f))

const _chain =
  (AIC: AIChain): Chain2<URI>['chain'] =>
  (fa, f) =>
    pipe(fa, chain(AIC)(f))

const _chainWithIndex =
  (AIC: AIChainWithIndex): ChainWithIndex2<URI, number>['chainWithIndex'] =>
  (fa, f) =>
    pipe(fa, chainWithIndex(AIC)(f))

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
export const map: <A, B>(f: (a: A) => B) => <E>(fa: AsyncIterableEither<E, A>) => AsyncIterableEither<E, B> =
  /*#__PURE__*/
  ET.map(AI.Functor)

/**
 * Same as [`map`](#map), but the iterating function takes both the index and the value
 * of the element.
 *
 * @category FunctorWithIndex
 * @since 0.1.0
 */
export const mapWithIndex: <A, B>(
  f: (i: number, a: A) => B
) => <E>(fa: AsyncIterableEither<E, A>) => AsyncIterableEither<E, B> = AIT.mapWithIndex(E.Functor)

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 0.1.0
 */
export const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => (fa: AsyncIterableEither<E, A>) => AsyncIterableEither<G, B> =
  /*#__PURE__*/
  ET.bimap(AI.Functor)

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 0.1.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: AsyncIterableEither<E, A>) => AsyncIterableEither<G, A> =
  /*#__PURE__*/
  ET.mapLeft(AI.Functor)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 0.1.0
 */
export const ap: <E, A>(
  fa: AsyncIterableEither<E, A>
) => <B>(fab: AsyncIterableEither<E, (a: A) => B>) => AsyncIterableEither<E, B> =
  /*#__PURE__*/
  ET.ap(AI.Apply)

/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 0.1.0
 */
export const apW: <E2, A>(
  fa: AsyncIterableEither<E2, A>
) => <E1, B>(fab: AsyncIterableEither<E1, (a: A) => B>) => AsyncIterableEither<E1 | E2, B> = ap as any

/**
 * @category Pointed
 * @since 0.1.0
 */
export const of: <E = never, A = never>(a: A) => AsyncIterableEither<E, A> = right

/**
 * @category MonadAsyncIterable
 * @since 0.1.0
 */
export const throwError: MonadThrow2<URI>['throwError'] = left

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 0.1.0
 */
export const URI = 'AsyncIterableEither'

/**
 * @category instances
 * @since 0.1.0
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: AsyncIterableEither<E, A>
  }
}

/**
 * @category instances
 * @since 0.1.0
 */
export const getCompactable = <E>(M: Monoid<E>): Compactable2C<URI, E> => {
  const C = E.getCompactable(M)
  return {
    URI,
    _E: undefined as any,
    compact: compact_(AI.Functor, C),
    separate: separate_(AI.Functor, C, E.Functor)
  }
}

/**
 * @category instances
 * @since 0.1.0
 */
export function getFilterable<E>(M: Monoid<E>): Filterable2C<URI, E> {
  const F = E.getFilterable(M)
  const C = getCompactable(M)

  const filterF = filter_(AI.Functor, F)
  const filterMapF = filterMap_(AI.Functor, F)
  const partitionF = partition_(AI.Functor, F)
  const partitionMapF = partitionMap_(AI.Functor, F)
  return {
    URI,
    _E: undefined as any,
    map: _map,
    compact: C.compact,
    separate: C.separate,
    filter: <A>(fa: AsyncIterableEither<E, A>, predicate: Predicate<A>) => pipe(fa, filterF(predicate)),
    filterMap: (fa, f) => pipe(fa, filterMapF(f)),
    partition: <A>(fa: AsyncIterableEither<E, A>, predicate: Predicate<A>) => pipe(fa, partitionF(predicate)),
    partitionMap: (fa, f) => pipe(fa, partitionMapF(f))
  }
}

/**
 * @category instances
 * @since 0.1.0
 */
export const Functor: Functor2<URI> = {
  URI,
  map: _map
}

/**
 * @category instances
 * @since 0.1.0
 */
export const FunctorWithIndex: FunctorWithIndex2<URI, number> = {
  URI,
  map: _map,
  mapWithIndex: _mapWithIndex
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 0.1.0
 */
export const flap =
  /*#__PURE__*/
  flap_(Functor)

/**
 * @category instances
 * @since 0.1.0
 */
export const Pointed: Pointed2<URI> = {
  URI,
  of
}

/**
 * @category instances
 * @since 0.1.0
 */
export const Apply: Apply2<URI> = {
  URI,
  map: _map,
  ap: _ap
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.1.0
 */
export const apFirst =
  /*#__PURE__*/
  apFirst_(Apply)

/**
 * Less strict version of [`apFirst`](#apfirst).
 *
 * @category combinators
 * @since 0.1.0
 */
export const apFirstW: <E2, B>(
  second: AsyncIterableEither<E2, B>
) => <E1, A>(first: AsyncIterableEither<E1, A>) => AsyncIterableEither<E1 | E2, A> = apFirst as any

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.1.0
 */
export const apSecond =
  /*#__PURE__*/
  apSecond_(Apply)

/**
 * Less strict version of [`apSecond`](#apsecond).
 *
 * @category combinators
 * @since 0.1.0
 */
export const apSecondW: <E2, B>(
  second: AsyncIterableEither<E2, B>
) => <E1, A>(first: AsyncIterableEither<E1, A>) => AsyncIterableEither<E1 | E2, B> = apSecond as any

/**
 * @category instances
 * @since 0.1.0
 */
export const Applicative: Applicative2<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of
}

/**
 * @since 0.1.0
 */
export const getChain = (AIC: AIChain): Chain2<URI> => ({
  URI: URI,
  map: _map,
  ap: _ap,
  chain: _chain(AIC)
})

/**
 * @since 0.1.0
 */
export const getChainWithIndex = (AIC: AIChainWithIndex): ChainWithIndex2<URI, number> => ({
  URI: URI,
  map: _map,
  mapWithIndex: _mapWithIndex,
  ap: _ap,
  chain: _chain(AIC),
  chainWithIndex: _chainWithIndex(AIC)
})

/**
 * @since 0.1.0
 */
export const getMonad: (AIC: AIChain) => Monad2<URI> = (AIC) => ({
  URI,
  map: _map,
  of,
  ap: _ap,
  chain: _chain(AIC)
})

/**
 * @since 0.1.0
 */
export const getMonadIO: (AIC: AIChain) => MonadIO2<URI> = (AIC) => ({
  URI,
  map: _map,
  of,
  ap: _ap,
  chain: _chain(AIC),
  fromIO
})

/**
 * @since 0.1.0
 */
export const getMonadTask: (AIC: AIChain) => MonadTask2<URI> = (AIC) => ({
  URI,
  map: _map,
  ap: _ap,
  of,
  chain: _chain(AIC),
  fromIO,
  fromTask
})

/**
 * @since 0.1.0
 */
export const getMonadAsyncIterable: (AIC: AIChainWithIndex) => MonadAsyncIterable2<URI> = (AIC) => ({
  URI,
  map: _map,
  mapWithIndex: _mapWithIndex,
  ap: _ap,
  of,
  chain: _chain(AIC),
  chainWithIndex: _chainWithIndex(AIC),
  fromIO,
  fromTask,
  fromAsyncIterable
})

/**
 * @category instances
 * @since 0.1.0
 */
export const getMonadThrow: (AIC: AIChain) => MonadThrow2<URI> = (AIC) => ({
  URI,
  map: _map,
  ap: _ap,
  chain: _chain(AIC),
  of,
  throwError
})

/**
 * @category instances
 * @since 0.1.0
 */
export const Bifunctor: Bifunctor2<URI> = {
  URI,
  bimap: _bimap,
  mapLeft: _mapLeft
}

/**
 * @category instances
 * @since 0.1.0
 */
export const FromEither: FromEither2<URI> = {
  URI,
  fromEither
}

/**
 * @category natural transformations
 * @since 0.1.0
 */
export const fromOption =
  /*#__PURE__*/
  fromOption_(FromEither)

/**
 * @category combinators
 * @since 0.1.0
 */
export const fromOptionK =
  /*#__PURE__*/
  fromOptionK_(FromEither)

/**
 * @category constructors
 * @since 0.1.0
 */
export const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => AsyncIterableEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <B>(b: B) => AsyncIterableEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => AsyncIterableEither<E, A>
} =
  /*#__PURE__*/
  fromPredicate_(FromEither)

/**
 * @category combinators
 * @since 0.1.0
 */
export const fromEitherK: <E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => E.Either<E, B>
) => (...a: A) => AsyncIterableEither<E, B> =
  /*#__PURE__*/
  fromEitherK_(FromEither)

/**
 * @category instances
 * @since 0.1.0
 */
export const FromIO: FromIO2<URI> = {
  URI,
  fromIO
}

/**
 * @category combinators
 * @since 0.1.0
 */
export const fromIOK =
  /*#__PURE__*/
  fromIOK_(FromIO)

/**
 * @category instances
 * @since 0.1.0
 */
export const FromAsyncIterable: FromAsyncIterable2<URI> = {
  URI,
  fromIO,
  fromTask,
  fromAsyncIterable
}

/**
 * @category combinators
 * @since 0.1.0
 */
export const fromAsyncIterableK =
  /*#__PURE__*/
  fromAsyncIterableK_(FromAsyncIterable)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Less strict version of `getOnEmpty`.
 *
 * @category combinators
 * @since 0.1.0
 */
export const getOnEmptyW: <E2, B>(
  onEmpty: Lazy<AsyncIterableEither<E2, B>>
) => <E, A>(ma: AsyncIterableEither<E, A>) => AsyncIterableEither<E | E2, A | B> = AI.getOnEmpty

/**
 * Returns the provided AsyncIterableEither if empty.
 *
 * @category combinators
 * @since 0.1.0
 */
export const getOnEmpty: <E, B>(
  onEmpty: Lazy<AsyncIterableEither<E, B>>
) => <A>(ma: AsyncIterableEither<E, A>) => AsyncIterableEither<E, A | B> = getOnEmptyW

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 0.1.0
 */
export const Do: AsyncIterableEither<never, {}> =
  /*#__PURE__*/
  of({})

/**
 * @since 0.1.0
 */
export const bindTo =
  /*#__PURE__*/
  bindTo_(Functor)

// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 0.1.0
 */
export const apS =
  /*#__PURE__*/
  apS_(Apply)

/**
 * @since 0.1.0
 */
export const apSW: <A, N extends string, E2, B>(
  name: Exclude<N, keyof A>,
  fb: AsyncIterableEither<E2, B>
) => <E1>(
  fa: AsyncIterableEither<E1, A>
) => AsyncIterableEither<E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = apS as any

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 0.1.0
 */
export const ApT: AsyncIterableEither<never, readonly []> =
  /*#__PURE__*/
  of([])

// -------------------------------------------------------------------------------------
// Chain
// -------------------------------------------------------------------------------------

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 0.1.0
 */
export const chain: (
  C: AIChain
) => <E, A, B>(
  f: (a: A) => AsyncIterableEither<E, B>
) => (ma: AsyncIterableEither<E, A>) => AsyncIterableEither<E, B> = (AIC) => (f) => (fa) =>
  AIC.chain(fa, E.fold(left, f))

/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 0.1.0
 */
export const chainW: (
  C: AIChain
) => <E2, A, B>(
  f: (a: A) => AsyncIterableEither<E2, B>
) => <E1>(ma: AsyncIterableEither<E1, A>) => AsyncIterableEither<E1 | E2, B> = chain as any

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainWithIndex: (
  C: AIChainWithIndex
) => <E, A, B>(
  f: (i: number, a: A) => AsyncIterableEither<E, B>
) => (ma: AsyncIterableEither<E, A>) => AsyncIterableEither<E, B> = (AIC) => (f) => (fa) =>
  AIC.chainWithIndex(fa, (i, ea) =>
    pipe(
      ea,
      E.fold(left, (a) => f(i, a))
    )
  )

/**
 * Less strict version of [`flatten`](#flatten).
 *
 * @category combinators
 * @since 0.1.0
 */
export const flattenW: (
  C: AIChain
) => <E1, E2, A>(mma: AsyncIterableEither<E1, AsyncIterableEither<E2, A>>) => AsyncIterableEither<E1 | E2, A> = (AIC) =>
  /*#__PURE__*/
  chainW(AIC)(identity)

/**
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 0.1.0
 */
export const flatten: (
  C: AIChain
) => <E, A>(mma: AsyncIterableEither<E, AsyncIterableEither<E, A>>) => AsyncIterableEither<E, A> = flattenW

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainFirst = (C: AIChain) =>
  /*#__PURE__*/
  chainFirst_(getChain(C))

/**
 * Less strict version of [`chainFirst`](#chainfirst).
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstW: (
  C: AIChain
) => <E2, A, B>(
  f: (a: A) => AsyncIterableEither<E2, B>
) => <E1>(ma: AsyncIterableEither<E1, A>) => AsyncIterableEither<E1 | E2, A> = chainFirst as any

/**
 * @since 0.1.0
 */
export const bind = (C: AIChain) => bind_(getChain(C))

/**
 * @since 0.1.0
 */
export const bindW: (
  C: AIChain
) => <N extends string, A, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => AsyncIterableEither<E2, B>
) => <E1>(
  fa: AsyncIterableEither<E1, A>
) => AsyncIterableEither<E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = bind as any

/**
 * @category interop
 * @since 0.1.0
 */
export const chainNullableK: (
  C: AIChain
) => <E>(
  e: E
) => <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: AsyncIterableEither<E, A>) => AsyncIterableEither<E, NonNullable<B>> = (C) =>
  ET.chainNullableK(AI.getMonad(C))

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainOptionK = (AIC: AIChain) =>
  /*#__PURE__*/
  chainOptionK_(FromEither, getChain(AIC))

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainEitherK: (
  AIC: AIChain
) => <E, A, B>(f: (a: A) => E.Either<E, B>) => (ma: AsyncIterableEither<E, A>) => AsyncIterableEither<E, B> = (AIC) =>
  /*#__PURE__*/
  chainEitherK_(FromEither, getChain(AIC))

/**
 * Less strict version of [`chainEitherK`](#chaineitherk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainEitherKW: (
  AIC: AIChain
) => <E2, A, B>(
  f: (a: A) => E.Either<E2, B>
) => <E1>(ma: AsyncIterableEither<E1, A>) => AsyncIterableEither<E1 | E2, B> = chainEitherK as any

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstEitherK = (AIC: AIChain) =>
  /*#__PURE__*/
  chainFirstEitherK_(FromEither, getChain(AIC))

/**
 * Less strict version of [`chainFirstEitherK`](#chainfirsteitherk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstEitherKW: (
  AIC: AIChain
) => <A, E2, B>(
  f: (a: A) => E.Either<E2, B>
) => <E1>(ma: AsyncIterableEither<E1, A>) => AsyncIterableEither<E1 | E2, A> = chainFirstEitherK as any

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainIOK = (AIC: AIChain) =>
  /*#__PURE__*/
  chainIOK_(FromIO, getChain(AIC))

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstIOK = (AIC: AIChain) =>
  /*#__PURE__*/
  chainFirstIOK_(FromIO, getChain(AIC))

/**
 * Less strict version of [`chainIOEitherK`](#chainioeitherk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainIOEitherKW: (
  AIC: AIChain
) => <E2, A, B>(
  f: (a: A) => IOEither<E2, B>
) => <E1>(ma: AsyncIterableEither<E1, A>) => AsyncIterableEither<E1 | E2, B> = (C) => (f) => chainW(C)(fromIOEitherK(f))

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainIOEitherK: (
  AIC: AIChain
) => <E, A, B>(f: (a: A) => IOEither<E, B>) => (ma: AsyncIterableEither<E, A>) => AsyncIterableEither<E, B> =
  chainIOEitherKW

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainAsyncIterableK = (AIC: AIChain) =>
  /*#__PURE__*/
  chainAsyncIterableK_(FromAsyncIterable, getChain(AIC))

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstAsyncIterableK = (AIC: AIChain) =>
  /*#__PURE__*/
  chainFirstAsyncIterableK_(FromAsyncIterable, getChain(AIC))

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainAsyncIterableOptionKW =
  (AIC: AIChain) =>
  <E2>(onNone: Lazy<E2>) =>
  <A, B>(f: (a: A) => AsyncIterableOption<B>) =>
  <E1>(ma: AsyncIterableEither<E1, A>): AsyncIterableEither<E1 | E2, B> =>
    pipe(ma, chain(AIC)(fromAsyncIterableOptionK<E1 | E2>(onNone)(f)))

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainAsyncIterableOptionK: (
  AIC: AIChain
) => <E>(
  onNone: Lazy<E>
) => <A, B>(f: (a: A) => AsyncIterableOption<B>) => (ma: AsyncIterableEither<E, A>) => AsyncIterableEither<E, B> =
  chainAsyncIterableOptionKW

/**
 * @category destructors
 * @since 0.1.0
 */
export const matchE: (
  C: AIChain
) => <E, A, B>(
  onLeft: (e: E) => AsyncIterable<B>,
  onRight: (a: A) => AsyncIterable<B>
) => (ma: AsyncIterableEither<E, A>) => AsyncIterable<B> = (C) =>
  /*#__PURE__*/
  ET.matchE(AI.getMonad(C))

/**
 * Alias of [`matchE`](#matche).
 *
 * @category destructors
 * @since 0.1.0
 */
export const fold = matchE

/**
 * Less strict version of [`matchE`](#matche).
 *
 * @category destructors
 * @since 0.1.0
 */
export const matchEW: (
  C: AIChain
) => <E, B, A, C>(
  onLeft: (e: E) => AsyncIterable<B>,
  onRight: (a: A) => AsyncIterable<C>
) => (ma: AsyncIterableEither<E, A>) => AsyncIterable<B | C> = matchE as any

/**
 * Alias of [`matchEW`](#matchew).
 *
 * @category destructors
 * @since 0.1.0
 */
export const foldW = matchEW

/**
 * @category destructors
 * @since 0.1.0
 */
export const getOrElse: (
  C: AIChain
) => <E, A>(onLeft: (e: E) => AsyncIterable<A>) => (ma: AsyncIterableEither<E, A>) => AsyncIterable<A> = (C) =>
  /*#__PURE__*/
  ET.getOrElse(AI.getMonad(C))

/**
 * Less strict version of [`getOrElse`](#getorelse).
 *
 * @category destructors
 * @since 0.1.0
 */
export const getOrElseW: (
  C: AIChain
) => <E, B>(onLeft: (e: E) => AsyncIterable<B>) => <A>(ma: AsyncIterableEither<E, A>) => AsyncIterable<A | B> =
  getOrElse as any

/**
 * Returns `ma` if is a `Right` or the value returned by `onLeft` otherwise.
 *
 * See also [alt](#alt).
 *
 * @category combinators
 * @since 0.1.0
 */
export const orElse: (
  C: AIChain
) => <E1, A, E2>(
  onLeft: (e: E1) => AsyncIterableEither<E2, A>
) => (ma: AsyncIterableEither<E1, A>) => AsyncIterableEither<E2, A> = (C) =>
  /*#__PURE__*/
  ET.orElse(AI.getMonad(C))

/**
 * Less strict version of [`orElse`](#orelse).
 *
 * @category combinators
 * @since 0.1.0
 */
export const orElseW: (
  C: AIChain
) => <E1, E2, B>(
  onLeft: (e: E1) => AsyncIterableEither<E2, B>
) => <A>(ma: AsyncIterableEither<E1, A>) => AsyncIterableEither<E2, A | B> = orElse as any

/**
 * @category combinators
 * @since 0.1.0
 */
export const orElseFirst: (
  C: AIChain
) => <E, B>(
  onLeft: (e: E) => AsyncIterableEither<E, B>
) => <A>(ma: AsyncIterableEither<E, A>) => AsyncIterableEither<E, A> = (C) =>
  /*#__PURE__*/
  ET.orElseFirst(AI.getMonad(C))

/**
 * @category combinators
 * @since 0.1.0
 */
export const orElseFirstW: (
  C: AIChain
) => <E1, E2, B>(
  onLeft: (e: E1) => AsyncIterableEither<E2, B>
) => <A>(ma: AsyncIterableEither<E1, A>) => AsyncIterableEither<E1 | E2, A> = orElseFirst as any

/**
 * @category combinators
 * @since 0.1.0
 */
export const orElseFirstIOK: (
  C: AIChain
) => <E, B>(onLeft: (e: E) => IO<B>) => <A>(ma: AsyncIterableEither<E, A>) => AsyncIterableEither<E, A> = (C) => {
  const _orElseFirst = orElseFirst(C)
  return (onLeft) => _orElseFirst(fromIOK(onLeft))
}

/**
 * @category combinators
 * @since 0.1.0
 */
export const orElseFirstAsyncIterableK: (
  C: AIChain
) => <E, B>(onLeft: (e: E) => AsyncIterable<B>) => <A>(ma: AsyncIterableEither<E, A>) => AsyncIterableEither<E, A> = (
  C
) => {
  const _orElseFirst = orElseFirst(C)
  return (onLeft) => _orElseFirst(fromAsyncIterableK(onLeft))
}

/**
 * @category combinators
 * @since 0.1.0
 */
export const orLeft: (
  C: AIChain
) => <E1, E2>(
  onLeft: (e: E1) => AsyncIterable<E2>
) => <A>(fa: AsyncIterableEither<E1, A>) => AsyncIterableEither<E2, A> = (C) => ET.orLeft(AI.getMonad(C))

/**
 * @category combinators
 * @since 0.1.0
 */
export const filterOrElse: {
  (AIC: AIChain): {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (
      ma: AsyncIterableEither<E, A>
    ) => AsyncIterableEither<E, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(
      mb: AsyncIterableEither<E, B>
    ) => AsyncIterableEither<E, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: AsyncIterableEither<E, A>) => AsyncIterableEither<E, A>
  }
} = (AIC) =>
  /*#__PURE__*/
  filterOrElse_(FromEither, getChain(AIC))

/**
 * Less strict version of [`filterOrElse`](#filterorelse).
 *
 * @category combinators
 * @since 0.1.0
 */
export const filterOrElseW: {
  (AIC: AIChain): {
    <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <E1>(
      ma: AsyncIterableEither<E1, A>
    ) => AsyncIterableEither<E1 | E2, B>
    <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1, B extends A>(
      mb: AsyncIterableEither<E1, B>
    ) => AsyncIterableEither<E1 | E2, B>
    <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1>(
      ma: AsyncIterableEither<E1, A>
    ) => AsyncIterableEither<E1 | E2, A>
  }
} = filterOrElse as any

/**
 * @category instances
 * @since 0.1.0
 */
export function getApplicativeAsyncIterableValidation<E>(A: Apply1<AI.URI>, S: Semigroup<E>): Applicative2C<URI, E> {
  const ap = ap_(A, E.getApplicativeValidation(S))
  return {
    URI,
    _E: undefined as any,
    map: _map,
    ap: (fab, fa) => pipe(fab, ap(fa)),
    of
  }
}
