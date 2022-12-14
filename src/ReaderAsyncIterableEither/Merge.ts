/**
 * ReaderAsyncIterableEither/Merge
 *
 * @since 0.1.0
 */
import type { Either } from 'fp-ts/Either'
import type { Monoid } from 'fp-ts/Monoid'
import type { Semigroup } from 'fp-ts/Semigroup'
import * as IX from '@reactivex/ix-es5-cjs/asynciterable'
import * as AIm from '../AsyncIterable/Merge'
import * as RAIE from '../ReaderAsyncIterableEither'
import type { ReaderAsyncIterableEither } from '../ReaderAsyncIterableEither'

const AIChain = AIm.ChainWithIndex

/**
 * @category instances
 * @since 0.1.0
 */
export const Chain = RAIE.getChain(AIChain)

/**
 * @category instances
 * @since 0.1.0
 */
export const ChainWithIndex = RAIE.getChainWithIndex(AIChain)

/**
 * @category instances
 * @since 0.1.0
 */
export const Monad = RAIE.getMonad(AIChain)

/**
 * @category instances
 * @since 0.1.0
 */
export const MonadIO = RAIE.getMonadIO(AIChain)

/**
 * @category instances
 * @since 0.1.0
 */
export const MonadTask = RAIE.getMonadTask(AIChain)

/**
 * @category instances
 * @since 0.1.0
 */
export const MonadAsyncIterable = RAIE.getMonadAsyncIterable(AIChain)

/**
 * @category instances
 * @since 0.1.0
 */
export const MonadThrow = RAIE.getMonadThrow(AIChain)

/**
 * Get a `Semigroup` based on the concatenation of `AsyncIterable`s.
 * See also [`getMonoid`](#getMonoid).
 *
 * @category instances
 * @since 0.1.0
 */
export const getSemigroup = <R = unknown, E = never, A = never>(): Semigroup<ReaderAsyncIterableEither<R, E, A>> => ({
  concat: (first, second) => (r) => AIm.getSemigroup<Either<E, A>>().concat(first(r), second(r))
})

/**
 * @since 0.1.0
 */
export const getMonoid = <R = unknown, E = never, A = never>(): Monoid<ReaderAsyncIterableEither<R, E, A>> => ({
  concat: getSemigroup<R, E, A>().concat,
  empty: () => IX.empty()
})

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 0.1.0
 */
export const chain = RAIE.chain(AIChain)

/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 0.1.0
 */
export const chainW = RAIE.chainW(AIChain)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainWithIndex = RAIE.chainWithIndex(AIChain)

/**
 * Less strict version of [`flatten`](#flatten).
 *
 * @category combinators
 * @since 0.1.0
 */
export const flattenW = RAIE.flattenW(AIChain)

/**
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 0.1.0
 */
export const flatten = RAIE.flatten(AIChain)

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 0.1.0
 */
export const alt = RAIE.alt(AIChain)

/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 0.1.0
 */
export const altW = RAIE.altW(AIChain)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainFirst = RAIE.chainFirst(AIChain)

/**
 * Less strict version of [`chainFirst`](#chainfirst).
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstW = RAIE.chainFirstW(AIChain)

/**
 * @since 0.1.0
 */
export const bind = RAIE.bind(AIChain)

/**
 * @since 0.1.0
 */
export const bindW = RAIE.bindW(AIChain)

/**
 * @category interop
 * @since 0.1.0
 */
