import type { Alt2 } from 'fp-ts/Alt'
import type { Chain2 } from 'fp-ts/Chain'
import type { Monad2 } from 'fp-ts/Monad'
import type { MonadIO2 } from 'fp-ts/MonadIO'
import type { MonadTask2 } from 'fp-ts/MonadTask'
import type { MonadThrow2 } from 'fp-ts/MonadThrow'
import type { Monoid } from 'fp-ts/Monoid'
import type { Semigroup } from 'fp-ts/Semigroup'
import * as IX from 'ix/asynciterable'
import type { ChainWithIndex2 } from '../ChainWithIndex'
import type { MonadAsyncIterable2 } from '../MonadAsyncIterable'
import * as AIm from '../AsyncIterable/Merge'
import * as AIE from '../AsyncIterableEither'
import type { URI, AsyncIterableEither } from '../AsyncIterableEither'

const AIChain = AIm.ChainWithIndex

/**
 * @category instances
 */
export const Chain: Chain2<URI> = AIE.getChain(AIChain)

/**
 * @category instances
 */
export const ChainWithIndex: ChainWithIndex2<URI, number> = AIE.getChainWithIndex(AIChain)

/**
 * @category instances
 */
export const Monad: Monad2<URI> = AIE.getMonad(AIChain)

/**
 * @category instances
 */
export const MonadIO: MonadIO2<URI> = AIE.getMonadIO(AIChain)

/**
 * @category instances
 */
export const MonadTask: MonadTask2<URI> = AIE.getMonadTask(AIChain)

/**
 * @category instances
 */
export const MonadAsyncIterable: MonadAsyncIterable2<URI> = AIE.getMonadAsyncIterable(AIChain)

/**
 * @category instances
 */
export const MonadThrow: MonadThrow2<URI> = AIE.getMonadThrow(AIChain)

/**
 * @category instances
 * @since 2.7.0
 */
export const Alt: Alt2<URI> = AIE.getAlt(AIChain)

/**
 * Get a `Semigroup` based on the concatenation of `AsyncIterable`s.
 * See also [`getMonoid`](#getMonoid).
 *
 * @category instances
 */
export const getSemigroup = <E = never, A = never>(): Semigroup<AsyncIterableEither<E, A>> => AIm.getSemigroup()

export const getMonoid = <E = never, A = never>(): Monoid<AsyncIterableEither<E, A>> => ({
    concat: getSemigroup<E, A>().concat,
    empty: IX.empty(),
})

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 */
export const chain = AIE.chain(AIChain)

/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 */
export const chainW = AIE.chainW(AIChain)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category combinators
 */
export const chainWithIndex = AIE.chainWithIndex(AIChain)

/**
 * Less strict version of [`flatten`](#flatten).
 *
 * @category combinators
 * @since 2.11.0
 */
export const flattenW = AIE.flattenW(AIChain)

/**
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const flatten = AIE.flatten(AIChain)

export const alt = AIE.alt(AIChain)

/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
export const altW = AIE.altW(AIChain)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 */
export const chainFirst = AIE.chainFirst(AIChain)

/**
 * Less strict version of [`chainFirst`](#chainfirst).
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.8.0
 */
export const chainFirstW = AIE.chainFirstW(AIChain)

export const bind = AIE.bind(AIChain)

/**
 * @since 2.8.0
 */
export const bindW = AIE.bindW(AIChain)

/**
 * @category interop
 * @since 2.12.0
 */
export const chainNullableK = AIE.chainNullableK(AIChain)

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainOptionK = AIE.chainOptionK(AIChain)

/**
 * @category combinators
 * @since 2.4.0
 */
export const chainEitherK = AIE.chainEitherK(AIChain)

/**
 * Less strict version of [`chainEitherK`](#chaineitherk).
 *
 * @category combinators
 * @since 2.6.1
 */
export const chainEitherKW = AIE.chainEitherKW(AIChain)

/**
 * @category combinators
 * @since 2.12.0
 */
export const chainFirstEitherK = AIE.chainFirstEitherK(AIChain)

