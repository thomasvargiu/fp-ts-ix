/* eslint-disable @typescript-eslint/ban-types */
import type { Monoid } from 'fp-ts/Monoid'
import type { Semigroup } from 'fp-ts/Semigroup'
import * as IX from 'ix/asynciterable'
import * as AIm from '../AsyncIterable/Merge'
import * as RAI from '../ReaderAsyncIterable'

const AIChain = AIm.ChainWithIndex

/**
 * @category instances
 */
export const Chain = RAI.getChain(AIChain)

/**
 * @category instances
 */
export const ChainWithIndex = RAI.getChainWithIndex(AIChain)

/**
 * @category instances
 */
export const Monad = RAI.getMonad(AIChain)

/**
 * @category instances
 */
export const MonadIO = RAI.getMonadIO(AIChain)

/**
 * @category instances
 */
export const MonadTask = RAI.getMonadTask(AIChain)

/**
 * @category instances
 */
export const MonadAsyncIterable = RAI.getMonadAsyncIterable(AIChain)

/**
 * Get a `Semigroup` based on the concatenation of `AsyncIterable`s.
 * See also [`getMonoid`](#getMonoid).
 *
 * @category instances
 */
export const getSemigroup = <R = unknown, A = never>(): Semigroup<RAI.ReaderAsyncIterable<R, A>> => ({
    concat: (first, second) => r => AIm.getSemigroup<A>().concat(first(r), second(r)),
})

export const getMonoid = <R = unknown, A = never>(): Monoid<RAI.ReaderAsyncIterable<R, A>> => ({
    concat: getSemigroup<R, A>().concat,
    empty: () => IX.empty(),
})

/**
 * @category Monad
 * @since 2.10.0
 */
export const chain = RAI.chain(AIChain)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category combinators
 */
export const chainWithIndex = RAI.chainWithIndex(AIChain)

/**
 * Less strict version of  [`chainWithIndex`](#chainWithIndex).
 *
 * @category combinators
 */
export const chainWithIndexW = RAI.chainWithIndexW(AIChain)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.10.0
 */
export const chainFirst = RAI.chainFirst(AIChain)

/**
 * Less strict version of [`chainFirst`](#chainfirst).
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.10.0
 */
export const chainFirstW = RAI.chainFirstW(AIChain)

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainIOK = RAI.chainIOK(AIChain)

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainFirstIOK = RAI.chainFirstIOK(AIChain)

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainTaskK = RAI.chainTaskK(AIChain)

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainFirstTaskK = RAI.chainFirstTaskK(AIChain)

/**
 * @category combinators
 */
export const chainReaderK = RAI.chainReaderK(AIChain)

/**
 * Less strict version of [`chainReaderK`](#chainreaderk).
 *
 * @category combinators
 */
export const chainReaderKW = RAI.chainReaderKW(AIChain)
/**
 * @category combinators
 */
export const chainFirstReaderK = RAI.chainFirstReaderK(AIChain)

/**
 * Less strict version of [`chainFirstReaderK`](#chainfirstreaderk).
 *
 * @category combinators
 */
export const chainFirstReaderKW = RAI.chainFirstReaderKW(AIChain)

/**
 * @category combinators
 */
export const chainAsyncIterableK = RAI.chainAsyncIterableK(AIChain)

/**
 * @category combinators
 */
export const chainFirstAsyncIterableK = RAI.chainFirstAsyncIterableK(AIChain)

/**
 * @since 2.10.0
 */
export const bind = RAI.bind(AIChain)

/**
 * @since 2.10.0
 */
export const bindW = RAI.bindW(AIChain)

/**
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.10.0
 */
export const flatten = RAI.flatten(AIChain)

/**
 * Less strict version of [`flatten`](#flatten).
 *
 * @category combinators
 * @since 2.10.0
 */
export const flattenW = RAI.flattenW(AIChain)
