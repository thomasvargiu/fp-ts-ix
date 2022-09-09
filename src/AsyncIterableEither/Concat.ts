/**
 * AsyncIterableEither/Concat
 *
 * @since 0.1.0
 */
import type { Chain2 } from 'fp-ts/Chain'
import type { Monad2 } from 'fp-ts/Monad'
import type { MonadIO2 } from 'fp-ts/MonadIO'
import type { MonadTask2 } from 'fp-ts/MonadTask'
import type { MonadThrow2 } from 'fp-ts/MonadThrow'
import type { Monoid } from 'fp-ts/Monoid'
import type { Semigroup } from 'fp-ts/Semigroup'
import * as IX from '@reactivex/ix-es5-cjs/asynciterable'
import type { ChainWithIndex2 } from '../ChainWithIndex'
import type { MonadAsyncIterable2 } from '../MonadAsyncIterable'
import * as AIc from '../AsyncIterable/Concat'
import * as AIE from '../AsyncIterableEither'
import type { URI, AsyncIterableEither } from '../AsyncIterableEither'

const AIChain = AIc.ChainWithIndex

/**
 * @category instances
 * @since 0.1.0
 */
export const Chain: Chain2<URI> = AIE.getChain(AIChain)

/**
 * @category instances
 * @since 0.1.0
 */
export const ChainWithIndex: ChainWithIndex2<URI, number> = AIE.getChainWithIndex(AIChain)

/**
 * @category instances
 * @since 0.1.0
 */
export const Monad: Monad2<URI> = AIE.getMonad(AIChain)

/**
 * @category instances
 * @since 0.1.0
 */
export const MonadIO: MonadIO2<URI> = AIE.getMonadIO(AIChain)

/**
 * @category instances
 * @since 0.1.0
 */
export const MonadTask: MonadTask2<URI> = AIE.getMonadTask(AIChain)

/**
 * @category instances
 * @since 0.1.0
 */
export const MonadAsyncIterable: MonadAsyncIterable2<URI> = AIE.getMonadAsyncIterable(AIChain)

/**
 * @category instances
 * @since 0.1.0
 */
export const MonadThrow: MonadThrow2<URI> = AIE.getMonadThrow(AIChain)

/**
 * Get a `Semigroup` based on the concatenation of `AsyncIterable`s.
 * See also [`getMonoid`](#getMonoid).
 *
 * @category instances
 * @since 0.1.0
 */
export const getSemigroup = <E = never, A = never>(): Semigroup<AsyncIterableEither<E, A>> => AIc.getSemigroup()

/**
 * @since 0.1.0
 */
export const getMonoid = <E = never, A = never>(): Monoid<AsyncIterableEither<E, A>> => ({
  concat: getSemigroup<E, A>().concat,
  empty: IX.empty()
})

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 0.1.0
 */
export const chain = AIE.chain(AIChain)

/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 0.1.0
 */
export const chainW = AIE.chainW(AIChain)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainWithIndex = AIE.chainWithIndex(AIChain)

/**
 * Less strict version of [`flatten`](#flatten).
 *
 * @category combinators
 * @since 0.1.0
 */
export const flattenW = AIE.flattenW(AIChain)

/**
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 0.1.0
 */
export const flatten = AIE.flatten(AIChain)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainFirst = AIE.chainFirst(AIChain)

/**
 * Less strict version of [`chainFirst`](#chainfirst).
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstW = AIE.chainFirstW(AIChain)

/**
 * @since 0.1.0
 */
export const bind = AIE.bind(AIChain)

/**
 * @since 0.1.0
 */
export const bindW = AIE.bindW(AIChain)

/**
 * @category interop
 * @since 0.1.0
 */
export const chainNullableK = AIE.chainNullableK(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainOptionK = AIE.chainOptionK(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainEitherK = AIE.chainEitherK(AIChain)

/**
 * Less strict version of [`chainEitherK`](#chaineitherk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainEitherKW = AIE.chainEitherKW(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstEitherK = AIE.chainFirstEitherK(AIChain)

/**
 * Less strict version of [`chainFirstEitherK`](#chainfirsteitherk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstEitherKW = AIE.chainFirstEitherKW(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainIOK = AIE.chainIOK(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstIOK = AIE.chainFirstIOK(AIChain)

/**
 * Less strict version of [`chainIOEitherK`](#chainioeitherk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainIOEitherKW = AIE.chainIOEitherKW(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainIOEitherK = AIE.chainIOEitherK(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainAsyncIterableK = AIE.chainAsyncIterableK(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstAsyncIterableK = AIE.chainFirstAsyncIterableK(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainAsyncIterableOptionKW = AIE.chainAsyncIterableOptionKW(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainAsyncIterableOptionK = AIE.chainAsyncIterableOptionK(AIChain)

/**
 * @category destructors
 * @since 0.1.0
 */
export const matchE = AIE.matchE(AIChain)

/**
 * Alias of [`matchE`](#matche).
 *
 * @category destructors
 * @since 0.1.0
 */
export const fold = AIE.fold(AIChain)

/**
 * Less strict version of [`matchE`](#matche).
 *
 * @category destructors
 * @since 0.1.0
 */
export const matchEW = AIE.matchEW(AIChain)

/**
 * Alias of [`matchEW`](#matchew).
 *
 * @category destructors
 * @since 0.1.0
 */
export const foldW = AIE.foldW(AIChain)

/**
 * @category destructors
 * @since 0.1.0
 */
export const getOrElse = AIE.getOrElse(AIChain)

/**
 * Less strict version of [`getOrElse`](#getorelse).
 *
 * @category destructors
 * @since 0.1.0
 */
export const getOrElseW = AIE.getOrElseW(AIChain)

/**
 * Returns `ma` if is a `Right` or the value returned by `onLeft` otherwise.
 *
 * See also [alt](#alt).
 *
 * @category combinators
 * @since 0.1.0
 */
export const orElse = AIE.orElse(AIChain)

/**
 * Less strict version of [`orElse`](#orelse).
 *
 * @category combinators
 * @since 0.1.0
 */
export const orElseW = AIE.orElseW(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const orElseFirst = AIE.orElseFirst(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const orElseFirstW = AIE.orElseFirstW(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const orElseFirstIOK = AIE.orElseFirstIOK(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const orElseFirstAsyncIterableK = AIE.orElseFirstAsyncIterableK(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const orLeft = AIE.orLeft(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const filterOrElse = AIE.filterOrElse(AIChain)

/**
 * Less strict version of [`filterOrElse`](#filterorelse).
 *
 * @category combinators
 * @since 0.1.0
 */
export const filterOrElseW = AIE.filterOrElseW(AIChain)