/**
 * Less strict version of [`chainFirstEitherK`](#chainfirsteitherk).
 *
 * @category combinators
 * @since 2.12.0
 */
export const chainFirstEitherKW = AIE.chainFirstEitherKW(AIChain)

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainIOK = AIE.chainIOK(AIChain)

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainFirstIOK = AIE.chainFirstIOK(AIChain)

/**
 * Less strict version of [`chainIOEitherK`](#chainioeitherk).
 *
 * @category combinators
 * @since 2.6.1
 */
export const chainIOEitherKW = AIE.chainIOEitherKW(AIChain)

/**
 * @category combinators
 * @since 2.4.0
 */
export const chainIOEitherK = AIE.chainIOEitherK(AIChain)

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainAsyncIterableK = AIE.chainAsyncIterableK(AIChain)

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainFirstAsyncIterableK = AIE.chainFirstAsyncIterableK(AIChain)

/**
 * @category combinators
 * @since 2.12.3
 */
export const chainAsyncIterableOptionKW = AIE.chainAsyncIterableOptionKW(AIChain)

/**
 * @category combinators
 * @since 2.11.0
 */
export const chainAsyncIterableOptionK = AIE.chainAsyncIterableOptionK(AIChain)

/**
 * @category destructors
 * @since 2.10.0
 */
export const matchE = AIE.matchE(AIChain)

/**
 * Alias of [`matchE`](#matche).
 *
 * @category destructors
 * @since 2.0.0
 */
export const fold = AIE.fold(AIChain)

/**
 * Less strict version of [`matchE`](#matche).
 *
 * @category destructors
 * @since 2.10.0
 */
export const matchEW = AIE.matchEW(AIChain)

/**
 * Alias of [`matchEW`](#matchew).
 *
 * @category destructors
 * @since 2.10.0
 */
export const foldW = AIE.foldW(AIChain)

/**
 * @category destructors
 * @since 2.0.0
 */
export const getOrElse = AIE.getOrElse(AIChain)

/**
 * Less strict version of [`getOrElse`](#getorelse).
 *
 * @category destructors
 * @since 2.6.0
 */
export const getOrElseW = AIE.getOrElseW(AIChain)

/**
 * Returns `ma` if is a `Right` or the value returned by `onLeft` otherwise.
 *
 * See also [alt](#alt).
 *
 * @category combinators
 * @since 2.0.0
 */
export const orElse = AIE.orElse(AIChain)

/**
 * Less strict version of [`orElse`](#orelse).
 *
 * @category combinators
 * @since 2.10.0
 */
export const orElseW = AIE.orElseW(AIChain)

/**
 * @category combinators
 * @since 2.11.0
 */
export const orElseFirst = AIE.orElseFirst(AIChain)

/**
 * @category combinators
 * @since 2.11.0
 */
export const orElseFirstW = AIE.orElseFirstW(AIChain)

/**
 * @category combinators
 * @since 2.12.0
 */
export const orElseFirstIOK = AIE.orElseFirstIOK(AIChain)

/**
 * @category combinators
 * @since 2.12.0
 */
export const orElseFirstAsyncIterableK = AIE.orElseFirstAsyncIterableK(AIChain)

/**
 * @category combinators
 * @since 2.11.0
 */
export const orLeft = AIE.orLeft(AIChain)

/**
 * @category combinators
 * @since 2.0.0
 */
export const filterOrElse = AIE.filterOrElse(AIChain)

/**
 * Less strict version of [`filterOrElse`](#filterorelse).
 *
 * @category combinators
 * @since 2.9.0
 */
export const filterOrElseW = AIE.filterOrElseW(AIChain)

/**
 * @category instances
 * @since 2.7.0
 */
export const getAltAsyncIterableValidation = AIE.getAltAsyncIterableValidation(AIChain)

/**
 * Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
 * whether the body action throws (\*) or returns.
 *
 * (\*) i.e. returns a `Left`
 *
 * @since 2.0.0
 */
export const bracket = AIE.bracket(AIChain)

/**
 * Less strict version of [`bracket`](#bracket).
 *
 * @since 2.12.0
 */
export const bracketW = AIE.bracketW(AIChain)
