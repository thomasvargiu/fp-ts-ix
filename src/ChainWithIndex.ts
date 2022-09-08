/* eslint-disable fp-ts/no-lib-imports */
import type { Chain, Chain1, Chain2, Chain2C, Chain3, Chain3C, Chain4 } from 'fp-ts/Chain'
import type {
    FunctorWithIndex,
    FunctorWithIndex1,
    FunctorWithIndex2,
    FunctorWithIndex2C,
    FunctorWithIndex3,
    FunctorWithIndex3C,
    FunctorWithIndex4,
} from 'fp-ts/FunctorWithIndex'
import type { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from 'fp-ts/lib/HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 2.12.4
 */
export interface ChainWithIndex<F, I> extends Chain<F>, FunctorWithIndex<F, I> {
    readonly chainWithIndex: <A, B>(fa: HKT<F, A>, f: (i: I, a: A) => HKT<F, B>) => HKT<F, B>
}

/**
 * @category type classes
 * @since 2.12.4
 */
export interface ChainWithIndex1<F extends URIS, I> extends Chain1<F>, FunctorWithIndex1<F, I> {
    readonly chainWithIndex: <A, B>(fa: Kind<F, A>, f: (i: I, a: A) => Kind<F, B>) => Kind<F, B>
}

/**
 * @category type classes
 * @since 2.12.4
 */
export interface ChainWithIndex2<F extends URIS2, I> extends Chain2<F>, FunctorWithIndex2<F, I> {
    readonly chainWithIndex: <E, A, B>(fa: Kind2<F, E, A>, f: (i: I, a: A) => Kind2<F, E, B>) => Kind2<F, E, B>
}

/**
 * @category type classes
 * @since 2.12.4
 */
export interface ChainWithIndex2C<F extends URIS2, I, E> extends Chain2C<F, E>, FunctorWithIndex2C<F, I, E> {
    readonly chainWithIndex: <A, B>(fa: Kind2<F, E, A>, f: (i: I, a: A) => Kind2<F, E, B>) => Kind2<F, E, B>
}

/**
 * @category type classes
 * @since 2.12.4
 */
export interface ChainWithIndex3<F extends URIS3, I> extends Chain3<F>, FunctorWithIndex3<F, I> {
    readonly chainWithIndex: <R, E, A, B>(
        fa: Kind3<F, R, E, A>,
        f: (i: I, a: A) => Kind3<F, R, E, B>
    ) => Kind3<F, R, E, B>
}

/**
 * @category type classes
 * @since 2.2.0
 */
export interface ChainWithIndex3C<F extends URIS3, I, E> extends Chain3C<F, E>, FunctorWithIndex3C<F, I, E> {
    readonly chainWithIndex: <R, A, B>(fa: Kind3<F, R, E, A>, f: (i: I, a: A) => Kind3<F, R, E, B>) => Kind3<F, R, E, B>
}

/**
 * @category type classes
 * @since 2.12.4
 */
export interface ChainWithIndex4<F extends URIS4, I> extends Chain4<F>, FunctorWithIndex4<F, I> {
    readonly chainWithIndex: <S, R, E, A, B>(
        fa: Kind4<F, S, R, E, A>,
        f: (i: I, a: A) => Kind4<F, S, R, E, B>
    ) => Kind4<F, S, R, E, B>
}
