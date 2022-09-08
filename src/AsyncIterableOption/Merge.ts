/* eslint-disable @typescript-eslint/ban-types */
import type { Alt1 } from 'fp-ts/Alt'
import type { Alternative1 } from 'fp-ts/Alternative'
import type { Monad1 } from 'fp-ts/Monad'
import type { MonadIO1 } from 'fp-ts/MonadIO'
import type { MonadTask1 } from 'fp-ts/MonadTask'
import type { Monoid } from 'fp-ts/Monoid'
import type { Semigroup } from 'fp-ts/Semigroup'
import * as IX from 'ix/asynciterable'
import type { MonadAsyncIterable1 } from '../MonadAsyncIterable'
import * as AIm from '../AsyncIterable/Merge'
import * as AIO from '../AsyncIterableOption'
import type { URI } from '../AsyncIterableOption'

const AIChain = AIm.ChainWithIndex

/**
 * @category instances
 */
export const Chain = AIO.getChain(AIChain)

/**
 * @category instances
 */
export const ChainWithIndex = AIO.getChainWithIndex(AIChain)

/**
 * @category instances
 */
export const Monad: Monad1<URI> = AIO.getMonad(AIChain)

/**
 * @category instances
 */
export const MonadIO: MonadIO1<URI> = AIO.getMonadIO(AIChain)

/**
 * @category instances
 */
export const MonadTask: MonadTask1<URI> = AIO.getMonadTask(AIChain)

/**
 * @category instances
 */
export const MonadAsyncIterable: MonadAsyncIterable1<URI> = AIO.getMonadAsyncIterable(AIChain)

/**
 * @category instances
 * @since 2.10.0
 */
export const Alt: Alt1<URI> = AIO.getAlt(AIChain)

/**
 * @category instances
 * @since 2.10.0
 */
export const Alternative: Alternative1<URI> = AIO.getAlternative(AIChain)

/**
 * Get a `Semigroup` based on the concatenation of `AsyncIterable`s.
 * See also [`getMonoid`](#getMonoid).
 *
 * @category instances
 */
export const getSemigroup = <A = never>(): Semigroup<AIO.AsyncIterableOption<A>> => AIm.getSemigroup()

export const getMonoid = <A = never>(): Monoid<AIO.AsyncIterableOption<A>> => ({
    concat: getSemigroup<A>().concat,
    empty: IX.empty(),
})

/**
 * @category Monad
 * @since 2.10.0
 */
export const chain = AIO.chain(AIChain)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category combinators
 */
export const chainWithIndex = AIO.chainWithIndex(AIChain)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.10.0
 */
export const chainFirst = AIO.chainFirst(AIChain)

/**
 * @category interop
 * @since 2.10.0
 */
export const chainNullableK = AIO.chainNullableK(AIChain)

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainOptionK = AIO.chainOptionK(AIChain)

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainIOK = AIO.chainIOK(AIChain)

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainFirstIOK = AIO.chainFirstIOK(AIChain)

/**
 * @category combinators
 * @since 2.12.0
 */
export const chainEitherK = AIO.chainEitherK(AIChain)

/**
 * @category combinators
 * @since 2.12.0
 */
export const chainFirstEitherK = AIO.chainFirstEitherK(AIChain)

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainAsyncIterableK = AIO.chainAsyncIterableK(AIChain)

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainFirstAsyncIterableK = AIO.chainFirstAsyncIterableK(AIChain)

/**
 * @since 2.10.0
 */
export const bind = AIO.bind(AIChain)

/**
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.10.0
 */
export const flatten = AIO.flatten(AIChain)

/**
 * @category Alt
 * @since 2.10.0
 */
export const alt = AIO.alt(AIChain)

/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.10.0
 */
export const altW = AIO.altW(AIChain)

/**
 * @category destructors
 * @since 2.10.0
 */
export const matchE = AIO.matchE(AIChain)

/**
 * Alias of [`matchE`](#matche).
 *
 * @category destructors
 * @since 2.10.0
 */
export const fold = AIO.fold(AIChain)

/**
 * Less strict version of [`matchE`](#matche).
 *
 * @category destructors
 * @since 2.10.0
 */
export const matchEW = AIO.matchEW(AIChain)

/**
 * Alias of [`matchEW`](#matchew).
 *
 * @category destructors
 * @since 2.10.0
 */
export const foldW = AIO.foldW(AIChain)

/**
 * @category destructors
 * @since 2.10.0
 */
export const getOrElse = AIO.getOrElse(AIChain)

/**
 * Less strict version of [`getOrElse`](#getorelse).
 *
 * @category destructors
 * @since 2.10.0
 */
export const getOrElseW = AIO.getOrElseW(AIChain)
