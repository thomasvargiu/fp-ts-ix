/**
 * Lift a computation from the `AsyncIterable` monad
 *
 */
/* eslint-disable fp-ts/no-lib-imports */

import type {
    NaturalTransformation11,
    NaturalTransformation12,
    NaturalTransformation12C,
    NaturalTransformation13,
    NaturalTransformation13C,
    NaturalTransformation14,
} from 'fp-ts/NaturalTransformation'
import type { Option } from 'fp-ts/Option'
import { Chain, Chain1, Chain2, Chain2C, Chain3, Chain3C, Chain4, chainFirst } from 'fp-ts/lib/Chain'
import type { FromTask, FromTask1, FromTask2, FromTask2C, FromTask3, FromTask3C, FromTask4 } from 'fp-ts/lib/FromTask'
import type { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from 'fp-ts/lib/HKT'
import { flow } from 'fp-ts/lib/function'
import type { URI } from './AsyncIterable'
import * as AI from './AsyncIterable'

/**
 * @category type classes
 */
export interface FromAsyncIterable<F> extends FromTask<F> {
    readonly fromAsyncIterable: <A>(fa: AsyncIterable<A>) => HKT<F, A>
}

/**
 * @category type classes
 */
export interface FromAsyncIterable1<F extends URIS> extends FromTask1<F> {
    readonly fromAsyncIterable: NaturalTransformation11<URI, F>
}

/**
 * @category type classes
 */
export interface FromAsyncIterable2<F extends URIS2> extends FromTask2<F> {
    readonly fromAsyncIterable: NaturalTransformation12<URI, F>
}

/**
 * @category type classes
 */
export interface FromAsyncIterable2C<F extends URIS2, E> extends FromTask2C<F, E> {
    readonly fromAsyncIterable: NaturalTransformation12C<URI, F, E>
}

/**
 * @category type classes
 */
export interface FromAsyncIterable3<F extends URIS3> extends FromTask3<F> {
    readonly fromAsyncIterable: NaturalTransformation13<URI, F>
}

/**
 * @category type classes
 */
export interface FromAsyncIterable3C<F extends URIS3, E> extends FromTask3C<F, E> {
    readonly fromAsyncIterable: NaturalTransformation13C<URI, F, E>
}

/**
 * @category type classes
 */
export interface FromAsyncIterable4<F extends URIS4> extends FromTask4<F> {
    readonly fromAsyncIterable: NaturalTransformation14<URI, F>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 2.10.0
 */
export function fromAsyncIterableK<F extends URIS4>(
    F: FromAsyncIterable4<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => AsyncIterable<B>) => <S, R, E>(...a: A) => Kind4<F, S, R, E, B>
export function fromAsyncIterableK<F extends URIS3>(
    F: FromAsyncIterable3<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => AsyncIterable<B>) => <R, E>(...a: A) => Kind3<F, R, E, B>
export function fromAsyncIterableK<F extends URIS3, E>(
    F: FromAsyncIterable3C<F, E>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => AsyncIterable<B>) => <R>(...a: A) => Kind3<F, R, E, B>
export function fromAsyncIterableK<F extends URIS2>(
    F: FromAsyncIterable2<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => AsyncIterable<B>) => <E>(...a: A) => Kind2<F, E, B>
export function fromAsyncIterableK<F extends URIS2, E>(
    F: FromAsyncIterable2C<F, E>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => AsyncIterable<B>) => (...a: A) => Kind2<F, E, B>
export function fromAsyncIterableK<F extends URIS>(
    F: FromAsyncIterable1<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => AsyncIterable<B>) => (...a: A) => Kind<F, B>
export function fromAsyncIterableK<F>(
    F: FromAsyncIterable<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => AsyncIterable<B>) => (...a: A) => HKT<F, B>
export function fromAsyncIterableK<F>(
    F: FromAsyncIterable<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => AsyncIterable<B>) => (...a: A) => HKT<F, B> {
    return f => flow(f, F.fromAsyncIterable)
}

/**
 * @category combinators
 * @since 2.10.0
 */
export function chainAsyncIterableK<M extends URIS4>(
    F: FromAsyncIterable4<M>,
    M: Chain4<M>
): <A, B>(f: (a: A) => AsyncIterable<B>) => <S, R, E>(first: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, B>
export function chainAsyncIterableK<M extends URIS3>(
    F: FromAsyncIterable3<M>,
    M: Chain3<M>
): <A, B>(f: (a: A) => AsyncIterable<B>) => <R, E>(first: Kind3<M, R, E, A>) => Kind3<M, R, E, B>
export function chainAsyncIterableK<M extends URIS3, E>(
    F: FromAsyncIterable3C<M, E>,
    M: Chain3C<M, E>
): <A, B>(f: (a: A) => AsyncIterable<B>) => <R>(first: Kind3<M, R, E, A>) => Kind3<M, R, E, B>
export function chainAsyncIterableK<M extends URIS2>(
    F: FromAsyncIterable2<M>,
    M: Chain2<M>
): <A, B>(f: (a: A) => AsyncIterable<B>) => <E>(first: Kind2<M, E, A>) => Kind2<M, E, B>
export function chainAsyncIterableK<M extends URIS2, E>(
    F: FromAsyncIterable2C<M, E>,
    M: Chain2C<M, E>
): <A, B>(f: (a: A) => AsyncIterable<B>) => (first: Kind2<M, E, A>) => Kind2<M, E, B>
export function chainAsyncIterableK<M extends URIS>(
    F: FromAsyncIterable1<M>,
    M: Chain1<M>
): <A, B>(f: (a: A) => AsyncIterable<B>) => (first: Kind<M, A>) => Kind<M, B>
export function chainAsyncIterableK<M>(
    F: FromAsyncIterable<M>,
    M: Chain<M>
): <A, B>(f: (a: A) => AsyncIterable<B>) => (first: HKT<M, A>) => HKT<M, B>
export function chainAsyncIterableK<M>(
    F: FromAsyncIterable<M>,
    M: Chain<M>
): <A, B>(f: (a: A) => AsyncIterable<B>) => (first: HKT<M, A>) => HKT<M, B> {
    return f => {
        const g = flow(f, F.fromAsyncIterable)
        return first => M.chain(first, g)
    }
}

/**
 * @category combinators
 * @since 2.10.0
 */
export function chainFirstAsyncIterableK<M extends URIS4>(
    F: FromAsyncIterable4<M>,
    M: Chain4<M>
): <A, B>(f: (a: A) => AsyncIterable<B>) => <S, R, E>(first: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, A>
export function chainFirstAsyncIterableK<M extends URIS3>(
    F: FromAsyncIterable3<M>,
    M: Chain3<M>
): <A, B>(f: (a: A) => AsyncIterable<B>) => <R, E>(first: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export function chainFirstAsyncIterableK<M extends URIS3, E>(
    F: FromAsyncIterable3C<M, E>,
    M: Chain3C<M, E>
): <A, B>(f: (a: A) => AsyncIterable<B>) => <R>(first: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export function chainFirstAsyncIterableK<M extends URIS2>(
    F: FromAsyncIterable2<M>,
    M: Chain2<M>
): <A, B>(f: (a: A) => AsyncIterable<B>) => <E>(first: Kind2<M, E, A>) => Kind2<M, E, A>
export function chainFirstAsyncIterableK<M extends URIS2, E>(
    F: FromAsyncIterable2C<M, E>,
    M: Chain2C<M, E>
): <A, B>(f: (a: A) => AsyncIterable<B>) => (first: Kind2<M, E, A>) => Kind2<M, E, A>
export function chainFirstAsyncIterableK<M extends URIS>(
    F: FromAsyncIterable1<M>,
    M: Chain1<M>
): <A, B>(f: (a: A) => AsyncIterable<B>) => (first: Kind<M, A>) => Kind<M, A>
export function chainFirstAsyncIterableK<M>(
    F: FromAsyncIterable<M>,
    M: Chain<M>
): <A, B>(f: (a: A) => AsyncIterable<B>) => (first: HKT<M, A>) => HKT<M, A>
export function chainFirstAsyncIterableK<M>(
    F: FromAsyncIterable<M>,
    M: Chain<M>
): <A, B>(f: (a: A) => AsyncIterable<B>) => (first: HKT<M, A>) => HKT<M, A> {
    const chainFirstM = chainFirst(M)
    return f => chainFirstM(flow(f, F.fromAsyncIterable))
}

export function filterMapWithIndex<M extends URIS4>(
    F: FromAsyncIterable4<M>,
    M: Chain4<M>
): <A, B>(f: (i: number, a: A) => Option<B>) => <S, R, E>(first: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, A>
export function filterMapWithIndex<M extends URIS3>(
    F: FromAsyncIterable3<M>,
    M: Chain3<M>
): <A, B>(f: (i: number, a: A) => Option<B>) => <R, E>(first: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export function filterMapWithIndex<M extends URIS3, E>(
    F: FromAsyncIterable3C<M, E>,
    M: Chain3C<M, E>
): <A, B>(f: (i: number, a: A) => Option<B>) => <R>(first: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export function filterMapWithIndex<M extends URIS2>(
    F: FromAsyncIterable2<M>,
    M: Chain2<M>
): {
    <A, B>(f: (i: number, a: A) => Option<B>): <E>(ma: Kind2<M, E, A>) => Kind2<M, E, B>
}
export function filterMapWithIndex<M extends URIS2, E>(
    F: FromAsyncIterable2<M>,
    M: Chain2C<M, E>
): {
    <A, B>(f: (i: number, a: A) => Option<B>): (ma: Kind2<M, E, A>) => Kind2<M, E, B>
}
export function filterMapWithIndex<M extends URIS>(
    F: FromAsyncIterable1<M>,
    M: Chain1<M>
): <A, B>(f: (i: number, a: A) => Option<B>) => (first: Kind<M, A>) => Kind<M, A>
export function filterMapWithIndex<M extends URIS>(
    F: FromAsyncIterable<M>,
    M: Chain<M>
): <A, B>(f: (i: number, a: A) => Option<B>) => (ma: Kind<M, A>) => Kind<M, B>
export function filterMapWithIndex<M>(
    F: FromAsyncIterable<M>,
    M: Chain<M>
): <A, B>(f: (i: number, a: A) => Option<B>) => (ma: HKT<M, A>) => HKT<M, B>
export function filterMapWithIndex<M>(
    F: FromAsyncIterable<M>,
    M: Chain<M>
): <A, B>(f: (i: number, a: A) => Option<B>) => (ma: HKT<M, A>) => HKT<M, B> {
    return <A, B>(f: (i: number, a: A) => Option<B>) =>
        chainAsyncIterableK<M>(F, M)<A, B>(flow(AI.of, AI.filterMapWithIndex(f)))
}
