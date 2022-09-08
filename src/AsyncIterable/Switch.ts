import { Chain1, chainFirst as chainFirst_, bind as bind_ } from 'fp-ts/Chain'
import type { Monad1 } from 'fp-ts/Monad'
import type { MonadIO1 } from 'fp-ts/MonadIO'
import type { MonadTask1 } from 'fp-ts/MonadTask'
import type { Monoid } from 'fp-ts/Monoid'
import type { Semigroup } from 'fp-ts/Semigroup'
import { Lazy, pipe } from 'fp-ts/function'
import * as IX from 'ix/asynciterable'
import * as IXO from 'ix/asynciterable/operators'
import type { ChainWithIndex1 } from '../ChainWithIndex'
import type { MonadAsyncIterable1 } from '../MonadAsyncIterable'
import * as AI from '../AsyncIterable'

const _chain: Chain1<AI.URI>['chain'] = (fa, f) => pipe(fa, chain(f))
const _chainWithIndex: ChainWithIndex1<AI.URI, number>['chainWithIndex'] = (fa, f) => pipe(fa, chainWithIndex(f))

/**
 * @category instances
 */
export const ChainWithIndex: ChainWithIndex1<AI.URI, number> = {
    URI: AI.URI,
    map: AI.Functor.map,
    mapWithIndex: AI.FunctorWithIndex.mapWithIndex,
    ap: AI.Apply.ap,
    chain: _chain,
    chainWithIndex: _chainWithIndex,
}

/**
 * @category instances
 */
export const Chain: Chain1<AI.URI> = {
    URI: AI.URI,
    map: AI.Functor.map,
    ap: AI.Apply.ap,
    chain: _chain,
}

/**
 * @category instances
 */
export const Monad: Monad1<AI.URI> = AI.getMonad(Chain)

/**
 * @category instances
 */
export const MonadIO: MonadIO1<AI.URI> = AI.getMonadIO(Chain)

/**
 * @category instances
 */
export const MonadTask: MonadTask1<AI.URI> = AI.getMonadTask(Chain)

/**
 * @category instances
 */
export const MonadAsyncIterable: MonadAsyncIterable1<AI.URI> = AI.getMonadAsyncIterable(ChainWithIndex)

/**
 * Get a `Semigroup` based on the concatenation of `AsyncIterable`s.
 * See also [`getMonoid`](#getMonoid).
 *
 * @category instances
 */
export const getSemigroup = <A = never>(): Semigroup<AsyncIterable<A>> => ({
    concat: (first, second) => IX.concat(first, second),
})

export const getMonoid = <A = never>(): Monoid<AsyncIterable<A>> => ({
    concat: getSemigroup<A>().concat,
    empty: IX.empty(),
})

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 */
export const chain: <A, B>(f: (a: A) => AsyncIterable<B>) => (ma: AsyncIterable<A>) => AsyncIterable<B> = f =>
    IXO.switchMap(f)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category combinators
 */
export const chainWithIndex: <A, B>(
    f: (i: number, a: A) => AsyncIterable<B>
) => (ma: AsyncIterable<A>) => AsyncIterable<B> = f => IXO.switchMap((a, i) => f(i, a))

/**
 * Derivable from `Monad`.
 *
 * @category combinators
 */
export const flatten = AI.flatten(Chain)

/**
 * Less strict version of [`alt`](#alt), it can concatenate `AsyncIterable`s of different base types.
 *
 * @category Alt
 */
export const altW =
    <B>(that: Lazy<AsyncIterable<B>>) =>
    <A>(fa: AsyncIterable<A>): AsyncIterable<A | B> =>
        pipe(fa, AI.altW<A, B>(getSemigroup<A | B>())(that))

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 */
export const alt: <A>(that: () => AsyncIterable<A>) => (fa: AsyncIterable<A>) => AsyncIterable<A> = altW

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 */
export const chainFirst =
    /*#__PURE__*/
    chainFirst_(Chain)

export const bind =
    /*#__PURE__*/
    bind_(Chain)