export const chainNullableK = RAIE.chainNullableK(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainOptionK = RAIE.chainOptionK(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainEitherK = RAIE.chainEitherK(AIChain)

/**
 * Less strict version of [`chainEitherK`](#chaineitherk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainEitherKW = RAIE.chainEitherKW(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstEitherK = RAIE.chainFirstEitherK(AIChain)

/**
 * Less strict version of [`chainFirstEitherK`](#chainfirsteitherk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstEitherKW = RAIE.chainFirstEitherKW(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainIOK = RAIE.chainIOK(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstIOK = RAIE.chainFirstIOK(AIChain)

/**
 * Less strict version of [`chainIOEitherK`](#chainioeitherk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainIOEitherKW = RAIE.chainIOEitherKW(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainIOEitherK = RAIE.chainIOEitherK(AIChain)

/**
 * Less strict version of [`chainEitherK`](#chaineitherk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainTaskEitherKW = RAIE.chainTaskEitherKW(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainTaskEitherK = RAIE.chainTaskEitherK(AIChain)

/**
 * Less strict version of [`chainFirstEitherK`](#chainfirsteitherk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstTaskEitherKW = RAIE.chainFirstTaskEitherKW(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstTaskEitherK = RAIE.chainFirstTaskEitherK(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainAsyncIterableK = RAIE.chainAsyncIterableK(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstAsyncIterableK = RAIE.chainFirstAsyncIterableK(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainAsyncIterableEitherKW = RAIE.chainAsyncIterableEitherKW(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainAsyncIterableEitherK = RAIE.chainAsyncIterableEitherK(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstAsyncIterableEitherKW = RAIE.chainFirstAsyncIterableEitherKW(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstAsyncIterableEitherK = RAIE.chainFirstAsyncIterableEitherK(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainReaderK = RAIE.chainReaderK(AIChain)

/**
 * Less strict version of [`chainReaderK`](#chainreaderk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainReaderKW = RAIE.chainReaderKW(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstReaderK = RAIE.chainFirstReaderK(AIChain)

/**
 * Less strict version of [`chainFirstReaderK`](#chainfirstreaderk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstReaderKW = RAIE.chainFirstReaderKW(AIChain)

/**
 * Less strict version of [`chainReaderEitherK`](#chainreadereitherk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainReaderEitherKW = RAIE.chainReaderEitherKW(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainReaderEitherK = RAIE.chainReaderEitherK(AIChain)

/**
 * Less strict version of [`chainFirstReaderEitherK`](#chainfirstreadereitherk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstReaderEitherKW = RAIE.chainFirstReaderEitherKW(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstReaderEitherK = RAIE.chainFirstReaderEitherK(AIChain)

/**
 * Less strict version of [`chainReaderEitherK`](#chainreadereitherk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainReaderTaskEitherKW = RAIE.chainReaderTaskEitherKW(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainReaderTaskEitherK = RAIE.chainReaderTaskEitherK(AIChain)

/**
 * Less strict version of [`chainFirstReaderEitherK`](#chainfirstreadereitherk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstReaderTaskEitherKW = RAIE.chainFirstReaderTaskEitherKW(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstReaderTaskEitherK = RAIE.chainFirstReaderTaskEitherK(AIChain)

/**
 * Less strict version of [`chainReaderAsyncIterableK`](#chainreadertaskk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainReaderAsyncIterableKW = RAIE.chainReaderAsyncIterableKW(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainReaderAsyncIterableK = RAIE.chainReaderAsyncIterableK(AIChain)

/**
 * Less strict version of [`chainFirstReaderAsyncIterableK`](#chainfirstreadertaskk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstReaderAsyncIterableKW = RAIE.chainFirstReaderAsyncIterableKW(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstReaderAsyncIterableK = RAIE.chainFirstReaderAsyncIterableK(AIChain)

/**
 * @category destructors
 * @since 0.1.0
 */
export const matchE = RAIE.matchE(AIChain)

/**
 * Alias of [`matchE`](#matche).
 *
 * @category destructors
 * @since 0.1.0
 */
export const fold = RAIE.fold(AIChain)

/**
 * Less strict version of [`matchE`](#matche).
 *
 * @category destructors
 * @since 0.1.0
 */
export const matchEW = RAIE.matchEW(AIChain)

/**
 * Alias of [`matchEW`](#matchew).
 *
 * @category destructors
 * @since 0.1.0
 */
export const foldW = RAIE.foldW(AIChain)

/**
 * @category destructors
 * @since 0.1.0
 */
export const getOrElse = RAIE.getOrElse(AIChain)

/**
 * Less strict version of [`getOrElse`](#getorelse).
 *
 * @category destructors
 * @since 0.1.0
 */
export const getOrElseW = RAIE.getOrElseW(AIChain)

/**
 * Returns `ma` if is a `Right` or the value returned by `onLeft` otherwise.
 *
 * See also [alt](#alt).
 *
 * @category combinators
 * @since 0.1.0
 */
export const orElse = RAIE.orElse(AIChain)

/**
 * Less strict version of [`orElse`](#orelse).
 *
 * @category combinators
 * @since 0.1.0
 */
export const orElseW = RAIE.orElseW(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const orElseFirst = RAIE.orElseFirst(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const orElseFirstW = RAIE.orElseFirstW(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const orLeft = RAIE.orLeft(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const filterOrElse = RAIE.filterOrElse(AIChain)

/**
 * Less strict version of [`filterOrElse`](#filterorelse).
 *
 * @category combinators
 * @since 0.1.0
 */
export const filterOrElseW = RAIE.filterOrElseW(AIChain)
