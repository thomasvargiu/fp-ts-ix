/**
 * ReaderAsyncIterable/Merge
 *
 * @since 0.1.0
 */
import type { Monoid } from 'fp-ts/Monoid'
import type { Semigroup } from 'fp-ts/Semigroup'
import * as IX from '@reactivex/ix-es5-cjs/asynciterable'
import * as AIm from '../AsyncIterable/Merge'
import * as RAI from '../ReaderAsyncIterable'

const AIChain = AIm.ChainWithIndex

/**
 * @category instances
 * @since 0.1.0
 */
export const Chain = RAI.getChain(AIChain)

/**
 * @category instances
 * @since 0.1.0
 */
export const ChainWithIndex = RAI.getChainWithIndex(AIChain)

/**
 * @category instances
 * @since 0.1.0
 */
export const Monad = RAI.getMonad(AIChain)

/**
 * @category instances
 * @since 0.1.0
 */
export const MonadIO = RAI.getMonadIO(AIChain)

/**
 * @category instances
 * @since 0.1.0
 */
export const MonadTask = RAI.getMonadTask(AIChain)

/**
 * @category instances
 * @since 0.1.0
 */
export const MonadAsyncIterable = RAI.getMonadAsyncIterable(AIChain)

/**
 * Get a `Semigroup` based on the concatenation of `AsyncIterable`s.
 * See also [`getMonoid`](#getMonoid).
 *
 * @category instances
 * @since 0.1.0
 */
export const getSemigroup = <R = unknown, A = never>(): Semigroup<RAI.ReaderAsyncIterable<R, A>> => ({
  concat: (first, second) => (r) => AIm.getSemigroup<A>().concat(first(r), second(r))
})

/**
 * @since 0.1.0
 */
export const getMonoid = <R = unknown, A = never>(): Monoid<RAI.ReaderAsyncIterable<R, A>> => ({
  concat: getSemigroup<R, A>().concat,
  empty: () => IX.empty()
})

/**
 * @category Monad
 * @since 0.1.0
 */
export const chain = RAI.chain(AIChain)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainWithIndex = RAI.chainWithIndex(AIChain)

/**
 * Less strict version of  [`chainWithIndex`](#chainWithIndex).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainWithIndexW = RAI.chainWithIndexW(AIChain)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainFirst = RAI.chainFirst(AIChain)

/**
 * Less strict version of [`chainFirst`](#chainfirst).
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstW = RAI.chainFirstW(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainIOK = RAI.chainIOK(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstIOK = RAI.chainFirstIOK(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainTaskK = RAI.chainTaskK(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstTaskK = RAI.chainFirstTaskK(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainReaderK = RAI.chainReaderK(AIChain)

/**
 * Less strict version of [`chainReaderK`](#chainreaderk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainReaderKW = RAI.chainReaderKW(AIChain)
/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstReaderK = RAI.chainFirstReaderK(AIChain)

/**
 * Less strict version of [`chainFirstReaderK`](#chainfirstreaderk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstReaderKW = RAI.chainFirstReaderKW(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainAsyncIterableK = RAI.chainAsyncIterableK(AIChain)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstAsyncIterableK = RAI.chainFirstAsyncIterableK(AIChain)

/**
 * @since 0.1.0
 */
export const bind = RAI.bind(AIChain)

/**
 * @since 0.1.0
 */
export const bindW = RAI.bindW(AIChain)

/**
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 0.1.0
 */
export const flatten = RAI.flatten(AIChain)

/**
 * Less strict version of [`flatten`](#flatten).
 *
 * @category combinators
 * @since 0.1.0
 */
export const flattenW = RAI.flattenW(AIChain)
