/**
 * AsyncIterableOption/Switch
 *
 * @since 0.1.0
 */
import type { Monad1 } from 'fp-ts/Monad'
import type { MonadIO1 } from 'fp-ts/MonadIO'
import type { MonadTask1 } from 'fp-ts/MonadTask'
import type { Monoid } from 'fp-ts/Monoid'
import type { Semigroup } from 'fp-ts/Semigroup'
import * as IX from '@reactivex/ix-es5-cjs/asynciterable'
import type { MonadAsyncIterable1 } from '../MonadAsyncIterable'
import * as AIs from '../AsyncIterable/Switch'
import * as AIO from '../AsyncIterableOption'
import type { URI } from '../AsyncIterableOption'

const AIChain = AIs.ChainWithIndex

/**
 * @category instances
 * @since 0.1.0
 */
export const Chain = AIO.getChain(AIChain)

/**
 * @category instances
 * @since 0.1.0
 */
export const ChainWithIndex = AIO.getChainWithIndex(AIChain)

/**
 * @category instances
 * @since 0.1.0
 */
export const Monad: Monad1<URI> = AIO.getMonad(AIChain)

/**
 * @category instances
 * @since 0.1.0
 */
export const MonadIO: MonadIO1<URI> = AIO.getMonadIO(AIChain)

/**
 * @category instances
 * @since 0.1.0
 */
export const MonadTask: MonadTask1<URI> = AIO.getMonadTask(AIChain)

/**
 * @category instances
 * @since 0.1.0
 */
export const MonadAsyncIterable: MonadAsyncIterable1<URI> = AIO.getMonadAsyncIterable(AIChain)

/**
 * Get a `Semigroup` based on the concatenation of `AsyncIterable`s.
 * See also [`getMonoid`](#getMonoid).
 *
 * @category instances
 * @since 0.1.0
 */
export const getSemigroup = <A = never>(): Semigroup<AIO.AsyncIterableOption<A>> => AIs.getSemigroup()

/**
 * @since 0.1.0
 */
export const getMonoid = <A = never>(): Monoid<AIO.AsyncIterableOption<A>> => ({
  concat: getSemigroup<A>().concat,
  empty: IX.empty()
})

/**
 * @category Monad
 * @since 0.1.0
 */
export const chain = AIO.chain(AIChain)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainWithIndex = AIO.chainWithIndex(AIChain)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainFirst = AIO.chainFirst(AIChain)

/**
 * @category interop
 * @since 0.1.0
 */
export const chainNullableK = AIO.chainNullableK(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainOptionK = AIO.chainOptionK(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainIOK = AIO.chainIOK(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstIOK = AIO.chainFirstIOK(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainEitherK = AIO.chainEitherK(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstEitherK = AIO.chainFirstEitherK(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainAsyncIterableK = AIO.chainAsyncIterableK(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstAsyncIterableK = AIO.chainFirstAsyncIterableK(AIChain)

/**
 * @since 0.1.0
 */
export const bind = AIO.bind(AIChain)

/**
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 0.1.0
 */
export const flatten = AIO.flatten(AIChain)

/**
 * @category destructors
 * @since 0.1.0
 */
export const matchE = AIO.matchE(AIChain)

/**
 * Alias of [`matchE`](#matche).
 *
 * @category destructors
 * @since 0.1.0
 */
export const fold = AIO.fold(AIChain)

/**
 * Less strict version of [`matchE`](#matche).
 *
 * @category destructors
 * @since 0.1.0
 */
export const matchEW = AIO.matchEW(AIChain)

/**
 * Alias of [`matchEW`](#matchew).
 *
 * @category destructors
 * @since 0.1.0
 */
export const foldW = AIO.foldW(AIChain)

/**
 * @category destructors
 * @since 0.1.0
 */
export const getOrElse = AIO.getOrElse(AIChain)

/**
 * Less strict version of [`getOrElse`](#getorelse).
 *
 * @category destructors
 * @since 0.1.0
 */
export const getOrElseW = AIO.getOrElseW(AIChain)
